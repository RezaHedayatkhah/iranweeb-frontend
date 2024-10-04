import Image from "next/image";
import Comment from "@/app/(main)/[contentType]/_components/Comment";
import Like from "@/app/_components/Like";
import Bookmark from "@/app/(main)/[contentType]/_components/Bookmark";
import { notFound } from 'next/navigation'
import DownloadLink from "@/app/(main)/[contentType]/_components/DownloadLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAt,
    faBook,
    faCalendarDays,
    faCircleExclamation,
    faEarthAmericas, faEye,
    faLanguage, faNoteSticky
} from "@fortawesome/free-solid-svg-icons";
import NotFound from "next/dist/client/components/not-found-error";
import Link from "next/link";
import { headers } from "next/headers";

const getPost = async (contentType, slug) => {
    const headersList = headers(); // Get the headers
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "121.0.0.1"; // Fallback IP

    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/single/${contentType.toUpperCase()}/${slug}`;
        const res = await fetch(url, {
            next: { tags: ['posts'], revalidate: 3 },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Client-IP": ip, // Send the IP address in a custom header
            },
        });

        // Handle non-200 responses
        if (!res.ok) {
            return notFound();
        }

        const data = await res.json();

        // Check if the data contains a valid post
        if (!data?.post) {
            return notFound();
        }

        return data.post;

    } catch (error) {
        return notFound(); // Handle fetch errors (network or others)
    }
};


export async function generateMetadata({params}) {
    let post = await getPost(params.contentType, params.slug)
    let title = ''
    if (post.contentType === "MANGA"){
         title = `دانلود مانگای ${post.title + ' ' + post.originalTitle} با ترجمه فارسی`
    }else if(post.contentType === "MANHUA"){
         title = `دانلود مانهای ${post.title + ' ' + post.originalTitle} با ترجمه فارسی`
    }else if(post.contentType === "MANHWA"){
         title = `دانلود مانهوای ${post.title + ' ' + post.originalTitle} با ترجمه فارسی`
    }

    return {
        title: title,
        description: post.description,
        openGraph: {
            type: 'article',
            title: title,
            description: post.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.contentType}/${params.slug}`,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_IMAGES_URL}/${post?.imageUrl}`,
                    width: 250,
                    height: 384,
                    alt: `${post.title} بنر `,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: post.description,
            images: [`${process.env.NEXT_PUBLIC_IMAGES_URL}/${post?.imageUrl}`],
        },
    }
}

export default async function page({params}) {
    const routes = ["manga", "manhua", "manhwa"]
    if (!routes.includes(params.contentType)) {
        return (
            <>
                {NotFound()}
            </>
        )
    }
    let post = await getPost(params.contentType, params.slug)

    return (

        <div>
            <div className="">
                <div className="flex flex-col gap-5 mt-10 md:mt-16 w-11/12 md:w-4/5 m-auto">
                    <div className="flex flex-wrap gap-3">
                        {post.genres.map((genre) => (
                            <Link key={genre.id} href={`/search?genres%5B%5D=${encodeURIComponent(genre.name)}`}
                               className="w-fit border-red-500 border-2 rounded-full text-gray-300 px-2.5 py-0.5 text-sm hover:text-white hover:bg-red-500">{genre.name}</Link>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 md:gap-0 text-white">
                        <div className="m-auto md:w-1/5 w-10/12">
                            <Image className="rounded-lg w-full md:w-4/5 h-96" src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${post?.imageUrl}`} priority={true}
                                   alt={post.originalTitle} width="0" height="0" sizes="100vw"/>
                        </div>
                        <div className="flex flex-col gap-5 md:w-4/5 w-full">
                            <div className="flex gap-5 justify-between">
                                <div className="flex flex-col gap-1">
                                    <h1>{post.originalTitle}</h1>
                                    <h1 className="text-gray-400">{post.title}</h1>
                                </div>
                                <div className="flex items-center gap-3">
                                    {post.id &&
                                        <>
                                            <Bookmark postId={post.id} />
                                            <Like likeType={"post"} id={post.id} />
                                        </>
                                    }

                                </div>
                            </div>
                            <article className="py-5">
                                <p>{post.description}</p>

                            </article>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                <li className="grid grid-cols-1 gap-y-2 rounded-xl bg-gray-300 bg-opacity-25 p-2">
                                    <div className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faBook} className={"text-yellow-500 text-base h-4"} />
                                        <span>نوع:</span>
                                    </div>
                                    <span>{post.contentType}</span>
                                </li>
                                <li className="grid grid-cols-1 gap-y-2 rounded-xl bg-gray-300 bg-opacity-25 p-2">
                                    <div className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faCalendarDays} className={"text-yellow-500 text-base h-4"} />
                                        <span>تاریخ انتشار:</span>
                                    </div>
                                    <span>{post.releaseDate}</span>
                                </li>
                                <li className="grid grid-cols-1 gap-y-2 rounded-xl bg-gray-300 bg-opacity-25 p-2">
                                    <div className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faCircleExclamation} className={"text-yellow-500 text-base h-4"} />
                                        <span>وضعیت:</span>
                                    </div>
                                    <span>{post.status}</span>
                                </li>
                                <li className="grid grid-cols-1 gap-y-2 rounded-xl bg-gray-300 bg-opacity-25 p-2">
                                    <div className="flex items-center gap-x-1 ">
                                        <FontAwesomeIcon icon={faEarthAmericas} className={"text-yellow-500 text-base h-4"} />
                                        <span>محصول:</span>
                                    </div>
                                    <span>{post.countryOfOrigin}</span>
                                </li>

                                <li className="grid grid-cols-1 gap-y-2 rounded-xl bg-gray-300 bg-opacity-25 p-2">
                                    <div className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faLanguage} className={"text-yellow-500 text-base h-4"} />
                                        <span>زبان:</span>
                                    </div>
                                    <span>{post.language}</span>
                                </li>
                                <li className="grid grid-cols-1 gap-y-2 rounded-xl bg-gray-300 bg-opacity-25 p-2">
                                    <div className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faNoteSticky} className={"text-yellow-500 text-base h-4"} />
                                        <span>چپترها:</span>
                                    </div>
                                    <span>{post.chapterCount}</span>
                                </li>
                                <li className="grid grid-cols-1 gap-y-2 rounded-xl bg-gray-300 bg-opacity-25 p-2">
                                    <div className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faEye} className={"text-yellow-500 text-base h-4"} />
                                        <span>بازدیدها:</span>
                                    </div>
                                    <span>{post.viewCount}</span>
                                </li>
                                <li className="grid grid-cols-1 gap-y-2 rounded-xl bg-gray-300 bg-opacity-25 p-2">
                                    <div className="flex items-center gap-x-1">
                                        <FontAwesomeIcon icon={faAt} className={"text-yellow-500 text-base h-4"} />
                                        <span>منبع:</span>
                                    </div>
                                    <span>
                                    <a className="text-blue-400 underline"
                                       href={post.sourceUrl}>{post.sourceName}</a>
                                </span>
                                </li>
                            </div>

                        </div>
                    </div>

                    <div
                        className="flex flex-col gap-5 bg-gray-900 rounded-lg p-5 mt-20 mb-20 md:mt-52 md:mb-32">
                        <div className="border-b-2 border-red-500 w-fit">
                            <span className="text-lg text-white">همه چپترها</span>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <DownloadLink downloadLinks={post.downloadLinks} postId={post.id} />
                        </div>
                    </div>
                    {post.id && <Comment postId={post.id}/>}
                </div>


            </div>
        </div>

    )
}