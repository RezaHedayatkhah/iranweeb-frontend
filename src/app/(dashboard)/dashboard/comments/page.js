"use client"

import {useEffect, useState} from "react";
import Link from "next/link";

export default function page() {
    const [comments, setComments] = useState([])
    useEffect(() => {
        async function fetchComments() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: 'include', // Include credentials (cookies) in the request

            });
            const data = await res.json();
            if (res.ok) {
                setComments(data)
            }
        }

        fetchComments();
    }, []);
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <div className="flex items-center gap-x-3">
                    <h1 className="text-3xl">نظرات من</h1>
                    <span className="text-[#e0e0e0] text-sm">{comments.length} عدد </span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="overflow-x-auto">
                    <table className="table-auto text-start border-separate border-spacing-y-3 overflow-scroll w-full">
                        <thead>
                        <tr>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">ID</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">پست</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">متن</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">تاریخ ثبت</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">اکشن ها</th>
                        </tr>
                        </thead>
                        <tbody>
                        {comments?.map((comment) => (
                            <tr key={comment.id} className="bg-[#151f30] ">
                                <td className="rounded-r-2xl p-5 text-sm">
                                    <div>{comment.id}</div>
                                </td>
                                <td className="p-5 text-sm">
                                    <Link className="text-sm line-clamp-1 text-blue-400"
                                          href={`/${comment.post.contentType.toLowerCase()}/${comment.post.slug}`}>{comment.post.originalTitle}</Link>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{comment.body}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="text-sm line-clamp-1">{comment.createdAt}</p>
                                </td>
                                <td className="rounded-l-2xl p-5 text-sm">
                                    <a className="bg-green-600 hover:bg-green-900 w-fit rounded-xl p-1 text-sm  md:p-2"
                                       href="">ادیت</a></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/*@if($comments->hasPages())*/}
                {/*<div className="mb-16 rounded-2xl bg-[#151f30] p-5">*/}
                {/*    {{$comments->links()}}*/}
                {/*</div>*/}
                {/*@endif*/}
            </div>

        </div>
    )
}