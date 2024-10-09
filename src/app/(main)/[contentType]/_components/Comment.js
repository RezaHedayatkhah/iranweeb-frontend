"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import RenderComments from "@/app/(main)/[contentType]/_components/RenderComments";
import { submitComment } from "@/app/_lib/api";
import {useUser} from "@/context/UserContext";
import { useRouter } from 'next/navigation'

export default function Comment({ postId }) {
    const [body, setBody] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
    const {user} = useUser();
    const router = useRouter()


    // Fetch comments from the server
    const getComments = async () => {
        setLoading(true); // Start loading
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
                toast.error("Failed to load comments. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            toast.error("An error occurred while fetching comments.");
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        getComments(); // Initial fetch of comments when the component mounts
    }, []);

    // Handle comment submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user){
            return router.push("/login");
        }
        setIsSubmitting(true); // Start submission

        const res = await submitComment(body, postId);
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

        setIsSubmitting(false); // End submission
    };

    return (
        <div className="flex flex-col gap-10 text-white bg-gray-900 rounded-lg p-5">
            <div className="flex flex-col">
                <h2 className="border-b-2 border-red-500 w-fit mb-3 text-lg">نظرات</h2>
                {loading ? (
                    <p className="text-gray-400">در حال بارگذاری نظرات...</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {comments?.map((comment) => (
                            <RenderComments key={comment.id} comment={comment} postId={postId} />
                        ))}
                    </div>
                )}
            </div>

            <hr />

            <div className="flex flex-col w-full md:w-4/5 m-auto gap-3">
                <h3 className="text-lg">کامنت جدید</h3>
                <form className="w-full" onSubmit={handleSubmit} aria-labelledby="new-comment-form">
                    {/* Textarea for comment */}
                    <div className="w-full">
                        <label htmlFor="comment-body" className="sr-only">متن کامنت</label>
                        <textarea
                            id="comment-body"
                            className="h-44 w-full bg-gray-600 text-white focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-3 py-2"
                            name="body"
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            aria-required="true" // Indicates this field is required
                            placeholder="نظر خود را اینجا بنویسید..." // Placeholder for better UX
                        ></textarea>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-start">
                        <button
                            className="text-white bg-red-500 hover:bg-red-600 hover:scale-105 rounded-2xl px-6 py-2 transition-transform duration-200 ease-in-out"
                            type="submit"
                            disabled={isSubmitting || body.trim() === ""} // Disable button if submitting or empty body
                        >
                            {isSubmitting ? "در حال ارسال..." : "ارسال"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
