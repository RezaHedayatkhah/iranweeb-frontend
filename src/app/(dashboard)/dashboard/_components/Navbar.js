import Link from "next/link";
import Image from "next/image";
import {useUser} from "@/context/UserContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faBookmark, faCartShopping,
    faComments,
    faEnvelope,
    faHouseChimneyUser, faPenToSquare, faReceipt, faRightFromBracket, faSquarePlus, faTags,
    faThumbsUp,
    faUser, faUsers
} from '@fortawesome/free-solid-svg-icons'


export default function Navbar({isActive}) {
    const {user, logout} = useUser();

    return (
        <div
             className={`overflow-y-auto pb-5 z-50 flex flex-col bg-[#131720] border-l border-blue-500 border-opacity-10 w-5/6 md:w-1/6 text-white h-screen  fixed top-0 md:-right-0 md:relative transform transition-transform duration-300 md:transform-none ${isActive ? "translate-x-0" : "translate-x-full"}`}>
            <h1 className="p-5 text-3xl border-b border-blue-500 border-opacity-10"><Link href="/">Iran<span
                className="text-red-500">Weeb</span></Link>
            </h1>
            <div className="flex flex-row gap-4 p-5 border-b border-blue-500 border-opacity-10">
                <Image src="https://flixtv.volkovdesign.com/admin/img/user.svg" width={40} height={40}
                       className="rounded-xl p-1" alt={'asd'}/>
                <div className="flex flex-col overflow-hidden">
                    {/*<span className="text-gray-500 text-sm">{user?.role}</span>*/}
                    <span className="text-lg truncate" dir={"ltr"}>{user?.userName}</span>
                    <span className="text-sm text-gray-400">{(user?.balance / 10).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</span>
                </div>
            </div>
            <div className="pr-5 pl-2 flex flex-col gap-5">

                <Link href="/dashboard" className="flex gap-2">
                    <FontAwesomeIcon icon={faHouseChimneyUser} className={"text-xl text-red-500"}/>
                    <span>داشبورد</span>
                </Link>

                <Link href="/dashboard/purchases" className="flex gap-2">
                    <FontAwesomeIcon icon={faCartShopping} className={"text-xl text-red-500"}/>
                    <span>خریدها</span>
                </Link>

                <Link href="/dashboard/bookmarks" className="flex gap-2">
                    <FontAwesomeIcon icon={faBookmark} className={"text-xl text-red-500"}/>
                    <span>نشانک‌ها</span>
                </Link>

                <Link href="/dashboard/likes" className="flex gap-2">
                    <FontAwesomeIcon icon={faThumbsUp} className={"text-xl text-red-500"}/>

                    <span>علاقه مندی ها</span>
                </Link>

                <Link href="/dashboard/profile" className="flex gap-2">
                    <FontAwesomeIcon icon={faUser} className={"text-xl text-red-500"}/>

                    <span>پروفایل</span>
                </Link>

                <Link href="/dashboard/comments" className="flex gap-2">
                    <FontAwesomeIcon icon={faComments} className={"text-xl text-red-500"}/>
                    <span>دیدگاه ها</span>
                </Link>

                <Link href="/dashboard/receipts" className="flex gap-2">
                    <FontAwesomeIcon icon={faReceipt} className={"text-xl text-red-500"}/>
                    <span>رسیدها</span>
                </Link>

                <Link href="/dashboard/tickets" className="flex gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className={"text-xl text-red-500"}/>
                    <span>تیکت ها</span>
                </Link>

                {user?.role === "ADMIN" &&
                    <>
                        <Link href="/dashboard/posts/create" className="flex gap-2">
                            <FontAwesomeIcon icon={faSquarePlus} className={"text-xl text-red-500"}/>
                            <span>پست جدید</span>
                        </Link>

                        <Link href="/dashboard/posts" className="flex gap-2">
                            <FontAwesomeIcon icon={faPenToSquare} className={"text-xl text-red-500"}/>
                            <span>ادیت پست</span>
                        </Link>

                        <Link href="/dashboard/genres" className="flex gap-2">
                            <FontAwesomeIcon icon={faTags} className={"text-xl text-red-500"}/>
                            <span>ژانر جدید</span>
                        </Link>

                        <Link href="/dashboard/comments/all" className="flex gap-2">
                            <FontAwesomeIcon icon={faComments} className={"text-xl text-red-500"}/>

                            <span>دیدگاه های کاربران</span>
                        </Link>

                        <Link href="/dashboard/users" className="flex gap-2">
                            <FontAwesomeIcon icon={faUsers} className={"text-xl text-red-500"}/>

                            <span>لیست کاربران</span>
                        </Link>

                        <Link href="/dashboard/tickets/all" className="flex gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className={"text-xl text-red-500"}/>

                            <span>تیکت های کاربران</span>
                        </Link>
                    </>
                }


                <button onClick={logout} className="flex gap-2">
                    <FontAwesomeIcon icon={faRightFromBracket} className={"text-xl text-red-500"}/>
                    <span>خروج</span>
                </button>

            </div>


        </div>
    )
}