'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
    const searchParams = useSearchParams();  // Hook to access the current query parameters
    const router = useRouter();  // Hook to handle navigation

    const params = new URLSearchParams(searchParams);  // Make a copy of current search params

    function handleSearch(term) {
        // Update or remove the search term in the query string
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = params.get('query');

        // Only push to search if query exists
        if (query) {
            router.push(`/search?${params.toString()}`);
        } else {
            // Optional: Navigate to homepage if query is empty
            router.push('/');
        }
    };

    return (
        <form className="w-full flex justify-between items-center bg-[#151f30] rounded-full text-gray-400" name="search"
              method="get" onSubmit={handleSubmit}>
            <label htmlFor="search-input" className="sr-only">جستجو</label> {/* Screen reader label */}
            <input
                type="text"
                id="search-input"
                className="w-full rounded-full focus:outline-none bg-[#151f30] h-7 px-3"
                name="query"
                placeholder="جستجو..."
                aria-label="جستجو"  // Accessible label in Persian
                onChange={(e) => handleSearch(e.target.value)}  // Update query as user types
                defaultValue={searchParams.get('query') || ''}  // Keep the query in the input
            />
            <button type="submit" aria-label="ارسال جستجو"> {/* Accessible name in Persian */}
                <FontAwesomeIcon icon={faSearch} className="hover:text-red-500 h-4 flex items-center"/>
            </button>
        </form>

    );
}
