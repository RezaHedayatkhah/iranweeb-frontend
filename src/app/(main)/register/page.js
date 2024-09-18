'use client';

import Link from "next/link";
import Image from "next/image"
import {useContext, useState} from "react";
import {useRouter} from "next/navigation";
import {useUser} from '@/context/UserContext';


export default function Page() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const router = useRouter()
    const {user, setUser} = useUser()

    if (user) {
        router.push('/dashboard');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({userName, email, password})
        })
        const data = await res.json()
        if (!res.ok) {
            setErrors(data.errors)
        } else {
            setUser(data.user)
            localStorage.setItem("token", data.token)
            router.push("/dashboard")
        }

    }

    return (
        <div className="w-full h-screen md:flex justify-center items-center px-5 md:mt-0 mt-12">
            <div
                className="flex flex-col w-fit justify-center items-center p-10 rounded-2xl bg-[#131720] border-2 border-[#151f30] gap-10">
                <div className="w-3/4 mx-auto">
                    <Image src="/undraw_access_account_re_8spm.svg" alt=""
                           width={75}
                           height={384}
                           className="w-3/4 md:w-96"/>
                </div>

                <form onSubmit={handleSubmit}
                      className="flex flex-col justify-center gap-3 w-full">
                    <div className="flex flex-col gap-3 text-white">
                        <label htmlFor="userName">نام کاربری</label>
                        <input
                            className="bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                            type="text" name="userName" id="userName" required value={userName}
                            onChange={(e) => setUserName(e.target.value)} autoFocus/>
                    </div>
                    {errors.filter((err) => err.path === 'userName').map((e) => (
                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                    ))}

                    <div className="flex flex-col gap-3 text-white">
                        <label htmlFor="email">ایمیل</label>
                        <input
                            className="bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                            type="email" name="email" id="email" dir="ltr" required placeholder="example@gmail.com"
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {errors.filter((err) => err.path === 'email').map((e) => (
                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                    ))}

                    <div className="flex flex-col gap-3 text-white">
                        <label htmlFor="password">رمز عبور</label>
                        <input
                            className="bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                            type="password" name="password" id="password" dir="ltr" required value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {errors.filter((err) => err.path === 'password').map((e) => (
                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                    ))}

                    {/*<div className="flex flex-col gap-3 text-white">*/}
                    {/*    <label htmlFor="password_confirmation">تأیید رمز عبور</label>*/}
                    {/*    <input*/}
                    {/*        className="bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"*/}
                    {/*        type="password" name="password_confirmation" id="password_confirmation"*/}
                    {/*        dir="ltr"*/}
                    {/*        value=""/>*/}
                    {/*</div>*/}

                    <div className="flex flex-col gap-3 mt-2 ">
                        <button
                            className="w-full text-white hover:bg-none bg-red-500 hover:bg-white hover:text-black transition duration-300 ease-in-out rounded-2xl p-4"
                            type="submit">ثبت نام
                        </button>
                        <div className="text-sm flex gap-2 text-white">
                            <span>قبلا ثبت‌نام کردم.</span>
                            <Link className="hover:underline text-blue-400 hover:cursor-pointer"
                                  href="/login">ورود</Link>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}