import Select from "react-select";
import { useEffect, useState } from "react";

export default function AddLink({ postId, sendLinksToParent }) {
    const [links, setLinks] = useState([]);
    const [translators, setTranslators] = useState([]);
    const [typists, setTypists] = useState([]);
    const [cleaners, setCleaners] = useState([]);

    useEffect(() => {
        async function getLinks() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/${postId}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();
            if (res.ok) {
                setLinks(data);
                sendLinksToParent(data); // Call after state update
            }else {
                console.log(data)
            }
        }

        async function getOptions(endpoint, setFunction) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            });

            const data = await res.json();
            if (res.ok) {
                const formattedOptions = data.map((option) => ({
                    value: option.id,
                    label: option.userName,
                }));
                setFunction(formattedOptions);
            }
        }

        if (postId){
            getLinks();
        }
        getOptions("translators", setTranslators);
        getOptions("typists", setTypists);
        getOptions("cleaners", setCleaners);
    }, [postId]);

    const handleAddLink = () => {
        const newLink = {
            label: "",
            url: "",
            quality: "",
            language: "",
            translatorId: null,
            typistId: null,
            cleanerId: null,
            price: null,
        };
        setLinks([...links, newLink]);
    };

    const handleLinkChange = (index, field, value) => {
        const updatedLinks = links.map((link, i) => (i === index ? { ...link, [field]: value } : link));
        setLinks(updatedLinks);
        sendLinksToParent(updatedLinks); // Call after state update
    };

    return (
        <>
            <div className="xl:col-span-4 mt-5 rounded-2xl flex flex-col p-5 gap-5">
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleAddLink}
                        className="bg-red-500 flex justify-center items-center rounded-2xl h-12 w-full md:w-36 hover:bg-white hover:text-black transition ease-in-out duration-300 cursor-pointer"
                    >
                        لینک جدید
                    </button>
                </div>

                {links.map((link, index) => (
                    <div key={index} className="grid md:grid-cols-2 gap-5 p-5 bg-[#131720] rounded-2xl">
                        <div className="md:col-span-2">Link {index + 1}</div>

                        {/* Label */}
                        <input
                            type="text"
                            value={link.label}
                            onChange={(e) => handleLinkChange(index, "label", e.target.value)}
                            placeholder="عنوان لینک"
                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                        />

                        {/* URL */}
                        <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                            placeholder="آدرس لینک"
                            required
                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                        />

                        {/* Language */}
                        <input
                            type="text"
                            value={link.language}
                            onChange={(e) => handleLinkChange(index, "language", e.target.value)}
                            placeholder="زبان"
                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                        />

                        {/* Price */}
                        <input
                            type="number"
                            value={link.price / 10} // Display the price in tomans
                            onChange={(e) => {
                                const tomanPrice = e.target.value;
                                const rialPrice = tomanPrice * 10; // Convert tomans to rials
                                handleLinkChange(index, "price", rialPrice); // Save the price in rials
                            }}
                            placeholder="قیمت به تومان"
                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                        />


                        {/* Quality */}
                        <select
                            value={link.quality}
                            onChange={(e) => handleLinkChange(index, "quality", e.target.value)}
                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                        >
                            <option value="">کیفیت</option>
                            <option value="480p">480p</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="4k">4k</option>
                        </select>

                        {/* React-Select for translator */}
                        <Select
                            options={translators}
                            onChange={(selectedOption) => handleLinkChange(index, "translatorId", selectedOption?.value || null)}
                            isClearable
                            placeholder="انتخاب مترجم..."
                            className="basic-single"
                            classNamePrefix="select"
                            styles={{
                                control: (base) => ({ ...base, backgroundColor: "#151f30", color: "#fff", borderRadius: "16px", height: "44px" }),
                                menu: (base) => ({ ...base, backgroundColor: "#151f30", color: "#fff" }),
                                singleValue: (base) => ({ ...base, color: "#fff" }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? "#333" : "#151f30",
                                }),
                            }}
                        />

                        {/* React-Select for typist */}
                        <Select
                            options={typists}
                            onChange={(selectedOption) => handleLinkChange(index, "typistId", selectedOption?.value || null)}
                            isClearable
                            placeholder="انتخاب تایپیست..."
                            className="basic-single"
                            classNamePrefix="select"
                            styles={{
                                control: (base) => ({ ...base, backgroundColor: "#151f30", color: "#fff", borderRadius: "16px", height: "44px" }),
                                menu: (base) => ({ ...base, backgroundColor: "#151f30", color: "#fff" }),
                                singleValue: (base) => ({ ...base, color: "#fff" }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? "#333" : "#151f30",
                                }),
                            }}
                        />

                        {/* React-Select for cleaner */}
                        <Select
                            options={cleaners}
                            onChange={(selectedOption) => handleLinkChange(index, "cleanerId", selectedOption?.value || null)}
                            isClearable
                            placeholder="انتخاب کلینر..."
                            className="basic-single"
                            classNamePrefix="select"
                            styles={{
                                control: (base) => ({ ...base, backgroundColor: "#151f30", color: "#fff", borderRadius: "16px", height: "44px" }),
                                menu: (base) => ({ ...base, backgroundColor: "#151f30", color: "#fff" }),
                                singleValue: (base) => ({ ...base, color: "#fff" }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? "#333" : "#151f30",
                                }),
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
