"use client"
import {useEffect, useState} from "react";
import PostCard from "@/app/_components/PostCard";

export default function page() {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: 'include', // Include credentials (cookies) in the request

            });

            const data = await res.json();
            if (res.ok) {
                setLikes(data)
            }
        }

        fetchData()
    }, []);
    return (
        <div className="flex flex-col w-full">
            <div className="w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <h1 className="text-3xl">لیست ذخیره</h1>

            </div>
            <div
                className="flex flex-col justify-between rounded-2xl bg-[#151f30] w-full p-5 ">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
                    {likes?.map((like) => (
                        <PostCard post={like.post} key={like.id}/>
                    ))}
                </div>
                {/*@if($posts->hasPages())*/}
                {/*<div className="mb-16 rounded-2xl bg-[#151f30] p-5">*/}
                {/*    {{$posts->links()}}*/}
                {/*</div>*/}
                {/*@endif*/}
            </div>
        </div>
    )
}