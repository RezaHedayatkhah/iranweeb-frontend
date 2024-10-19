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
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const {user, setUser} = useUser()

    if (user) {
        router.push('/dashboard');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({userName, email, password})
        })
        const data = await res.json()
        if (!res.ok) {
            setErrors(data.errors)
            setIsLoading(false);

        } else {
            setUser(data.user)
            localStorage.setItem("token", data.token)
            setIsLoading(false);
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
                            onChange={(e) => setUserName(e.target.value)} />
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
                            disabled={isLoading}
                            className="w-full flex gap-3 items-center justify-center  text-white hover:bg-none bg-red-500 hover:bg-white hover:text-black transition duration-300 ease-in-out rounded-2xl p-4"
                            type="submit">
                            <span>ثبت نام</span>
                            {isLoading && (
                                <div
                                    className="">
                                    <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="18" height="18">
                                        <path
                                            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                            stroke="currentColor" strokeWidth="5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path
                                            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                            stroke="currentColor" strokeWidth="5" strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-red-500">
                                        </path>
                                    </svg>
                                </div>
                            )}
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