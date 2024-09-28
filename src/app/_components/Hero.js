"use client"
import {useEffect, useRef, useState} from "react";
import PostCard from "@/app/_components/PostCard";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import Link from "next/link";

export default function Hero() {
    const [posts, setPosts] = useState([]);
    const slideShowRef = useRef();


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero-posts`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setPosts(data);
                }
            } catch (error) {
                console.error('Error fetching hero posts:', error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const initSlideShow = () => {
            const slides = slideShowRef.current?.getElementsByClassName("mySlides");
            if (slides && slides.length > 0) {
                let slideIndex = 0;
                const showSlides = () => {
                    Array.from(slides).forEach((slide) => {
                        slide.style.display = "none";
                    });
                    slideIndex++;
                    if (slideIndex > slides.length) {
                        slideIndex = 1;
                    }
                    slides[slideIndex - 1].style.display = "block";
                    setTimeout(showSlides, 5000);
                };
                showSlides();
            }
        };

        // Only run initSlideShow if posts are loaded
        if (posts.length > 0) {
            initSlideShow();
        }
    }, [posts]);


    return (
        <div ref={slideShowRef}>
            {posts.map((post) => (
                    <div key={post.id} className="mySlides w-full bg-no-repeat bg-cover bg-center"
                         style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGES_URL}/${post?.backgroundImageUrl})`}}>
                        <div className="bg-gradient-to-t from-gray-950 from-5%">
                            <div
                                className="bg-gradient-to-tl from-[#131720] from-20% to-pink-800/10 w-full h-full pt-40 flex flex-col">
                                <div className="w-11/12 md:w-4/5 m-auto h-full flex flex-col gap-10">
                                    <div className="flex flex-col gap-3">
                                        <span className="text-gray-400">{post.title}</span>
                                        <h2 className="text-white text-3xl md:text-5xl lg:text-6xl">{post.originalName}</h2>

                                        <div className="flex gap-3">
                                            {post.genres?.slice(0, 4).map((genre) => (
                                                <Link key={genre.id} href={`/search?genres%5B%5D=${encodeURIComponent(genre.name)}`}
                                                   className="border-red-500 border-2 rounded-full text-gray-300 px-2.5 py-0.5 text-sm hover:text-white hover:bg-red-500 transition duration-300">
                                                    {genre.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <p className="text-gray-300 line-clamp-2 md:line-clamp-3 md:w-1/2">
                                            {post.description}
                                        </p>
                                        <Link className="w-fit text-white bg-red-500 hover:bg-red-600 rounded-bl-2xl rounded-tr-2xl px-5 py-1 transition duration-300"
                                           href={`${process.env.NEXT_PUBLIC_SITE_URL}/${post.contentType.toLowerCase()}/${post.slug}`}>ادامه...</Link>
                                    </div>
                                    <div className="flex flex-col gap-2 h-full w-full">
                                        <h2 className="text-white border-b-2 border-red-500 w-fit mb-3 text-lg">پیشنهادی</h2>
                                        {/*Swiper*/}
                                        <div className=" w-full">
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
                                                {posts.map((post) => (

                                                    <SwiperSlide key={post.id}>
                                                        <PostCard post={post}/>
                                                    </SwiperSlide>
                                                ))}

                                            </Swiper>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )
            }
        </div>
    )
}