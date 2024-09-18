"use client"

import { useEffect, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import RenderComments from "@/app/(main)/[contentType]/_components/RenderComments";
import {submitComment} from "@/app/_lib/api";

export default function Comment({ postId }) {
    const [body, setBody] = useState("");
    const [comments, setComments] = useState([]);
    const [isPending, startTransition] = useTransition();

    // Fetch comments from the server
    async function getComments() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            const data = await res.json();
            if (res.ok) {
                setComments(data);
            } else {
                console.error("Failed to fetch comments:", data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    useEffect(() => {
        getComments(); // Initial fetch of comments when the component mounts
    }, []);

    // Handle comment submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await submitComment(body, postId)
        const data = await res.json();

        if (res.ok) {
            toast.success(data.message);
            setBody(""); // Clear the input field
            await getComments(); // Fetch the updated list of comments
        } else {
            const errorMessages = data.errors
                .filter((err) => err.path === "body")
                .map((e) => e.msg);
            toast.error(errorMessages);
        }
    };

    return (
        <div className="flex flex-col gap-10 text-white bg-gray-900 rounded-lg p-5">
            <div className="flex flex-col">
                <h4 className="border-b-2 border-red-500 w-fit mb-3 text-lg">نظرات</h4>
                <div className="flex flex-col gap-3">
                    {comments?.map((comment) => (
                        <RenderComments key={comment.id} comment={comment} postId={postId} />
                    ))}
                </div>
            </div>

            <hr />
            <div className="flex flex-col w-full md:w-4/5 m-auto gap-3">
                <h4>کامنت جدید</h4>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <textarea
                            className="h-44 w-full bg-gray-600 focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                            name="body"
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                        ></textarea>
                    </div>
                    <div className="">
                        <button
                            className="w-fit text-white bg-red-500 hover:scale-110 rounded-2xl px-4 py-2"
                            type="submit"
                            disabled={isPending}
                        >
                            ارسال
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
