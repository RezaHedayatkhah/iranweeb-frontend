"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Link from "next/link";
import Modal from "@/app/_components/Modal";
import {toast} from "react-hot-toast";
import {useUser} from "@/context/UserContext";

export default function DownloadLink({downloadLinks, postId}){
    const [purchasedLinks, setPurchasedLinks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {user} = useUser()
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handlePurchase = async (linkId) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/purchase', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({linkId: linkId}),
        })
        const data = await res.json()
        if (res.ok) {
            toast.success(data.message)
            closeModal()
            fetchLinks()
        }else {
            toast.error(data.message)
        }
    }

    async function fetchLinks (){
        if (user){
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/transactions/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include",
            })

            const data = await res.json();
            if (res.ok) {
                setPurchasedLinks(data)
            }
        }
    }

    useEffect(() => {
        fetchLinks()
    }, []);
    return (
        <>
            {downloadLinks?.map((link) => (
                <div key={link.id}
                     className="flex justify-between items-center bg-gray-700 rounded-lg p-3">
                    <div className="flex gap-1 justify-center items-center">
                        <span className="text-white">{link.label}</span>
                        {link.price && (<span className="text-green-500 text-sm ">{link.price} تومان</span>)}
                    </div>

                    {purchasedLinks.some((purchasedLink) => purchasedLink.id === link.id) ? (
                        <Link
                            className="w-fit text-white bg-red-500 hover:scale-110 rounded-2xl px-4 py-2"
                            href={link.url}
                        >
                            دانلود <FontAwesomeIcon icon={faDownload} />
                        </Link>
                    ) : link.price > 0 ? (
                        <>
                            <button className="w-fit text-white bg-red-500 hover:scale-110 rounded-2xl px-4 py-2"
                                    onClick={openModal}>خرید
                            </button>
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <p className="text-center">آیا از خرید خود مطمئن هستید؟</p>

                                <div className="flex gap-3 w-full mt-4">
                                    <button
                                        className="w-full bg-white text-black h-10 flex justify-center items-center rounded-2xl hover:bg-red-500 hover:text-black transition duration-300"
                                        onClick={closeModal}
                                    >
                                        لغو
                                    </button>
                                    <button
                                        className="w-full bg-red-500 text-white h-10 flex justify-center items-center rounded-2xl hover:bg-white hover:text-black transition duration-300"
                                        onClick={()=> handlePurchase(link.id)}
                                    >
                                        خرید
                                    </button>
                                </div>
                            </Modal>
                        </>
                    ) : (
                        <Link
                            className="w-fit text-white bg-red-500 hover:scale-110 rounded-2xl px-4 py-2"
                            href={link.url}
                        >
                            دانلود <FontAwesomeIcon icon={faDownload} />
                        </Link>
                    )}

                </div>
            ))}
        </>
    )
}