"use client";

import {createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

const UserContext = createContext({});

export function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const getUserData = async () => {
        // Only fetch user data if no user is set yet

        if (!user) {

            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user", {
                credentials: 'include', // Include cookies in the request
            });

            const data = await res.json();
            if (res.ok) {
                setUser(data.user); // Set the user data if the response is okay
            } else {
                await logout()
            }
        }

    };

    useEffect(() => {
        // Fetch user data when the component mounts
        getUserData();
    }, []);

    const logout = async () => {
        try {
            // Call the backend logout endpoint to clear the cookie
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/logout", {
                method: 'POST',
                credentials: 'include', // Include credentials (cookies) in the request
            });

            if (response.ok) {
                console.log("logged out")
                // Clear the user state
                setUser(null);

                // Redirect to the login page
                router.push('/login');
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };



    return (
        <UserContext.Provider value={{user, setUser, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}