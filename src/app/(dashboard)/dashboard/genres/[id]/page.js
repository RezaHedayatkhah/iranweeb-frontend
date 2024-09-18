"use client"
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

export default function page({params}) {
    const [genre, setGenre] = useState({id: null, name: ""});
    useEffect(() => {
        const getGenre = async () => {
            const res = await  fetch(process.env.NEXT_PUBLIC_API_URL + `/api/genres/${params.id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
            const data = await res.json();
            if (res.ok) {
                setGenre(data);
            }else {
                console.log(data)
            }
        }
        getGenre()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await  fetch(process.env.NEXT_PUBLIC_API_URL + `/api/genres/${params.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({name: genre.name}),
            credentials: 'include',
        })
        const data = await res.json();
        if (res.ok) {
            toast.success(data.message)
            setGenre(data.genre);
        }else {
            toast.error(data.message)
        }
    }
    return (
        <>
            <div className="flex w-full ">
                <div className="flex w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                    <h1 className="text-3xl">ادیت تگ</h1>
                </div>
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <label>نام تگ</label>
                <input type="text" name="name" value={genre.name} onChange={(e)=>setGenre({...genre, name: e.target.value})}
                       className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-lg px-2 py-1"/>
                <button type="submit" className="text-white bg-blue-600 rounded text-sm px-5 py-2.5">ثبت</button>
            </form>
        </>
    )
}


