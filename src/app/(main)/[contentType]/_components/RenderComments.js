import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import {submitComment} from "@/app/_lib/api";
import formatDate from "@/app/_components/formatDate";

export default function RenderComments({ comment, postId }) {
    const [body, setBody] = useState("");
    const [isCommenting, setIsCommenting] = useState({});
    const hiddenParentId = useRef(null);

    const handleSubmit = async (e) => {
        const parentId = hiddenParentId.current.value;

        const res = await submitComment(body, postId, parentId)
        const data = await res.json();
        if (res.ok) {
            toast.success(data.message);
            setBody(""); // Clear the input field
        } else {
            const errorMessages = data.errors
                .filter((err) => err.path === "body")
                .map((e) => e.msg);
            toast.error(errorMessages);
        }


    };

    const toggleReplyForm = (commentId) => {
        setIsCommenting((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    return (
        <div
            key={comment.id}
            className="flex flex-col gap-3"
            style={{ marginRight: comment.parentId ? "20px" : "0px" }}
        >
            <div className="bg-gray-700 p-3 rounded-lg flex flex-col text-white">
                <div className="flex flex-col text-sm md:text-base">
                    <div className="flex justify-between">
                        <strong>{comment.user.userName}</strong>
                    </div>
                    <p className="my-2">{comment.body}</p>
                    <span className="w-full text-start text-sm" dir={"ltr"}>
                        {formatDate(comment.createdAt)}
                    </span>
                </div>

                <button
                    type="button"
                    className="cursor-pointer rounded-xl border-red-500 border-2 w-fit text-sm p-1 hover:bg-red-500"
                    onClick={() => toggleReplyForm(comment.id)}
                >
                    پاسخ
                </button>
                <form
                    method="post"
                    onSubmit={handleSubmit}
                    className={`flex flex-col gap-3 mt-3 reply-form ${
                        isCommenting[comment.id] ? "" : "hidden"
                    }`}
                >
                    <textarea
                        name="body"
                        id="body"
                        cols="30"
                        rows="10"
                        className="bg-gray-900 h-44 focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                    <input type="hidden" name="parentId" value={comment.id} ref={hiddenParentId} />
                    <input
                        type="submit"
                        className="w-fit hover:bg-gradient-to-br from-red-500 to-pink-800 border-2 border-red-500 rounded-2xl px-5 py-1 text-white hover:cursor-pointer"
                        value="ارسال"
                    />
                </form>
            </div>

            {/* Render nested replies */}
            <div className="flex gap-y-2 flex-col">
                {comment.replies?.map((reply) => (
                    <RenderComments key={reply.id} comment={reply} postId={postId} />
                ))}
            </div>
        </div>
    );
}
