'use client'

import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function Search() {
    const searchParams = useSearchParams()
    const router = useRouter();
    const pathname = usePathname();
    const {replace} = useRouter();
    const params = new URLSearchParams(searchParams);


    function handleSearch(term) {
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`search/${pathname}?${params.toString()}`)
    }

    return (
        <div
            className={`items-center justify-between bg-[#151f30] rounded-full text-gray-400 px-3 w-full md:flex hidden`}>
            <form className="w-full flex justify-center items-center" name="search" method="get"
                  onSubmit={handleSubmit}>
                <input type="text"
                       className="w-full rounded-full focus:outline-none bg-[#151f30] h-7 px-3"
                       name="query"
                       onChange={(e) => {
                           handleSearch(e.target.value);
                       }}
                       defaultValue={searchParams.get('query')?.toString()}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faSearch} className={"hover:text-red-500"}/>
                </button>
            </form>
        </div>

    )
}

