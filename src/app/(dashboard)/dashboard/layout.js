"use client"
import Link from "next/link";
import {UserProvider} from '@/context/UserContext';
import Navbar from "@/app/(dashboard)/dashboard/_components/Navbar";
import {useUser} from "@/context/UserContext";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import "@/app/globals.css";
import {useState} from "react";


config.autoAddCss = false

export default function DashboardLayout({children}) {
    const [isActive, setActive] = useState(false);

    const handleClick = (e) => {
        setActive(!isActive)
    }


    return (
        <html lang="fa" dir={'rtl'}>
        <body className="bg-[#131720] text-white min-h-screen flex flex-col antialiased ">

        <div className="bg-[#131720]">
            <UserProvider>


                <div>
                    <div
                        className="flex flex-row justify-between items-center p-5 w-full h-16 bg-[#151f30] md:hidden text-white">
                        <h1 className="text-3xl"><Link href="/">Iran<span
                            className="text-red-500">Weeb</span></Link>
                        </h1>
                        <FontAwesomeIcon icon={faBars} className={"text-2xl"} onClick={handleClick}/>
                    </div>
                    <div className="flex w-full gap-5 flex-col md:flex-row">
                        <Navbar isActive={isActive}/>
                        <div className=" text-white bg-[#131720] w-full px-5 pb-5">
                            {children}
                        </div>
                    </div>
                </div>


            </UserProvider>
        </div>
        </body>

        </html>

        )


        }