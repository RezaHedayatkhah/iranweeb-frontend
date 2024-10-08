"use client"
import Link from "next/link";
import {useUser} from "@/context/UserContext";
import {Suspense, useState} from "react";
import Search from "@/app/_components/Search";

export default function Navbar() {
    const {user} = useUser()
    const [isActive, setActive] = useState(false);


    const handleClick = (e) => {
        setActive(!isActive)
    }
    return (
        <header className="bg-[#131720] p-4 border-b border-[#151f30]">
            <div className="container mx-auto flex justify-between items-center">
                <button className="md:hidden text-gray-500 focus:outline-none" onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
                <h1 className="text-xl font-bold ">
                    <Link href="/">Iran<span className="text-red-500">Weeb</span></Link>
                </h1>

                <nav className="hidden md:grid grid-cols-4 gap-16">
                    <Link href="/" aria-label="Home" className="hover:text-red-500">خانه</Link>
                    <Link href="/manga" aria-label="Manga"
                          className="hover:text-red-500">مانگا</Link>
                    <Link href="/manhwa" aria-label="Manhwa"
                          className="hover:text-red-500">مانهوا</Link>
                    <Link href="/manhua" aria-label="Manhua"
                          className="hover:text-red-500">مانها</Link>
                </nav>

                <div className="flex items-center gap-2 md:w-1/3">
                    <div
                        className={`items-center justify-between bg-[#151f30] rounded-full text-gray-400 px-3 w-full md:flex hidden`}>
                        <Suspense>
                            <Search />
                        </Suspense>
                    </div>
                    {user ? (<Link href="/dashboard" className="hover:text-red-500"
                                   aria-label="Dashboard">داشبورد</Link>) : (
                        <Link href="/login" className="hover:text-red-500" aria-label="Login">ورود</Link>
                    )}
                    <i className="fa-solid fa-right-to-bracket text-red-500"></i>
                </div>
            </div>
            <div className={`md:hidden ${!isActive && 'hidden'}`} id="mobile-menu">
                <Link href="/" aria-label="Home"
                      className="block px-4 py-2 hover:bg-gray-700">خانه</Link>
                <Link href="/manga" aria-label="Manga"
                      className="block px-4 py-2 hover:bg-gray-700">مانگا</Link>
                <Link href="/manhwa" aria-label="Manhwa"
                      className="block px-4 py-2 hover:bg-gray-700">مانهوا</Link>
                <Link href="/manhua" aria-label="Manhua"
                      className="block px-4 py-2 hover:bg-gray-700">مانها</Link>
            </div>
            <div
                className="flex items-center justify-between bg-[#151f30] rounded-full text-gray-400 px-3 w-full md:hidden mt-3">

                <Suspense>
                    <Search />
                </Suspense>

            </div>
        </header>
    )
}