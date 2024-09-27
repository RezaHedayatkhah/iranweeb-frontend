"use client"
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?postStatus=all`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                }
            );
            const data = await res.json();
            if (!res.ok) {
                if (data.message) {
                    toast.error(data.message, {
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                    });
                }
            } else {
                setPosts(data.posts)
            }

        }

        fetchPosts()
    }, [])
    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <div className="flex items-center gap-x-3">
                    <h1 className="text-3xl">پست ها</h1>
                    <span className="text-[#e0e0e0] text-sm">{posts.length} عدد </span>
                </div>
                <div
                    className="flex items-center justify-between text-white bg-[#151f30] rounded-2xl px-3">
                    <form className=" w-full" name="search" method="get">
                        <input type="text"
                               className="rounded-2xl focus:outline-none text-white bg-[#151f30] h-7 px-3 w-full"
                               name="search" placeholder="جستجو..."/>
                    </form>
                    <i className="fas fa-search text-red-500"></i>
                </div>
            </div>


            <div className="flex flex-col gap-3 ">
                <div className="overflow-x-auto">

                    <table className="table-auto text-start border-separate border-spacing-y-3 overflow-scroll w-full">
                        <thead>
                        <tr>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">ID</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">پوستر</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">نام خارجی</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">نام فارسی</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">نوع</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">بازدیدها</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">وضعیت</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">تاریخ ثبت</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">اکشن ها</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="bg-[#151f30] ">
                                <td className="rounded-r-2xl p-5 text-sm">
                                    <div>{post.id}</div>
                                </td>
                                <td className="p-5 text-sm">
                                    <Image
                                        className="rounded-xl aspect-[2/3] w-16 md:w-20 cursor-pointer transition ease-in-out duration-300  hover:scale-150"
                                        src={post.imageUrl ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/${post?.imageUrl}` : ''}
                                        width={80}
                                        height={80}
                                        alt={post.slug}/>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{post.originalTitle}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{post.title}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <span>{post.contentType}</span>
                                </td>
                                <td className="p-5 text-sm">
                                    <span>{post.views}</span>
                                </td>
                                <td className="p-5 text-sm">
                                    <span className="text-red-500">{post.postStatus}</span>
                                </td>
                                <td className="p-5 text-sm">
                                    <span>{post.createdAt}</span>
                                </td>
                                <td className="rounded-l-2xl p-5 text-sm">
                                    <Link className="bg-green-600 hover:bg-green-900 w-fit h-fit rounded-xl p-2"
                                       href={`/dashboard/posts/${post.id}`}>
                                        <FontAwesomeIcon icon={faPenToSquare}/>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}