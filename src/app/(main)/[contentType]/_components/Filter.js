"use client";
import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Filter() {
    const [genres, setGenres] = useState([]);
    const router = useRouter(); // Use Next.js router for navigation
    const pathname = usePathname(); // Get the current path
    const searchParams = useSearchParams(); // Access search parameters

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                }
            });
            const data = await res.json();
            if (res.ok) {
                setGenres(data);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get selected genres and order from the form
        const formData = new FormData(event.target);
        const selectedGenres = formData.getAll('genres[]'); // Get all selected genres
        const orderBy = formData.get('sortBy'); // Get selected order_by value

        // Build query parameters
        const queryParams = new URLSearchParams(searchParams.toString()); // Start with existing params
        queryParams.delete('genres[]'); // Clear existing genre parameters before appending new ones

        if (selectedGenres.length > 0) {
            selectedGenres.forEach(genre => queryParams.append('genres[]', genre));
        }
        if (orderBy) {
            queryParams.set('sortBy', orderBy);
        }

        // Update the URL with the constructed query without a full page reload
        router.replace(`${pathname}?${queryParams.toString()}`);
    };

    return (
        <form
            className="w-full h-fit flex flex-col gap-5 bg-gray-800 rounded-xl p-5"
            id="filter"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-0.5">
                <span className="border-b-2 border-red-500 w-fit mb-3 text-lg">ژانرها</span>
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                        <div key={genre.id} className="flex">
                            <input
                                name="genres[]"
                                type="checkbox"
                                id={`choose-me-${genre.id}`}
                                className="peer hidden"
                                value={genre.name}
                                defaultChecked={searchParams.getAll('genres[]').includes(genre.name)} // Preserve checked state
                            />
                            <label
                                htmlFor={`choose-me-${genre.id}`}
                                className="select-none text-sm cursor-pointer rounded-full border-2 border-red-500 py-1 px-2 text-gray-300 hover:text-white hover:bg-red-500 transition-colors duration-200 ease-in-out peer-checked:bg-red-500 peer-checked:text-gray-900"
                            >
                                <span>{genre.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex">
                <div className="flex flex-col">
                    <label
                        htmlFor="sortBy"
                        className="text-white border-b-2 border-red-500 w-fit mb-3 text-lg"
                    >
                        ترتیب
                    </label>
                    <select
                        id="sortBy"
                        name="sortBy"
                        defaultValue={searchParams.get('sortBy') || 'date'} // Default to 'date' if no sort order specified
                        className="bg-gray-900 focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                    >
                        <option value="date">
                            جدیدترین ها
                        </option>
                        <option value="viewCount">بیشترین بازدیدها</option>
                        <option value="updated_at">بروز شده</option>
                        <option value="most_liked">محبوب ترین</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-fit text-white hover:bg-red-600 bg-red-500 rounded-2xl px-5 py-1"
            >
                فیلتر
            </button>
        </form>
    );
}
