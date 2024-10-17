"use client"

import { useState } from "react";
import {toast} from "react-hot-toast";

export default function JoinTeamPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telegramId, setTelegramId] = useState("");
    const [skills, setSkills] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const realTitle = name + ' ' + email + ' ' + telegramId;
        const realDescription = skills + ' ' + `درخواست عضویت در تیم`
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({title: realTitle, description: realDescription}),
        });

        const data = await response.json();
        if (response.ok) {
            toast.success(data.message);
            setName('');
            setEmail('');
        } else {
            toast.error(data.message)
        }
    };

    return (
        <div className="container mx-auto my-12 px-4 lg:w-3/4">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">درخواست عضویت در تیم</h1>
            <p className="text-gray-300 text-center mb-6 leading-relaxed">
                اگر علاقه‌مند به پیوستن به تیم ما هستید، لطفا فرم زیر را پر کنید. ما در اسرع وقت درخواست شما را بررسی کرده و با شما تماس خواهیم گرفت.
            </p>
            <div className="bg-[#151F30] rounded-2xl p-6 text-gray-200 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">اطلاعات شما</h2>
                <form className="bg-[#131720] p-5 rounded-2xl grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-300 mb-2" htmlFor="name">نام</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            required
                            onChange={e => setName(e.target.value)}
                            className="w-full py-2 text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                            placeholder="نام خود را وارد کنید"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2" htmlFor="email">ایمیل</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            required
                            dir={"ltr"}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full py-2 text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                            placeholder="ایمیل خود را وارد کنید"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2" htmlFor="telegramId">آی دی تلگرام</label>
                        <input
                            type="text"
                            id="telegramId"
                            name="telegramId"
                            dir={"ltr"}
                            value={telegramId}
                            required
                            onChange={e => setTelegramId(e.target.value)}
                            className="w-full py-2 text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                            placeholder="آی دی تلگرام خود را وارد کنید"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2" htmlFor="skills">مهارت‌ها</label>
                        <span className={"text-red-500 text-xs"}>مترجم, کلینر, تایپیست, ادیتور...</span>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={skills}
                            required
                            onChange={e => setSkills(e.target.value)}
                            className="w-full py-2 text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                            placeholder="مهارت‌های خود را وارد کنید"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full md:w-36 py-2 h-12 bg-blue-600 hover:bg-white rounded-2xl text-white hover:text-black transition duration-300"
                    >
                        ارسال درخواست
                    </button>
                </form>
            </div>
        </div>
    );
}
