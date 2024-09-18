"use client";
import {useEffect, useState} from "react";
import { toast } from "react-hot-toast";

export default function page({params}) {
    const [transaction, setTransaction] = useState({});
    useEffect(() => {
        async function verifyTransaction() {
            try {
                // Fetching verification result
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/verify/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                });

                const data = await res.json();

                // Handling the response with toast notifications
                if (res.ok) {
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
    }, []); // Dependency on params for the effect

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
                    <td className="p-5 text-sm">{transaction.amount}</td>
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
