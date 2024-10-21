"use client";
import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

export default function Page() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-transactions`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    credentials: "include",
                });
                const data = await res.json();

                if (res.ok) {
                    setTransactions(data);
                } else {
                    setTransactions([]);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        }

        fetchTransactions();
    }, []);

    if (loading) {
        return <div className="w-full flex justify-center py-10">در حال بارگذاری...</div>;
    }

    if (transactions.length === 0) {
        return <div className="w-full flex justify-center py-10">هیچ خریدی پیدا نشد.</div>;
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <div className="flex items-center gap-x-3">
                    <h1 className="text-3xl">خریدها</h1>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="overflow-x-auto">
                    <table
                        className="table-auto text-start border-separate border-spacing-y-3 overflow-scroll w-full min-w-full">
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
                        {transactions
                            ?.filter((transaction) => transaction.type === "DEBIT")
                            .map((transaction) => {
                                const post = transaction.downloadLink?.post;
                                return (
                                    <tr key={transaction.id} className="bg-[#151f30]">
                                        <td className="rounded-r-2xl p-5 text-sm">{transaction.id}</td>
                                        <td className="p-5 text-sm">
                                            <Image
                                                className="rounded-xl aspect-[2/3] w-16 md:w-20 cursor-pointer transition ease-in-out duration-300 hover:scale-150"
                                                src={post?.imageUrl ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/${post.imageUrl}` : "/default.jpg"} // Default image fallback
                                                width={80}
                                                height={80}
                                                alt={post?.slug || "Image"}
                                            />
                                        </td>
                                        <td className="p-5 text-sm">
                                            <p className="line-clamp-1">{post?.originalTitle || "ناموجود"}</p>
                                        </td>
                                        <td className="p-5 text-sm">
                                            <p className="line-clamp-1">{post?.title || "ناموجود"}</p>
                                        </td>
                                        <td className="p-5 text-sm">
                                            <span>{transaction.downloadLink.label || "ناموجود"}</span>
                                        </td>
                                        <td className="p-5 text-sm">
                                            <span>{transaction.downloadLink.description || "توضیحات موجود نیست"}</span>
                                        </td>
                                        <td className="rounded-l-2xl p-5 text-sm">
                                            <Link
                                                className="bg-green-600 hover:bg-green-900 w-fit h-fit rounded-xl p-2"
                                                href={transaction.downloadLink.url || "#"}
                                            >
                                                <FontAwesomeIcon icon={faLink}/>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
