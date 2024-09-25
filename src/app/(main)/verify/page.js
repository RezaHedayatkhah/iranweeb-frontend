'use client'

import {useEffect, useState} from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function page() {
    const [transaction, setTransaction] = useState({});
    const searchParams = useSearchParams(); // Use this to get query params in a client-side component
    const transId = searchParams.get("trans_id");
    const idGet = searchParams.get("id_get");
    const factorId = searchParams.get("factorId");

    useEffect(() => {
        async function verifyTransaction() {
            try {
                // Fetching verification result
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({transId, idGet, factorId}),
                });

                const data = await res.json();

                // Handling the response with toast notifications
                if (res.ok) {
                    if (data.message){
                        toast.success(data.message);
                    }
                    setTransaction(data)
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                // Handling any fetch error
                toast.error("خطا در وریفای تراکنش");
            }
        }

        // Calling the verification function
        verifyTransaction();
    }, [transId, idGet, factorId]); // Dependency on params for the effect

    return (
        <div className="overflow-x-auto p-5 md:w-1/2 m-auto">
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
                <tr className="bg-[#151f30] ">
                    <td  className="rounded-r-2xl p-5 text-sm">{transaction.id}</td>
                    <td className="p-5 text-sm">{transaction.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td className="p-5 text-sm">{transaction.type}</td>
                    <td className="p-5 text-sm">{transaction.status}</td>
                    <td className="p-5 text-sm">{transaction.description}</td>
                    <td className="rounded-l-2xl p-5 text-sm">{transaction.createdAt}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
