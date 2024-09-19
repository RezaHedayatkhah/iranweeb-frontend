"use server";
import { cookies } from 'next/headers';

// Function to check if the Authorization cookie exists on the server
export default async function checkAuthorizationCookie() {
    // Fetch the Authorization cookie from the incoming request
    const token = cookies().get("Authorization")?.value;

    // Return the token if it exists, otherwise return null or handle accordingly
    return token ? token : null;
};
