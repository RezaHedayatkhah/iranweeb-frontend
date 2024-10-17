'use client'
import Link from "next/link";
import formatDate from "@/app/_components/formatDate";
import {useEffect, useState} from "react";

export default function page({params}){
    const [ticket,setTicket] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${params.id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
                setTicket(data)
                console.log(data)
            }
        }
        fetchData()
    }, []);

    return (
        <div className="w-full flex flex-col gap-4">
            {/* Header Section */}
            <div
                className="flex flex-col gap-4 md:flex-row justify-between w-full p-4 border-b border-blue-500 border-opacity-20 mb-6">
                <div className="flex items-center gap-x-2">
                    <h1 className="text-2xl font-medium text-white">جزئیات تیکت</h1>
                </div>
            </div>

            {/* Ticket Details Section */}
            <div className="rounded-xl bg-[#151F30] p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-gray-100 mb-4">{ticket.title}</h2>
                <p className="text-sm text-gray-300 mb-2"><strong>وضعیت:</strong> {ticket.status}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>اولویت:</strong> {ticket.priority}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>دسته‌بندی:</strong> {ticket.category}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>تاریخ ایجاد:</strong> {formatDate(ticket.createdAt)}
                </p>
                {ticket.closedAt && (
                    <p className="text-sm text-gray-300 mb-2"><strong>تاریخ بسته
                        شدن:</strong> {formatDate(ticket.closedAt)}</p>
                )}

                {/* Ticket Description */}
                <div className="mt-4 p-4 bg-[#1E293B] rounded-lg">
                    <h3 className="text-md font-semibold text-gray-200 mb-2">توضیحات تیکت</h3>
                    <p className="text-sm text-gray-300">{ticket.description}</p>
                </div>
            </div>
        </div>


    )
}