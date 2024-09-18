"use client"
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import Link from "next/link";

export default function page(){
    const [genres, setGenres] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function getGenres () {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            })


            const data = await res.json();
            if (res.ok) {
                setGenres(data)
            }
        }
        getGenres()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        if (!res.ok) {
            setErrors(data.errors);
            if (data.message) {
                toast.error(data.message, {
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        } else {
            setGenres((prevGenres) => [...prevGenres, data.genre]);
            setFormData({
                name: '',
            })
            setErrors([])
            if (data.message) {
                toast.success(data.message, {
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        }
    }

    return (
        <>
            <div className="flex w-full ">
                <div className="flex w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                    <h1 className="text-3xl">ژانر جدید</h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-center gap-5">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:w-1/2">
                    <label>نام ژانر جدید</label>
                    <input type="text" name="name"
                           className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"
                        value={formData.name}
                           onChange={(e) =>setFormData({name: e.target.value})}
                    />
                    {errors?.filter((err) => err.path === 'name').map((e) => (
                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                    ))}
                    <button type="submit" className="text-white bg-blue-600  rounded text-sm px-5 py-2.5">ثبت</button>
                </form>
                <div className="flex flex-wrap gap-3 md:w-1/2">
                    {genres?.map((genre) => (
                        <div key={genre.id} className="flex">
                            <Link href={`/dashboard/genres/${genre.id}`}
                               className="w-full h-fit border-red-500 border-2 rounded-full text-gray-300 px-2.5 py-1 text-sm text-center hover:text-white hover:bg-red-500">
                                <span>{genre.name}</span>

                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}