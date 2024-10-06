"use client"
import {useState} from "react";
import {toast} from "react-hot-toast";
import {data} from "framer-motion/m";

export default function Page() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const realTitle = title + ' ' + email
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({title: realTitle, description}),
        });

        const data = await response.json();
        if (response.ok) {
            toast.success(data.message);
            setTitle('');
            setDescription('');
            setEmail('');
        } else {
            toast.error(data.message)
        }
    };

    return (
        <div className="container mx-auto my-12 px-4 lg:w-3/4">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">تماس با ما</h1>
            <p className="text-gray-300 text-center mb-6 leading-relaxed">
                اگر سوال، پیشنهاد یا مشکلی دارید، خوشحال می‌شویم از شما بشنویم. تیم پشتیبانی ما همواره آماده کمک و پاسخگویی
                به شما عزیزان است.
            </p>
            <div className="bg-[#151F30] rounded-2xl p-6 text-gray-200 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">راه‌های ارتباطی</h2>
                <p className="mb-4">
                    برای تماس با ما می‌توانید از طریق ایمیل زیر اقدام کنید:
                </p>
                <a
                    href="mailto:support@iranweeb.ir"
                    className="text-blue-400 hover:underline"
                >
                    support@iranweeb.ir
                </a>
                <p className="mt-6">
                    همچنین می‌توانید سوالات خود را از طریق فرم تماس زیر ارسال کنید. ما در اسرع وقت به پیام شما پاسخ خواهیم داد.
                </p>
                <div className="mt-6">
                    <form className="space-y-4 bg-[#131720] p-5 rounded-2xl" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="title">نام</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                required
                                onChange={e => setTitle(e.target.value)}
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
                                onChange={e => setEmail(e.target.value)}
                                className="w-full py-2 text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                placeholder="ایمیل خود را وارد کنید"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="description">پیام</label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                required
                                onChange={e => setDescription(e.target.value)}
                                className="w-full py-2 text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-32"
                                placeholder="پیام خود را بنویسید"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-36 py-2 h-12 bg-blue-600 hover:bg-white rounded-2xl text-white hover:text-black transition duration-300"
                        >
                            ارسال پیام
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
