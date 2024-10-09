"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as solidFaBookmark} from "@fortawesome/free-solid-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useUser} from "@/context/UserContext";
import {toast} from "react-hot-toast";

export default function Bookmark({postId}){
    const [bookmarked, setBookmarked] = useState(false);
    const {user} = useUser();

    const fetchBookmark = async () => {
        if(user){
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL+ `/api/bookmarks/${postId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: 'include', // Ensures cookies are sent with the request
            });

            const data = await res.json();
            if (data.bookmarks) {
                setBookmarked(true)
            }else {
                setBookmarked(false);
            }
        }
    }

    useEffect(() => {
        fetchBookmark();
    },[])

    const handleClick = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/bookmarks', {
            method: (bookmarked ? 'DELETE' : 'POST'),
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: 'include', // Ensures cookies are sent with the request

            body: JSON.stringify({
                postId: postId,
            })
        })
        const data = await res.json()
        if (res.ok) {
            await fetchBookmark()
            toast.success(data.message)
        }
    }

    return (
        <>
            {user ? (
                <button
                    onClick={handleClick}
                    aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                    className="focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-transform duration-200 ease-in-out"
                >
                    <FontAwesomeIcon
                        icon={bookmarked ? solidFaBookmark : faBookmark}
                        className="text-yellow-500 text-2xl"
                    />
                </button>
            ) : (
                <Link href="/login" aria-label="Login to bookmark">
                    <FontAwesomeIcon icon={faBookmark} className="text-yellow-500 text-2xl" />
                </Link>
            )}
        </>

    )
}