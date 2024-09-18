"use client"

import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

export default function Like({ likeType, id }) {
    const [likes, setLikes] = useState([]);
    const like = async (isLike) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ likeType, id, isLike }),
            });

            const data = await res.json()

            if (res.ok){
                toast.success(data.message)
                await fetchLikes()
            }else {
                toast.error(data.message)
            }
    }

    const fetchLikes = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes/${likeType}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        const data = await res.json();
        if (res.ok){
            setLikes(data)
        }
    }

    useEffect(() => {
        fetchLikes()
    }, []);


    return (
        <div className={"flex gap-3 justify-center items-center"}>
            <button className={"flex gap-1"} onClick={() => like(false)}>
                <span>{likes?.filter((like) => like.isLike === false).length}</span>
                <FontAwesomeIcon icon={faThumbsDown} className={"text-red-500 text-2xl"} />
            </button>
            <button className={"flex gap-1"} onClick={() => like(true)}>
                <span>{likes?.filter((like) => like.isLike === true).length}</span>
                <FontAwesomeIcon icon={faThumbsUp} className={"text-red-500 text-2xl"} />
            </button>
        </div>
    );
}
