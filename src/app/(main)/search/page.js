"use client"
import Filter from "@/app/(main)/[contentType]/_components/Filter";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import {useEffect} from "react";
import PostCard from "@/app/_components/PostCard";

export default function page() {
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
        <div
            className="flex md:flex-row flex-col justify-between w-11/12 md:w-4/5 m-auto pt-40 gap-5 md:gap-20 text-white">
            <Filter/>

            <div
                className="flex flex-col justify-between rounded-xl bg-gray-800  w-full md:w-3/4 py-3 px-3 md:px-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    {posts.map((post) => (
                        <PostCard post={post} key={post.id}/>
                    ))}
                </div>

            </div>

        </div>
    )
}