import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

export default function SkeletonPostCard() {
    return (
        <div className="flex flex-col items-center w-full max-w-[160px] md:max-w-[200px] lg:max-w-[250px] h-full animate-pulse m-auto">
            <div className="relative w-full">
                <div className="w-full aspect-[2/3] bg-gray-700 rounded-2xl flex justify-center items-center">
                    <div className="w-fit h-fit z-50 flex items-center justify-center">
                        <FontAwesomeIcon icon={faBookOpenReader} className={"text-4xl text-gray-500"} />
                    </div>
                </div>
            </div>
            <h3 className="w-full text-sm font-medium mt-4 mb-1 text-center line-clamp-1 bg-gray-600 h-4 rounded-2xl"></h3>
            <h3 className="w-full text-xs text-gray-300 line-clamp-1 text-center bg-gray-600 h-4 rounded-2xl"></h3>
        </div>
    );
}
