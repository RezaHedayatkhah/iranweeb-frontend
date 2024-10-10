"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";  // Added Swiper navigation styles
import Link from "next/link";
import Image from "next/image";
import SkeletonHero from "@/app/_components/SkeletonHero";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";

export default function Hero({ posts }) {
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!posts ? (
                <SkeletonHero />
            ) : (
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}  // Enable navigation
                    modules={[Autoplay, Pagination, Navigation]}  // Include Navigation module
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index
                    className="mySwiper"
                >
                    {posts.map((post, index) => (
                        <SwiperSlide key={post.id}> {/* Moved key here */}
                            <div
                                className={` w-full h-screen transition-opacity duration-1000 ${
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
                                    className="w-full h-full "
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
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
}
