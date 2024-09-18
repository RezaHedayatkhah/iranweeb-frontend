"use client"
import {useSearchParams} from "next/navigation";
import { useState} from "react";
import {useEffect} from "react";
import PostCard from "@/app/_components/PostCard";

export default function SearchPosts() {
    const searchParams = useSearchParams(); // Access search parameters
    const [posts, setPosts] = useState([]);
    const params = new URLSearchParams(searchParams.toString())

    useEffect(() => {
        async function getPosts() {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/posts?" + params, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
            const data = await res.json();
            if (res.ok) {
                setPosts(data);
            } else {
                console.log(data)
            }
        }

        getPosts()
    }, [searchParams]);

    return (
        <>
            {posts.map((post) => (
                <PostCard post={post} key={post.id}/>
            ))}
        </>
    )
}