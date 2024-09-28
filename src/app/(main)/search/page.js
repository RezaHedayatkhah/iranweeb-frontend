"use client"
import Filter from "@/app/(main)/[contentType]/_components/Filter";
import {Suspense} from "react";
import SearchPosts from "@/app/(main)/search/_components/SearchPosts";

export default function page() {


    return (

        <div className="grid grid-cols-1 gap-y-6 p-3 md:grid-cols-4 md:gap-x-5 lg:grid-cols-6 md:w-11/12 lg:w-10/12 xl:w-3/4 m-auto">
            {/* Filter Section */}
            <div className="md:col-span-1">
                <Suspense>
                    <Filter/>
                </Suspense>
            </div>

            <div
                className="md:col-span-3 lg:col-span-5 rounded-2xl bg-gray-800 py-3 px-3 md:px-5 h-fit">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    <Suspense>
                        <SearchPosts/>
                    </Suspense>
                </div>

            </div>

        </div>
    )
}