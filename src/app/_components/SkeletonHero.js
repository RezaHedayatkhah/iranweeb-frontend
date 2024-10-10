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

                </div>
            </div>
        </div>
    );
}
