'use client';

import Link from "next/link";
import Image from "next/image"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "react-hot-toast";
import Loading from "@/app/(main)/loading";

export default function Page() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        setIsLoading(true);
        //  Send to our api route
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
            credentials: "include", // Important to include cookies in the request

        });

        const data = await res.json();

        // Redirect to login if success
        if (res.ok) {
            setIsLoading(false);
            router.push("/dashboard");
        } else {
            if (data.message) {
                toast.error(data.message)
            }
            setErrors(data.errors)
            setIsLoading(false);
        }
    }


    return (
        <div className="w-full h-screen md:flex justify-center items-center px-5 md:mt-0 mt-12">
            <div
                className="flex flex-col w-fit justify-center items-center p-10 rounded-2xl bg-[#131720] border-2 border-[#151f30] gap-10">
                <div>
                    <Image src="/undraw_login_re_4vu2.svg" alt=""
                           width={75}
                           height={384}
                           className="w-3/4 md:w-96"/>
                </div>

                <form onSubmit={handleSubmit}
                      className="flex flex-col justify-center gap-3 w-full">

                    <div className="flex flex-col gap-3 text-white">
                        <label htmlFor="email">ایمیل</label>
                        <input
                            className="bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                            type="email" name="email" id="email" dir="ltr" required placeholder="example@gmail.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    {errors?.filter((err) => err.path === 'email').map((e) => (
                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                    ))}

                    <div className="flex flex-col gap-3 text-white">
                        <label htmlFor="password">رمز عبور</label>
                        <input
                            className="bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                            type="password" name="password" id="password" dir="ltr" required value={password} onChange={e=>setPassword(e.target.value)}/>
                    </div>
                    {errors?.filter((err) => err.path === 'password').map((e) => (
                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                    ))}

                    {/*<div className="flex items-center gap-3 text-white">*/}
                    {/*    <input type="checkbox" name="remember" id="remember" className="peer hidden" checked/>*/}
                    {/*    <label htmlFor="remember"*/}
                    {/*           className="select-none bg-[#151f30] cursor-pointer rounded h-3 w-3 peer-checked:bg-red-500 outline outline-2 outline-offset-2 outline-red-500"></label>*/}
                    {/*    <span>مرا بخاطر بسپار</span>*/}
                    {/*</div>*/}

                    <div className="flex flex-col gap-3">
                        <button
                            disabled={isLoading}
                            className="w-full flex gap-3 items-center justify-center text-white hover:bg-none bg-red-500 hover:bg-white hover:text-black transition duration-300 ease-in-out rounded-2xl p-4"
                            type="submit">
                            <span>ورود</span>
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
                        <div className="text-sm text-white">
                            <span>هنوز ثبت‌نام نکرده‌اید؟</span>
                            <Link className="hover:underline text-blue-400 hover:cursor-pointer"
                                  href="/register">ثبت نام</Link>

                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}