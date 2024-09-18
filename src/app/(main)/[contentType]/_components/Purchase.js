"use client"
import {toast} from "react-hot-toast";
import {useState} from "react";
import Modal from "@/app/_components/Modal";

export default function Purchase({linkId}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handlePurchase = async () => {
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
        }else {
            toast.error(data.message)
        }
    }

    return (
        <>
            <button className="w-fit text-white bg-red-500 hover:scale-110 rounded-2xl px-4 py-2"
                    onClick={openModal}>خرید
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p className="text-center">آیا از خرید خود مطمئن هستید؟</p>

                <div className="flex gap-3 w-full mt-4">
                    <button
                        className="w-full bg-red-500 text-white h-10 flex justify-center items-center rounded-2xl hover:bg-white hover:text-black transition duration-300"
                        onClick={closeModal}
                    >
                        لغو
                    </button>
                    <button
                        className="w-full bg-red-500 text-white h-10 flex justify-center items-center rounded-2xl hover:bg-white hover:text-black transition duration-300"
                        onClick={handlePurchase}
                    >
                        خرید
                    </button>
                </div>
            </Modal>
        </>


)
}