'use client';

import Link from "next/link";
import Image from "next/image"
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Page() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
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
            console.log(res)
            router.push("/dashboard");
        } else {
            setErrors(data.errors)
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
                            className="w-full text-white hover:bg-none bg-red-500 hover:bg-white hover:text-black transition duration-300 ease-in-out rounded-2xl p-4"
                            type="submit">ورود
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