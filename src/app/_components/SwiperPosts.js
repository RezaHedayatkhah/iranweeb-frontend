"use client"
import {Swiper, SwiperSlide} from "swiper/react";
import SkeletonPostCard from "@/app/_components/SkeletonPostCard";
import PostCard from "@/app/_components/PostCard";

export default function SwiperPosts({posts}) {
    return (
        <div className="relative swiper-container">
            <Swiper
                spaceBetween={50}
                height={384}
                slidesPerView={"auto"}
                breakpoints={{
                    320: {slidesPerView: 2, spaceBetween: 20},
                    480: {slidesPerView: 3, spaceBetween: 30},
                    800: {slidesPerView: 4, spaceBetween: 40},
                    1400: {slidesPerView: 5, spaceBetween: 40},
                    1700: {slidesPerView: 6, spaceBetween: 40},
                }}
            >
                {posts.length === 0 ? (
                    Array(10).fill(null).map((_, idx) => (
                        <SwiperSlide key={idx}>
                            <SkeletonPostCard/>
                        </SwiperSlide>
                    ))
                ) : (
                    posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <PostCard post={post}/>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    )
}