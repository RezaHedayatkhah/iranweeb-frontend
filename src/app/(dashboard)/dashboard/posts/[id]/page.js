"use client"
import {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import {updatePost} from "@/app/(dashboard)/dashboard/posts/_lib/api";
import AddLink from "@/app/(dashboard)/dashboard/posts/_components/AddLink";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import revalidateTag from "@/app/(dashboard)/dashboard/posts/_lib/revalidate";

export default function Page({params}) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [oldImage, setOldImage] = useState('')


    useEffect(() => {
        async function getPost(){
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/posts/${params.id}/edit`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const data = await res.json();
            if(res.ok){
                setFormData(data);
                setOldImage(`${process.env.NEXT_PUBLIC_IMAGES_URL}/${data?.imageUrl}`)
                setIsLoading(false)
            }
        }

        async function getGenres() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                }
            })

            const data = await res.json();
            if (res.ok) {
                setGenres(data)
            }
        }

        getGenres()

        getPost()
    }, [])



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileType = e.target.name
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64Image = reader.result.split(",")[1];
                if (fileType === "image") {
                    setImagePreview(reader.result);
                    setFormData({...formData, image: base64Image});
                } else {
                    setFormData({...formData, backgroundImage: base64Image});
                }

            };
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrors([]);
        const res = await updatePost(formData)
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
            await revalidateTag("posts");
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
    if (isLoading) return (<div>Loading...</div>)

    return (
        <>
            <div className="flex w-full">
                <div
                    className="flex justify-between items-center w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl">پست جدید</h1>
                    </div>
                </div>
            </div>

            <div className="bg-[#151f30] p-5 rounded-2xl gap-5 w-full flex flex-col">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 w-full bg-[#131720] p-5 rounded-2xl">
                        <div className="xl:col-span-1 grid grid-cols-1 gap-5 auto-rows-min">
                            <div className="bg-[#151f30] rounded-2xl relative h-96 w-64 m-auto overflow-hidden">
                                <label
                                    htmlFor="image"
                                    className="flex justify-center items-center absolute top-0 bottom-0 right-0 left-0 cursor-pointer z-20"
                                >
                                    آپلود تصویر
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="absolute w-full h-96 z-10"
                                        />
                                    )
                                    :
                                    <img
                                        src={oldImage}
                                        alt="Preview"
                                        className="absolute w-full h-96 z-10"
                                    />

                                }
                            </div>
                            {errors?.filter((err) => err.path === 'image').map((e) => (
                                <div key={e.msg} className="text-red-500">{e.msg}</div>
                            ))}
                            <div>
                                <label className="flex flex-col gap-2">
                                    <span>ژانرها</span>
                                    <div className="flex flex-wrap gap-3">
                                        {genres.map((genre) => (
                                            <div key={genre.id} className="flex">
                                                <input
                                                    name="genres[]"
                                                    type="checkbox"
                                                    id={`choose-me-${genre.id}`}
                                                    className="peer hidden"
                                                    value={genre.id}
                                                    checked={formData.genres.some((g) => g.id === genre.id)} // Set checked dynamically
                                                    onChange={(e) => {
                                                        const { checked, value } = e.target;
                                                        setFormData({
                                                            ...formData,
                                                            genres: checked
                                                                ? [...formData.genres, { id: parseInt(value) }]
                                                                : formData.genres.filter((g) => g.id !== parseInt(value)), // Ensure to use parseInt
                                                        });
                                                    }}
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
                                </label>
                            </div>
                        </div>

                        <div className="xl:col-span-3 grid grid-cols-1 gap-5 auto-rows-min">
                            {/* Other form fields here */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="title">نام فارسی اثر</label>
                                <input
                                    className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                    id="title"
                                    type="text"
                                    name="title"
                                    defaultValue={formData.title}
                                    onChange={(e) =>
                                        setFormData({...formData, title: e.target.value})
                                    }
                                />
                                {errors?.filter((err) => err.path === 'title').map((e) => (
                                    <div key={e.msg} className="text-red-500">{e.msg}</div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="originalTitle">نام خارجی اثر</label>
                                <input
                                    className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                    id="originalTitle"
                                    type="text"
                                    dir={"ltr"}
                                    name="originalTitle"
                                    value={formData.originalTitle}
                                    onChange={(e) =>
                                        setFormData({...formData, originalTitle: e.target.value})
                                    }
                                />
                                {errors?.filter((err) => err.path === 'originalTitle').map((e) => (
                                    <div key={e.msg} className="text-red-500">{e.msg}</div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="description">توضیحات</label>
                                <textarea
                                    className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5"
                                    id="description" name="description"
                                    rows="5"
                                    defaultValue={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})
                                    }></textarea>

                                {errors?.filter((err) => err.path === 'description').map((e) => (
                                    <div key={e.msg} className="text-red-500">{e.msg}</div>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-4 gap-5">
                                <div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="contentType">نوع</label>
                                        <select name="contentType" id="contentType" onChange={(e) => setFormData({
                                            ...formData,
                                            contentType: e.target.value
                                        })}
                                                value={formData.contentType}
                                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11">
                                            <option value="MANGA">مانگا
                                            </option>
                                            <option value="MANHWA">مانهوا
                                            </option>
                                            <option value="MANHUA">مانها
                                            </option>
                                            <option value="MANHUA">مانها
                                            </option>
                                            <option value="ANIME">انیمه
                                            </option>
                                        </select>
                                    </div>
                                    {errors?.filter((err) => err.path === 'contentType').map((e) => (
                                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                                    ))}
                                </div>


                                <div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="status">وضعیت</label>
                                        <select name="status" id="status"
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    status: e.target.value
                                                })}
                                                value={formData.status}
                                                className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11">
                                            <option value="ONGOING">در حال انتشار
                                            </option>
                                            <option value="COMPLETED">پایان یافته
                                            </option>
                                            <option value="CANCELLED">لغو شده
                                            </option>
                                            <option value="UNKNOWN">نامشخص
                                            </option>
                                        </select>
                                    </div>
                                    {errors?.filter((err) => err.path === 'status').map((e) => (
                                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="countryOfOrigin">کشور</label>
                                    <input
                                        className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                        id="countryOfOrigin"
                                        type="text"
                                        name="countryOfOrigin"
                                        value={formData.countryOfOrigin}
                                        onChange={(e) =>
                                            setFormData({...formData, countryOfOrigin: e.target.value})
                                        }
                                    />
                                    {errors?.filter((err) => err.path === 'countryOfOrigin').map((e) => (
                                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                                    ))}
                                </div>

                                <div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="language">زبان</label>
                                        <input
                                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                            id="language" type="text" name="language" placeholder=""
                                            value={formData.language}
                                            onChange={(e) =>
                                                setFormData({...formData, language: e.target.value})
                                            }/>
                                    </div>
                                    {errors?.filter((err) => err.path === 'language').map((e) => (
                                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                                    ))}
                                </div>

                                <div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="chapterCount">تعداد چپترها</label>
                                        <input
                                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                            id="chapterCount" type="text" name="chapterCount" placeholder=""
                                            value={formData.chapterCount}
                                            onChange={(e) =>
                                                setFormData({...formData, chapterCount: e.target.value})
                                            }/>
                                    </div>
                                    {errors?.filter((err) => err.path === 'chapterCount').map((e) => (
                                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                                    ))}
                                </div>

                                <div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="releaseDate">تاریخ انتشار</label>
                                        <input
                                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                            type="number" id="releaseDate" name="releaseDate"
                                            value={formData.releaseDate}
                                            onChange={(e) =>
                                                setFormData({...formData, releaseDate: e.target.value})
                                            }
                                        />

                                    </div>
                                    {errors?.filter((err) => err.path === 'releaseDate').map((e) => (
                                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                                    ))}
                                </div>

                            </div>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="sourceName">منبع</label>
                                        <input
                                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                            id="sourceName" type="text" name="sourceName" placeholder=""
                                            value={formData.sourceName}
                                            onChange={(e) =>
                                                setFormData({...formData, sourceName: e.target.value})
                                            }/>
                                    </div>
                                    {errors?.filter((err) => err.path === 'sourceName').map((e) => (
                                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                                    ))}
                                </div>

                                <div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="sourceUrl">لینک منبع</label>
                                        <input
                                            className="text-white bg-[#151f30] focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                            id="sourceUrl" type="text" name="sourceUrl" placeholder=""
                                            value={formData.sourceUrl}
                                            onChange={(e) =>
                                                setFormData({...formData, sourceUrl: e.target.value})
                                            }/></div>

                                    {errors?.filter((err) => err.path === 'sourceUrl').map((e) => (
                                        <div key={e.msg} className="text-red-500">{e.msg}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="backgroundImage">تصویر زمینه</label>
                                <input
                                    type="file"
                                    name="backgroundImage"
                                    id="backgroundImage"
                                    onChange={handleFileChange}
                                    className="text-white bg-[#151f30] pt-2 focus:outline-none focus:border-2 focus:border-red-500 rounded-2xl px-5 h-11"
                                />
                                {errors?.filter((err) => err.path === 'backgroundImage').map((e) => (
                                    <div key={e.msg} className="text-red-500">{e.msg}</div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="bg-green-600 flex justify-center items-center rounded-2xl h-12 w-full md:w-36 hover:bg-white hover:text-black transition ease-in-out duration-300"
                            >
                                ثبت
                            </button>
                        </div>


                    </div>

                </form>
                <AddLink postId={formData.id} sendLinksToParent={(links)=>setFormData({...formData, downloadLinks: links})} />


            </div>
        </>
    );
}
