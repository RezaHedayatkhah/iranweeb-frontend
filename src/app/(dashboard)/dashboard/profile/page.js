"use client"
import Image from "next/image";
import {useUser} from "@/context/UserContext";
import {useState} from "react";
import { toast } from 'react-hot-toast';

export default function page() {
    const {user, setUser} = useUser();
    if (!user) {
        return (
            <div>loading....</div>
        )
    }
    const [errors, setErrors] = useState([]);
    const [userData, setUserData] = useState({
        userName: user.userName || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        cardNumber: user.cardNumber || '',
        bio: user.bio || '',
    })
    const [passwords, setPasswords] = useState({
        password: '',
        newPassword: '',
        passwordConfirmation: '',
    })

    const updatePassword = async (e)=>{
        e.preventDefault();
        setErrors([])

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-password-update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: 'include', // Include credentials (cookies) in the request

            body: JSON.stringify(passwords)
        })

        const data = await res.json()
        if (!res.ok){
            setErrors(data.errors)
            if (data.message){
                toast.error(data.message,{
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                })
            }
        }else {
            setPasswords({
                password: '',
                newPassword: '',
                passwordConfirmation: '',
            })
            if (data.message) {
                toast.success(data.message, {
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                })
            }
        }

    }

    const updateProfile = async (e) => {
        e.preventDefault();
        setErrors([]);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: 'include', // Include credentials (cookies) in the request

            body: JSON.stringify(userData)
        })

        const data = await res.json()
        if (!res.ok){
            setErrors(data.errors)
            if (data.message){
                toast.error(data.message,{
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                })
            }

        }else {
            setUser(data.user)
            if (data.message) {
                toast.success(data.message, {
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                })
            }
        }

    }
    return (
        <div className="flex flex-col w-full">
            <div className="w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <h1 className="text-3xl">پروفایل</h1>

            </div>
            <div className="flex flex-row gap-4 w-full bg-[#151f30] rounded-2xl p-5 mb-7">
                <Image src="https://flixtv.volkovdesign.com/admin/img/user.svg" width={40} height={40} alt={"profilePicture"} className="rounded-xl p-1"/>
                <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">{user?.role === 'ADMIN' ? 'ادمین' : 'کاربر عادی'}</span>
                    <span className="text-lg">{user?.userName}</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 justify-between bg-[#151f30] rounded-2xl p-5 text-sm">

                <form onSubmit={updateProfile}
                      className="grid grid-cols-1 md:grid-cols-2 md:w-1/2 w-full gap-5 bg-[#131720] rounded-2xl p-5">
                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="userName">نام کاربری</label>
                            <input
                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                id="userName" type="text" name="userName" placeholder=""
                                value={userData.userName}
                                onChange={e => setUserData({...userData, [e.target.name]: e.target.value})}/>
                        </div>
                        {errors?.filter((err) => err.path === 'userName').map((e) => (
                            <div key={e.msg} className="text-red-500">{e.msg}</div>
                        ))}
                    </div>
                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">ایمیل</label>
                            <input
                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                id="email" type="email" name="email" placeholder=""
                                value={userData.email}
                                onChange={e => setUserData({...userData, [e.target.name]: e.target.value})}/>
                        </div>
                        {errors?.filter((err) => err.path === 'email').map((e) => (
                            <div key={e.msg} className="text-red-500">{e.msg}</div>
                        ))}
                    </div>

                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="firstName">نام</label>
                            <input
                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                id="firstName" type="text" name="firstName" placeholder=""
                                value={userData.firstName}
                                onChange={e => setUserData({...userData, [e.target.name]: e.target.value})}/>
                        </div>
                        {errors?.filter((err) => err.path === 'firstName').map((e) => (
                            <div key={e.msg} className="text-red-500">{e.msg}</div>
                        ))}
                    </div>

                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="lastName">ایمیل</label>
                            <input
                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                id="lastName" type="text" name="lastName" placeholder=""
                                value={userData.lastName}
                                onChange={e => setUserData({...userData, [e.target.name]: e.target.value})}/>
                        </div>
                        {errors?.filter((err) => err.path === 'lastName').map((e) => (
                            <div key={e.msg} className="text-red-500">{e.msg}</div>
                        ))}
                    </div>

                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="bio">بیوگرافی</label>
                            <input
                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                id="bio" type="text" name="bio" placeholder=""
                                value={userData.bio}
                                onChange={e => setUserData({...userData, [e.target.name]: e.target.value})}/>
                        </div>
                        {errors?.filter((err) => err.path === 'bio').map((e) => (
                            <div key={e.msg} className="text-red-500">{e.msg}</div>
                        ))}
                    </div>

                    <button type="submit"
                            className="md:col-span-2 text-white bg-blue-500 hover:bg-white transition duration-300 ease-in-out hover:text-black w-44 rounded-2xl h-12">
                        ثبت
                    </button>

                </form>

                <form onSubmit={updatePassword}
                      className="grid grid-cols-1 md:grid-cols-2 md:w-1/2 w-full gap-5 bg-[#131720] rounded-2xl p-5">
                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">رمز عبور فعلی</label>
                            <input
                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                id="password" type="password" name="password"
                                value={passwords.password} onChange={e => setPasswords({...passwords, [e.target.name]: e.target.value})}
                            />
                        </div>
                        {errors?.filter((err) => err.path === 'password').map((e) => (
                            <div key={e.msg} className="text-red-500">{e.msg}</div>
                        ))}
                    </div>
                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="newPassword">رمز عبور جدید</label>
                            <input
                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                id="newPassword" type="password" name="newPassword" value={passwords.newPassword} onChange={e => setPasswords({...passwords, [e.target.name]: e.target.value})}/>
                        </div>
                        {errors?.filter((err) => err.path === 'newPassword').map((e) => (
                            <div key={e.msg} className="text-red-500">{e.msg}</div>
                        ))}
                    </div>
                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="passwordConfirmation">رمز عبور فعلی</label>
                            <input
                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                id="passwordConfirmation" type="password" name="passwordConfirmation" value={passwords.passwordConfirmation} onChange={e => setPasswords({...passwords, [e.target.name]: e.target.value})}/>
                        </div>
                        {errors?.filter((err) => err.path === 'passwordConfirmation').map((e) => (
                            <div key={e.msg} className="text-red-500">{e.msg}</div>
                        ))}
                    </div>

                    <button type="submit"
                            className="md:col-span-2 text-white bg-blue-500 hover:bg-white transition duration-300 ease-in-out hover:text-black w-44 rounded-2xl h-12">
                        ثبت
                    </button>

                </form>
            </div>

        </div>

    )
}