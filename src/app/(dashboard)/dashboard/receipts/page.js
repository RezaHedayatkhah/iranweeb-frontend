"use client"
import {useEffect, useState} from "react";
import formatDate from "@/app/_components/formatDate";

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
                    <h1 className="text-3xl">رسیدها</h1>
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
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">مقدار</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">نوع</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">وضعیت</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">توضیحات</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">تاریخ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="bg-[#151f30] ">
                                <td className="rounded-r-2xl p-5 text-sm">
                                    <div>{transaction.id}</div>
                                </td>

                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{transaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{transaction.type === 'CREDIT' ? 'شارژ حساب' : 'خرید'}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1 text-green-500">{transaction.status === 'SUCCESS' ? 'موفق' : transaction.status}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{transaction.description}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <span>{formatDate(transaction.createdAt)}</span>
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