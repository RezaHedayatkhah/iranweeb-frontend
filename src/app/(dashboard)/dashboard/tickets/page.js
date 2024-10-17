"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faEnvelopeCircleCheck,
    faEnvelopeOpenText,
    faHourglass,
    faMailReply
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import formatDate from '@/app/_components/formatDate'
import Link from "next/link";

export default function page(){
    const [tickets,setTickets] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
                setTickets(data)
                console.log(data)
            }
        }
        fetchData()
    }, []);
    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <div className="flex items-center gap-x-3">
                    <h1 className="text-3xl">تیکت ها</h1>
                </div>
            </div>
            <div className={"w-full h-full flex flex-col gap-5"}>
                <div className={"w-full flex justify-center gap-10"}>
                    <div className={"flex flex-col justify-center items-center gap-2 hover:scale-110 cursor-pointer transition "}>
                        <FontAwesomeIcon icon={faEnvelopeOpenText} className={"text-red-500 text-3xl"}/>
                        <span className={"text-sm"}>تیکت های باز</span>
                        <span>{tickets.filter((ticket) => ticket.status === 'OPEN').length}</span>
                    </div>
                    <div className={"flex flex-col justify-center items-center gap-2 hover:scale-110 cursor-pointer transition "}>
                        <FontAwesomeIcon icon={faHourglass} className={"text-red-500 text-3xl"}/>
                        <span className={"text-sm"}>درحال بررسی</span>
                        <span>{tickets.filter((ticket) => ticket.status === 'IN_PROGRESS').length}</span>

                    </div>
                    <div className={"flex flex-col justify-center items-center gap-2 hover:scale-110 cursor-pointer transition "}>
                        <FontAwesomeIcon icon={faEnvelopeCircleCheck} className={"text-red-500 text-3xl"}/>
                        <span className={"text-sm"}>پاسخ داده شده</span>
                        <span>{tickets.filter((ticket) => ticket.status === 'ON_HOLD').length}</span>

                    </div>
                    <div className={"flex flex-col justify-center items-center gap-2 hover:scale-110 cursor-pointer transition "}>
                        <FontAwesomeIcon icon={faEnvelope} className={"text-red-500 text-3xl"}/>
                        <span className={"text-sm"}>تیکت های بسته</span>
                        <span>{tickets.filter((ticket) => ticket.status === 'CLOSED').length}</span>

                    </div>
                </div>

                <div className="rounded-2xl bg-[#151F30] w-full h-full p-5 overflow-x-auto">
                    <table className="table-auto text-start border-separate border-spacing-y-3 overflow-scroll w-full">
                        <thead>
                        <tr className="bg-[#1E293B]">
                            <th className="text-start p-3 text-xs text-[#e0e0e0] rounded-r-2xl">Title</th>
                            <th className="text-start p-3 text-xs text-[#e0e0e0]">Status</th>
                            <th className="text-start p-3 text-xs text-[#e0e0e0]">Priority</th>
                            <th className="text-start p-3 text-xs text-[#e0e0e0]">Category</th>
                            <th className="text-start p-3 text-xs text-[#e0e0e0]">Closed At</th>
                            <th className="text-start p-3 text-xs text-[#e0e0e0] rounded-l-2xl">Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} className="text-gray-300 hover:bg-[#1E293B] rounded-lg">
                                <td className="p-3 text-sm text-blue-500">
                                    <Link href={`/dashboard/tickets/${ticket.id}`} >
                                        {ticket.title}
                                    </Link>
                                </td>
                                <td className="p-3 text-sm">{ticket.status}</td>
                                <td className="p-3 text-sm">{ticket.priority}</td>
                                <td className="p-3 text-sm">{ticket.category}</td>
                                <td className="p-3 text-sm">{ticket.closedAt ? formatDate(ticket.closedAt) : ''}</td>
                                <td className="p-3 text-sm">{formatDate(ticket.createdAt)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}