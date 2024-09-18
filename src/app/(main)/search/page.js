"use client"
import Filter from "@/app/(main)/[contentType]/_components/Filter";
import {Suspense} from "react";
import SearchPosts from "@/app/(main)/search/_components/SearchPosts";

export default function page() {


    return (
        <div
            className="flex md:flex-row flex-col justify-between w-11/12 md:w-4/5 m-auto pt-40 gap-5 md:gap-20 text-white">
            <Suspense>
                <Filter/>
            </Suspense>

            <div
                className="flex flex-col justify-between rounded-xl bg-gray-800  w-full md:w-3/4 py-3 px-3 md:px-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    <Suspense>
                        <SearchPosts />
                    </Suspense>
                </div>

            </div>

        </div>
    )
}