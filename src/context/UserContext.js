"use client";

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import checkAuthorizationCookie from "@/context/getCookie";

const UserContext = createContext({});

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const isMounted = useRef(true); // Track component mounting status

    const getUserData = async () => {
        try {
            const hasAuthCookie = await checkAuthorizationCookie();
            if (!user && hasAuthCookie) { // Only fetch if user isn't set and auth cookie exists
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
                    method: "GET",
                    credentials: 'include', // Include cookies in the request
                });

                if (!isMounted.current) return; // Prevent state update if unmounted

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    await logout(); // Handle unauthorized session
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        getUserData(); // Fetch user data on mount

        return () => { // Cleanup effect to prevent memory leaks
            isMounted.current = false;
        };
    }, []);

    const logout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include', // Include credentials (cookies) in the request
            });

            if (response.ok) {
                setUser(null); // Clear user state
                router.push('/login'); // Redirect to login page
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
