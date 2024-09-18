"use client"
import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

export default function page() {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        async function fetchPosts (){
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-transactions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include",
            })
            const data = await res.json();

            if (res.ok) {
                setTransactions(data)
            }
        }
        fetchPosts()
    }, []);
    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <div className="flex items-center gap-x-3">
                    <h1 className="text-3xl">خریدها</h1>
                </div>
                {/*<div*/}
                {/*    className="flex items-center justify-between text-white bg-[#151f30] rounded-2xl px-3">*/}
                {/*    <form className=" w-full" name="search" method="get">*/}
                {/*        <input type="text"*/}
                {/*               className="rounded-2xl focus:outline-none text-white bg-[#151f30] h-7 px-3 w-full"*/}
                {/*               name="search" placeholder="جستجو..."/>*/}
                {/*    </form>*/}
                {/*    <i className="fas fa-search text-red-500"></i>*/}
                {/*</div>*/}
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
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">موضوع</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">توضیحات</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">لینک</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.filter((e)=> e.type === 'DEBIT').map((transaction) => (
                            <tr key={transaction.id} className="bg-[#151f30] ">
                                <td className="rounded-r-2xl p-5 text-sm">
                                    <div>{transaction.id}</div>
                                </td>
                                <td className="p-5 text-sm">
                                    <Image
                                        className="rounded-xl aspect-[2/3] w-16 md:w-20 cursor-pointer transition ease-in-out duration-300  hover:scale-150"
                                        src={transaction.downloadLink.post.imageUrl ? transaction.downloadLink.post.imageUrl : ''}
                                        width={80}
                                        height={80}
                                        alt={transaction.downloadLink.post.slug}/>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{transaction.downloadLink.post.originalTitle}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{transaction.downloadLink.post.title}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <span>{transaction.downloadLink.label}</span>
                                </td>
                                <td className="p-5 text-sm">
                                    <span>{transaction.downloadLink.description}</span>
                                </td>
                                <td className="rounded-l-2xl p-5 text-sm">
                                    <Link className="bg-green-600 hover:bg-green-900 w-fit h-fit rounded-xl p-2"
                                          href={transaction.downloadLink.url}>
                                        <FontAwesomeIcon icon={faLink}/>
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