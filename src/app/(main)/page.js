import Hero from "@/app/_components/Hero";
import PostCard from "@/app/_components/PostCard";
import SkeletonPostCard from "@/app/_components/SkeletonPostCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SwiperPosts from "@/app/_components/SwiperPosts";

// Fetch posts server-side
async function fetchPosts(params) {
    const queryParams = new URLSearchParams(params);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?${queryParams}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            next: {tags: ['posts'], revalidate: 86400},
        });

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        return data.posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // Return empty array if fetching fails
    }
}

const fetchHeroPosts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero-posts`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            next: {tags: ['posts'], revalidate: 86400},
        });
        if (!res.ok) throw new Error("Failed to fetch hero posts");

        return await res.json();
    } catch (error) {
        console.error("Error fetching hero posts:", error);
        return []; // Return empty array if fetching fails
    }
};

export default async function Home() {
    const latestPosts = await fetchPosts({sortBy: "newest", pageSize: "10"});
    const mostViewedPosts = await fetchPosts({sortBy: "most_viewed", pageSize: "20"});
    const heroPosts = await fetchHeroPosts();

    return (
        <main>
            <div className="w-full h-screen">
                <Hero posts={heroPosts}/>
            </div>
            <div
                className="flex flex-col items-center m-auto mt-10 gap-5 2xl:gap-10 text-black w-full px-5 md:px-0 md:w-9/12">
                <div className="flex flex-col w-full items-center gap-y-5">
                    <div className="flex flex-col gap-5 w-full text-white py-3">
                        <div
                            className="flex md:flex-row flex-col items-center justify-between w-full py-5 px-8 rounded-2xl bg-[#151f30]">
                            <div
                                className={"flex items-center justify-between gap-1.5 py-1.5 bg-[#131720] rounded-2xl"}>
                                <div
                                    className={"h-8 px-2.5 rounded-xl flex justify-center items-center text-sm text-[#e0e0e0]"}>پیشنهادی
                                </div>
                                <div
                                    className={"h-8 px-2.5 rounded-xl flex justify-center items-center text-sm text-[#e0e0e0]"}>محبوب
                                    ‌ترین‌ها
                                </div>
                                <div
                                    className={"h-8 px-2.5 rounded-xl flex justify-center items-center text-sm text-[#e0e0e0]"}>جدیدترین‌ها
                                </div>
                            </div>

                            <Link href="/search?sortBy=most_viewed"
                                  className="flex items-center gap-2 cursor-pointer text-[#e0e0e0] hover:text-red-500">
                                <span className={"text-sm"}>جستجوی پیشرفته</span>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-4 w-full">
                            {mostViewedPosts.length === 0 ? (
                                Array(20).fill(null).map((_, idx) => <SkeletonPostCard key={idx}/>)
                            ) : (
                                mostViewedPosts.map((post) => <PostCard post={post} key={post.id}/>)
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 w-full text-white py-3 overflow-x-hidden">
                        <div className="w-full py-2">
                            <h2 className=" w-fit text-4xl">جدیدترین ها</h2>
                            {/*<Link href="/search?sortBy=newest"*/}
                            {/*      className="flex items-center gap-2 cursor-pointer hover:text-blue-400">*/}
                            {/*    <p>نمایش همه</p>*/}
                            {/*    <FontAwesomeIcon icon={faArrowLeft}/>*/}
                            {/*</Link>*/}
                        </div>

                        <SwiperPosts posts={latestPosts}/>
                    </div>
                </div>
            </div>
        </main>
    );
}
