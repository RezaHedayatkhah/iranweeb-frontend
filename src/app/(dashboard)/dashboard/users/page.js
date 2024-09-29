"use client"
import {useEffect, useState} from "react";

export default function page() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchUsers () {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include",
            })
            const data = await res.json();

            if (res.ok) {
                setUsers(data)
            }
        }
        fetchUsers()
    }, []);
    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <div className="flex items-center gap-x-3">
                    <h1 className="text-3xl">کاربران</h1>
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
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">نام کاربری</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">ایمیل</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">نام</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">نام خانوادگی</th>
                            <th className="text-start px-5 text-xs text-[#e0e0e0]">تاریخ عضویت</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="bg-[#151f30] ">
                                <td className="rounded-r-2xl p-5 text-sm">
                                    <div>{user.id}</div>
                                </td>

                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{user.userName}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{user.email}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{user.firstName}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <p className="line-clamp-1">{user.lastName}</p>
                                </td>
                                <td className="rounded-l-2xl p-5 text-sm">
                                    <span>{user.createdAt}</span>
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