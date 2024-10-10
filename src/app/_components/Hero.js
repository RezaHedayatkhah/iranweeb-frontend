"use client";
import { useEffect, useRef, useState } from "react";
import PostCard from "@/app/_components/PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import SkeletonHero from "@/app/_components/SkeletonHero";

export default function Hero({ posts }) {
    const slideShowRef = useRef();
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0); // Track the active slide index

    useEffect(() => {
        const initSlideShow = () => {
            const slides = slideShowRef.current?.getElementsByClassName("mySlides");
            if (slides && slides.length > 0) {
                let slideIndex = 0;
                const showSlides = () => {
                    slideIndex = (slideIndex + 1) % slides.length;
                    setActiveIndex(slideIndex);
                    setTimeout(showSlides, 5000); // Rotate every 5 seconds
                };
                showSlides();
            }
        };

        if (posts?.length > 0) {
            initSlideShow();
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [posts]);

    return (
        <>
            {!posts ? (
                <SkeletonHero />
            ) : (
                <div ref={slideShowRef} className="relative w-full h-screen overflow-hidden">
                    {posts.map((post, index) => (
                        <div
                            key={post.id}
                            className={`mySlides absolute inset-0 w-full h-screen transition-opacity duration-1000 ${
                                index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        >
                            {/* Image with lazy loading and priority optimization */}
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${isMobile ? post?.imageUrl : post?.backgroundImageUrl}`}
                                alt={post.title}
                                fill
                                priority={index === 0}
                                style={{ objectFit: "cover" }}
                                className="-z-10 w-full h-full absolute"
                                placeholder="blur"
                                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0V1OrBwACIwEEp+JEOQAAAABJRU5ErkJggg=="
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#131720] from-10% to-[#131720]/40 z-0"></div>
                            <div className="relative w-full h-full flex flex-col justify-center items-center z-10">
                                <div className="w-11/12 md:w-4/5 m-auto h-auto flex flex-col gap-10">
                                    <div className="flex flex-col gap-3">
                                        <span className="text-gray-400">{post.title}</span>
                                        <h2 className="text-white text-3xl md:text-5xl lg:text-6xl">
                                            {post.originalTitle}
                                        </h2>
                                        <div className="flex gap-3">
                                            {post.genres?.slice(0, 4).map((genre) => (
                                                <Link
                                                    key={genre.id}
                                                    href={`/search?genres%5B%5D=${encodeURIComponent(genre.name)}`}
                                                    className="border-red-500 border-2 rounded-full text-gray-300 px-2.5 py-0.5 text-sm hover:text-white hover:bg-red-500 transition duration-300"
                                                >
                                                    {genre.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <p className="text-gray-300 line-clamp-2 md:line-clamp-3 md:w-1/2">
                                            {post.description}
                                        </p>
                                        <Link
                                            className="w-fit text-white bg-red-600 hover:bg-red-600 rounded-bl-2xl rounded-tr-2xl px-5 py-1 transition duration-300"
                                            href={`${process.env.NEXT_PUBLIC_SITE_URL}/${post.contentType.toLowerCase()}/${post.slug}`}
                                        >
                                            ادامه...
                                        </Link>
                                    </div>
                                    {/*<div className="flex flex-col gap-2 w-full">*/}
                                    {/*    <h2 className="text-white border-b-2 border-red-500 w-fit mb-3 text-lg">پیشنهادی</h2>*/}
                                    {/*    <div className="w-full">*/}
                                    {/*        <Swiper*/}
                                    {/*            spaceBetween={20}  // Smaller space between slides for better layout*/}
                                    {/*            slidesPerView={2}   // Default number of slides*/}
                                    {/*            breakpoints={{*/}
                                    {/*                320: { slidesPerView: 2, spaceBetween: 10 },*/}
                                    {/*                480: { slidesPerView: 3, spaceBetween: 15 },*/}
                                    {/*                768: { slidesPerView: 4, spaceBetween: 20 },*/}
                                    {/*                1024: { slidesPerView: 5, spaceBetween: 25 },*/}
                                    {/*                1400: { slidesPerView: 6, spaceBetween: 30 },*/}
                                    {/*            }}*/}
                                    {/*        >*/}
                                    {/*            {posts.map((post) => (*/}
                                    {/*                <SwiperSlide key={post.id}>*/}
                                    {/*                     <div className={"max-w-[220px]"}>*/}
                                    {/*                         <PostCard post={post} />*/}
                                    {/*                     </div>*/}
                                    {/*                </SwiperSlide>*/}
                                    {/*            ))}*/}
                                    {/*        </Swiper>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
