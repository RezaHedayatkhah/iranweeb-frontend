"use client"
import Hero from "@/app/_components/Hero";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import PostCard from "@/app/_components/PostCard";
import {Swiper, SwiperSlide} from "swiper/react";
import SkeletonPostCard from "@/app/_components/SkeletonPostCard";
import Link from "next/link";

export default function Home() {
    const [latestPosts, setLatestPosts] = useState([]);
    const [mostViewedPosts, setMostViewedPosts] = useState([]);
    const [loadingLatest, setLoadingLatest] = useState(true);
    const [loadingMostViewed, setLoadingMostViewed] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams({
            'sortBy': 'newest',
            'pageSize': '10',
        });
        // Fetch latest posts
        const fetchLatestPosts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?` + params, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setLatestPosts(data.posts);
                    setLoadingLatest(false);
                }
            } catch (error) {
                console.error("Error fetching latest posts:", error);
            }
        };

        // Fetch most viewed posts
        const fetchMostViewedPosts = async () => {
            const params = new URLSearchParams({
                'sortBy': 'most_viewed',
                'pageSize': '24',
            });
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?` + params, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setMostViewedPosts(data.posts);
                    setLoadingMostViewed(false);
                }
            } catch (error) {
                console.error("Error fetching most viewed posts:", error);
            }
        };

        fetchLatestPosts();
        fetchMostViewedPosts();
    }, []);
    return (
        <main>
            <div className={"w-full h-screen"}>
                <Hero/>

            </div>
            <div
                className="flex flex-col items-center m-auto mt-10 gap-5 2xl:gap-10 text-black w-full px-5 md:px-0 md:w-9/12">
                <div className="flex flex-col w-full items-center gap-y-5">
                    <div className="flex flex-col gap-5 w-full text-white py-3">
                        <div className="flex justify-between w-full p-3 rounded-2xl bg-[#151f30]">
                            <h2 className="border-b-2 border-red-500 w-fit text-lg">محبوب ترین ها</h2>
                            <a href=""
                               className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
                                <p>نمایش همه</p>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </a>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-4 w-full">
                            {loadingMostViewed ? (
                                Array(24).fill(null).map((_, idx) => <SkeletonPostCard key={idx}/>)
                            ) : (
                                mostViewedPosts.map((post) => (
                                    <PostCard post={post} key={post.id}/>
                                ))
                            )}

                        </div>
                    </div>

                    <div className="flex flex-col gap-5 w-full text-white py-3 overflow-x-hidden">
                        <div className="flex justify-between w-full p-3 rounded-2xl bg-[#151f30]">
                            <h2 className="border-b-2 border-red-500 w-fit text-lg">جدیدترین ها</h2>
                            <Link href="/search?sortBy=date"
                               className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
                                <p>نمایش همه</p>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </Link>
                        </div>

                        <div className="relative swiper-container">
                            <Swiper
                                spaceBetween={50}
                                height={384}
                                slidesPerView={"auto"}
                                breakpoints={
                                    {
                                        320: {
                                            slidesPerView: 2,
                                            spaceBetween: 20
                                        },
                                        480: {
                                            slidesPerView: 3,
                                            spaceBetween: 30
                                        },
                                        800: {
                                            slidesPerView: 4,
                                            spaceBetween: 40
                                        },
                                        1400: {
                                            slidesPerView: 5,
                                            spaceBetween: 40
                                        },
                                        1700: {
                                            slidesPerView: 6,
                                            spaceBetween: 40
                                        }
                                    }
                                }
                            >
                                {loadingLatest ? (
                                    Array(10).fill(null).map((_, idx) => (
                                        <SwiperSlide key={idx}>
                                            <SkeletonPostCard />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    latestPosts.map((post) => (
                                        <SwiperSlide key={post.id}>
                                            <PostCard post={post}/>
                                        </SwiperSlide>
                                    ))
                                )}

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
