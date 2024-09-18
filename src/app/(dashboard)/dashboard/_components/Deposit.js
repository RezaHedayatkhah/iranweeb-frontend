"use client"
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Modal";
import { useState } from "react";

export default function Deposit() {
    const router = useRouter();
    const [amount, setAmount] = useState(10000);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleClick = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/deposit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        if (res.ok) {
            await router.push(data);
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div>
            <button onClick={openModal} className="rounded-2xl bg-red-500 py-2 px-3 text-sm hover:bg-red-700 transition duration-300">
                افزایش موجودی
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold mb-4 text-center">شارژ حساب</h2>
                    <p className="text-center text-gray-300">مقدار شارژ را انتخاب کنید.</p>

                    <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                    <button onClick={() => setAmount(10000)}
                            className={`rounded-2xl h-10 flex justify-center items-center text-black text-sm ${amount === 10000 ? "bg-red-500 text-white" : "bg-white text-black"}`}>10,000
                        تومان
                    </button>
                    <button onClick={() => setAmount(20000)}
                            className={`rounded-2xl h-10 flex justify-center items-center text-black text-sm ${amount === 20000 ? "bg-red-500 text-white" : "bg-white text-black"}`}>20,000
                        تومان
                    </button>
                    <button onClick={() => setAmount(50000)}
                            className={`rounded-2xl h-10 flex justify-center items-center text-black text-sm ${amount === 50000 ? "bg-red-500 text-white" : "bg-white text-black"}`}>50,000
                        تومان
                    </button>
                    <button onClick={() => setAmount(100000)}
                            className={`rounded-2xl h-10 flex justify-center items-center text-black text-sm ${amount === 100000 ? "bg-red-500 text-white" : "bg-white text-black"}`}>100,000
                        تومان
                    </button>
                </div>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full text-white bg-[#151f30] focus:outline-none border-2 border-red-500 rounded-2xl px-5 h-11 mt-4"
                />

                <p className="text-center">مبلغ پرداخت:</p>
                <p className="text-center text-lg">{amount.toLocaleString()} تومان</p>

                <div className="flex gap-3 w-full mt-4">
                    <button
                        className="w-full bg-white text-black h-10 flex justify-center items-center rounded-2xl hover:bg-red-500 hover:text-white transition duration-300"
                        onClick={closeModal}
                    >
                        لغو
                    </button>
                    <button
                        className="w-full bg-red-500 text-white h-10 flex justify-center items-center rounded-2xl hover:bg-white hover:text-black transition duration-300"
                        onClick={handleClick}
                    >
                        پرداخت
                    </button>
                </div>
            </div>
        </Modal>
        </div>
    );
}
