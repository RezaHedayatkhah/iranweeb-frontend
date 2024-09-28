"use client";
import Filter from "@/app/(main)/[contentType]/_components/Filter";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PostCard from "@/app/_components/PostCard";
import NotFound from "next/dist/client/components/not-found-error";

export default function Page({ params }) {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const routes = ["manga", "manhua", "manhwa"];

    if (!routes.includes(params.contentType)) {
        return <>{NotFound()}</>;
    }

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("contentType", params.contentType.toUpperCase());

    const getPosts = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${currentPage}&pageSize=20&${newParams}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        const data = await res.json();
        if (res.ok) {
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } else {
            console.log(data);
        }
    };

    useEffect(() => {
        getPosts();
    }, [searchParams, currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="grid grid-cols-1 gap-y-6 p-3 md:grid-cols-4 md:gap-x-5 lg:grid-cols-6 md:w-11/12 lg:w-10/12  m-auto">
            {/* Filter Section */}
            <div className="md:col-span-1">
                <Filter/>
            </div>

            {/* Posts Section */}
            <div className="md:col-span-3 lg:col-span-5 rounded-2xl bg-gray-800 py-3 px-3 md:px-5 h-fit">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {posts.map((post) => (
                        <PostCard post={post} key={post.id}/>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-center mt-4 space-x-2">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="rounded-2xl border-2 border-red-500 text-slate-300 hover:text-white hover:bg-red-500 py-2 px-3 text-center text-sm transition-all disabled:text-gray-400 disabled:pointer-events-none ml-2"
                    >
                        قبلی
                    </button>

                    {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`min-w-9 rounded-2xl py-2 px-3.5 border-2 border-red-500 text-center text-sm transition-all ${
                                currentPage === page
                                    ? "text-white bg-red-500"
                                    : "text-slate-300 hover:text-white hover:bg-red-500"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="rounded-2xl border-2 border-red-500 text-slate-300 hover:text-white hover:bg-red-500 py-2 px-3 text-center text-sm transition-all disabled:text-gray-400 disabled:pointer-events-none ml-2"
                    >
                        بعدی
                    </button>
                </div>

                {/* Pagination Summary */}
                <span className="block text-center mt-2">
                    صفحه {currentPage} از {totalPages}
                </span>
            </div>
        </div>
    );
}
