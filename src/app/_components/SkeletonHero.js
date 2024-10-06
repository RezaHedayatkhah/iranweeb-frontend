import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonPostCard from "@/app/_components/SkeletonPostCard";

export default function SkeletonHero() {
    return (
        <div className="relative w-full h-screen bg-gradient-to-t from-[#131720] from-10% to-[#131720]/40">
            {/* Background animation */}
            <div className="-z-10 absolute top-0 left-0 w-full h-full bg-gray-700 animate-pulse" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center">
                <div className="w-11/12 md:w-4/5 m-auto flex flex-col gap-8">

                    {/* Title and description skeleton */}
                    <div className="flex flex-col gap-4">
                        <div className="h-6 w-2/5 bg-gray-600 rounded-md animate-pulse" />
                        <div className="h-12 w-3/5 bg-gray-600 rounded-md animate-pulse" />

                        {/* Genre tags */}
                        <div className="flex gap-3">
                            {Array(4).fill().map((_, i) => (
                                <div key={i} className="h-8 w-20 bg-gray-600 rounded-full animate-pulse" />
                            ))}
                        </div>

                        {/* Description */}
                        <div className="h-16 w-3/5 bg-gray-600 rounded-md animate-pulse" />

                        {/* Button */}
                        <div className="text-white rounded-2xl h-8 w-16 animate-pulse bg-gray-600" />
                    </div>

                    {/* Carousel section */}
                    <div className="flex flex-col gap-3 h-full w-full">
                        <div className="h-8 w-28 bg-gray-600 animate-pulse mb-4 rounded-md" />
                        <div className="w-full">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={"auto"}
                                breakpoints={{
                                    320: { slidesPerView: 2, spaceBetween: 20 },
                                    480: { slidesPerView: 3, spaceBetween: 30 },
                                    800: { slidesPerView: 4, spaceBetween: 40 },
                                    1400: { slidesPerView: 5, spaceBetween: 40 },
                                    1700: { slidesPerView: 6, spaceBetween: 40 },
                                }}
                            >
                                {Array(10).fill(null).map((_, idx) => (
                                    <SwiperSlide key={idx}>
                                        <SkeletonPostCard />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
