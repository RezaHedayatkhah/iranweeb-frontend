"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faCirclePlus, faComments, faHeart} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "@/context/UserContext"
import {useEffect, useState} from "react";
import Link from "next/link";
import Deposit from "@/app/(dashboard)/dashboard/_components/Deposit";

export default function page() {
    const [data, setData] = useState({});
    const {user} = useUser();

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include', // Ensures cookies are sent with the request

            })
            const data = await res.json()
            if (!res.ok) {
                console.log('error')
            }
            setData(data)
        }
        getData()
    }, []);

    return (
        <div className="w-full h-full mb-5">
            <div className="flex justify-between items-center w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <h1 className="text-3xl">داشبورد</h1>
                <Deposit />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div
                    className="rounded-2xl text-white flex flex-col gap-5 justify-between lg:text-xl bg-[#151f30] p-5">
                    <div className="w-full">
                        <span className="text-base">دیدگاه ها</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-3xl">{data.commentCount}</span>

                        <FontAwesomeIcon icon={faComments} className={"text-3xl text-red-500"}/>
                    </div>
                </div>

                <div
                    className="rounded-2xl text-white flex flex-col gap-5 justify-between lg:text-xl bg-[#151f30] p-5">
                    <div className="w-full">
                        <span className="text-base">لیست ذخیره</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-3xl">{data.bookmarkCount}</span>
                        <FontAwesomeIcon icon={faBookmark} className={"text-3xl text-red-500"}/>

                    </div>
                </div>

                <div
                    className="rounded-2xl text-white flex flex-col gap-5 justify-between lg:text-xl bg-[#151f30] p-5">
                    <div className="w-full">
                        <span className="text-base">علاقه مندی ها</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-3xl">{data.likeCount}</span>
                        <FontAwesomeIcon icon={faHeart} className={"text-3xl text-red-500"}/>

                    </div>
                </div>

                <div
                    className="rounded-2xl text-white flex flex-col gap-5 justify-between lg:text-xl bg-[#151f30] p-5">
                    <div className="w-full">
                        <span className="text-base">درخواست ها</span>
                    </div>
                    <div className="flex justify-between">
                    <span
                        className="text-3xl">{data.ticketCount}</span>
                        <FontAwesomeIcon icon={faCirclePlus} className={"text-3xl text-red-500"}/>

                    </div>
                </div>
            </div>

        </div>
    );
}