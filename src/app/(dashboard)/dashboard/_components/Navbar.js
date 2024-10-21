import Link from "next/link";
import Image from "next/image";
import {useUser} from "@/context/UserContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faBookmark, faCartShopping,
    faComments,
    faEnvelope,
    faHouseChimneyUser, faPenToSquare, faReceipt, faSquarePlus, faTags,
    faThumbsUp,
    faUser, faUsers
} from '@fortawesome/free-solid-svg-icons'
import {usePathname} from "next/navigation";

export default function Navbar({isActive}) {
    const {user, logout} = useUser();
    const pathname = usePathname();

    return (
        <div
            className={`overflow-y-auto pb-5 z-50 flex flex-col bg-[#131720] border-l border-blue-500 border-opacity-10 w-5/6 md:w-[280px] text-white h-screen fixed top-0 md:-right-0 transform transition-transform duration-300 md:transform-none ${isActive ? "translate-x-0" : "translate-x-full"}`}>
            <h1 className="px-7 h-20 flex items-center text-3xl border-b border-blue-500 border-opacity-10"><Link
                href="/">ایران <span
                className="text-red-500">ویب</span></Link>
            </h1>
            <div className="flex flex-row justify-between gap-4 py-5 px-7 border-b border-blue-500 border-opacity-10">
                <div className={"flex gap-4"}>
                    <Image src="/user.svg" width={40} height={40}
                           className="rounded-xl" alt={'asd'}/>
                    <div className="flex flex-col overflow-hidden">
                        {/*<span className="text-gray-500 text-sm">{user?.role}</span>*/}
                        <span className="truncate text-base text-right" dir="ltr">
                            {user?.userName?.length > 10 ? `${user.userName.slice(0, 10)}...` : user?.userName}
                        </span>
                        <span
                            className="text-xs text-gray-400">{(user?.balance / 10).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</span>
                    </div>
                </div>
                <div className={"w-fit h-fit"}>
                    <button onClick={logout}
                            className={`w-10 h-10 flex justify-center items-center text-red-500 hover:text-black transition duration-300 bg-[#151f30] hover:bg-white rounded-xl`}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={"text-lg"}/>
                    </button>
                </div>
            </div>
            <div className="pr-5 pl-2 flex flex-col gap-5 py-5">

                <Link href="/dashboard"
                      className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard' ? 'text-red-500' : ''}`}>
                    <FontAwesomeIcon icon={faHouseChimneyUser} className={"text-xl text-red-500"}/>
                    <span>داشبورد</span>
                </Link>

                <Link href="/dashboard/purchases"
                      className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/purchases' ? 'text-red-500' : ''}`}>
                    <FontAwesomeIcon icon={faCartShopping} className={"text-xl text-red-500"}/>
                    <span>خریدها</span>
                </Link>

                <Link href="/dashboard/bookmarks"
                      className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/bookmarks' ? 'text-red-500' : ''}`}>
                    <FontAwesomeIcon icon={faBookmark} className={"text-xl text-red-500"}/>
                    <span>نشانک‌ها</span>
                </Link>

                <Link href="/dashboard/likes"
                      className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/likes' ? 'text-red-500' : ''}`}>
                    <FontAwesomeIcon icon={faThumbsUp} className={"text-xl text-red-500"}/>

                    <span>علاقه مندی ها</span>
                </Link>

                <Link href="/dashboard/profile"
                      className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/profile' ? 'text-red-500' : ''}`}>
                    <FontAwesomeIcon icon={faUser} className={"text-xl text-red-500"}/>

                    <span>پروفایل</span>
                </Link>

                <Link href="/dashboard/comments"
                      className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/comments' ? 'text-red-500' : ''}`}>
                    <FontAwesomeIcon icon={faComments} className={"text-xl text-red-500"}/>
                    <span>دیدگاه ها</span>
                </Link>

                <Link href="/dashboard/receipts"
                      className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/receipts' ? 'text-red-500' : ''}`}>
                    <FontAwesomeIcon icon={faReceipt} className={"text-xl text-red-500"}/>
                    <span>رسیدها</span>
                </Link>

                <Link href="/dashboard/tickets"
                      className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/tickets' ? 'text-red-500' : ''}`}>
                    <FontAwesomeIcon icon={faEnvelope} className={"text-xl text-red-500"}/>
                    <span>تیکت ها</span>
                </Link>

                {user?.role === "ADMIN" &&
                    <>
                        <Link href="/dashboard/posts/create"
                              className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/posts/create' ? 'text-red-500' : ''}`}>
                            <FontAwesomeIcon icon={faSquarePlus} className={"text-xl text-red-500"}/>
                            <span>پست جدید</span>
                        </Link>

                        <Link href="/dashboard/posts"
                              className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/posts' ? 'text-red-500' : ''}`}>
                            <FontAwesomeIcon icon={faPenToSquare} className={"text-xl text-red-500"}/>
                            <span>ادیت پست</span>
                        </Link>

                        <Link href="/dashboard/genres"
                              className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/genres' ? 'text-red-500' : ''}`}>
                            <FontAwesomeIcon icon={faTags} className={"text-xl text-red-500"}/>
                            <span>ژانر جدید</span>
                        </Link>

                        <Link href="/dashboard/comments/all"
                              className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/comments/all' ? 'text-red-500' : ''}`}>
                            <FontAwesomeIcon icon={faComments} className={"text-xl text-red-500"}/>

                            <span>دیدگاه های کاربران</span>
                        </Link>

                        <Link href="/dashboard/users"
                              className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/users' ? 'text-red-500' : ''}`}>
                            <FontAwesomeIcon icon={faUsers} className={"text-xl text-red-500"}/>

                            <span>لیست کاربران</span>
                        </Link>

                        <Link href="/dashboard/tickets/all"
                              className={`flex gap-2 hover:text-red-500 transition duration-300 ${pathname === '/dashboard/tickets/all' ? 'text-red-500' : ''}`}>
                            <FontAwesomeIcon icon={faEnvelope} className={"text-xl text-red-500"}/>

                            <span>تیکت های کاربران</span>
                        </Link>
                    </>
                }


            </div>


        </div>
    )
}