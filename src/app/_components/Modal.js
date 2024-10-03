"use client";
import { useState, useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

export default function Modal({ isOpen, onClose, children }) {
    // State for fade-in/out animation
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true); // Begin fade-in
        } else {
            setTimeout(() => setShowModal(false), 300); // Wait for fade-out to finish
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center 
                    transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0"}`}
                     >
                    <div
                        className={`bg-[#151f30] rounded-2xl shadow-lg max-w-lg w-full px-5 pt-8 pb-5 transform transition-transform 
                        duration-300 ${showModal ? "translate-y-0" : "-translate-y-10"}`}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        {children}

                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={onClose}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
