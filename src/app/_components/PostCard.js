import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookBookmark, faBookOpenReader, faEye} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({post}) {
    return (
        <div className="flex flex-col items-center w-full h-full">
            <Link href={`/${post.contentType.toLowerCase()}/${post.slug}`}
                  className="group peer block relative w-full">
                <div className="absolute flex justify-between items-center p-3 w-full z-50">
                    <div
                        className="bg-[#151f30] rounded-lg p-1 w-fit line-clamp-1 flex items-center gap-x-1 scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out">
                        <FontAwesomeIcon icon={faBookBookmark} className={"text-xs md:text-sm text-yellow-500"}/>
                        <span className="text-xs text-white">چپتر {post.chapterCount}</span>
                    </div>
                    <div
                        className="bg-[#151f30] rounded-lg p-1 text-red-500 text-xs w-fit scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out">
                        <span className="px-1">{post.viewCount || 0}</span>
                        <FontAwesomeIcon icon={faEye}/>
                    </div>
                </div>
                <div className="absolute w-full h-full z-50 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBookOpenReader}
                                     className={"scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out text-4xl"}/>
                </div>
                <Image src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${post?.imageUrl}`} alt={post.title}
                       width={250}
                       height={350}
                       // sizes={"100vw"}
                       className="w-full aspect-[2/3] rounded-2xl group-hover:blur-sm group-hover:brightness-50 transition duration-300 ease-in-out"/>
            </Link>
            <h3 className="peer-hover:text-blue-500 hover:text-blue-500 w-full text-sm font-medium mt-4 mb-1 text-center line-clamp-1"
                dir="ltr">
                <Link href={`/${post.contentType.toLowerCase()}/${post.slug}`}>{post.originalTitle}</Link>
            </h3>
            <h3 className="w-full text-xs text-gray-300 line-clamp-1 text-center"
                dir="rtl">
                <Link href={`/${post.contentType.toLowerCase()}/${post.slug}`}>{post.title}</Link>
            </h3>
        </div>

    )
}