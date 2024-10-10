"use client";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Suspense, useState } from "react";
import Search from "@/app/_components/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimneyUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const { user } = useUser();
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
        setActive(!isActive);
    };

    return (
        <header className="bg-[#131720] p-4 border-b border-[#151f30] z-20">
            <div className="container mx-auto flex justify-between items-center">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-500 focus:outline-none"
                    onClick={handleClick}
                    aria-label="Toggle Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Logo */}
                <h1 className="text-xl font-bold">
                    <Link href="/" aria-label="Home">
                        Iran<span className="text-red-500">Weeb</span>
                    </Link>
                </h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 h-9 items-center justify-between w-56">
                    <Link href="/" aria-label="Home" className="hover:text-red-500">
                        خانه
                    </Link>
                    <Link href="/manga" aria-label="Manga" className="hover:text-red-500">
                        مانگا
                    </Link>
                    <Link href="/manhwa" aria-label="Manhwa" className="hover:text-red-500">
                        مانهوا
                    </Link>
                    <Link href="/manhua" aria-label="Manhua" className="hover:text-red-500">
                        مانها
                    </Link>
                </nav>

                {/* Search and User Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center bg-[#151f30] rounded-full px-3 py-1 w-full max-w-sm">
                        <Suspense>
                            <Search />
                        </Suspense>
                    </div>

                    {/* User Action (Dashboard or Login) */}
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 hover:text-red-500 transition duration-300"
                            aria-label="Dashboard"
                        >
                            <span>داشبورد</span>
                            <FontAwesomeIcon icon={faHouseChimneyUser} className="text-red-500" />
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 hover:text-red-500 transition duration-300"
                            aria-label="Login"
                        >
                            <span>ورود</span>
                            <FontAwesomeIcon icon={faRightToBracket} className="text-red-500 w-5 h-5" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isActive ? "block" : "hidden"} transition duration-300`} id="mobile-menu">
                <nav className="flex flex-col space-y-2 px-4 py-2 bg-[#131720]">
                    <Link href="/" aria-label="Home" className="block hover:bg-gray-700 p-2 rounded">
                        خانه
                    </Link>
                    <Link href="/manga" aria-label="Manga" className="block hover:bg-gray-700 p-2 rounded">
                        مانگا
                    </Link>
                    <Link href="/manhwa" aria-label="Manhwa" className="block hover:bg-gray-700 p-2 rounded">
                        مانهوا
                    </Link>
                    <Link href="/manhua" aria-label="Manhua" className="block hover:bg-gray-700 p-2 rounded">
                        مانها
                    </Link>
                </nav>
            </div>

            {/* Mobile Search Bar */}
            <div className="flex items-center bg-[#151f30] rounded-full px-3 py-1 mt-3 md:hidden">
                <Suspense>
                    <Search />
                </Suspense>
            </div>
        </header>
    );
}
