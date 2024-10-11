import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMailReply} from "@fortawesome/free-solid-svg-icons";

export default function page(){
    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between w-full p-5 border-b border-blue-500 border-opacity-10 mb-5">
                <div className="flex items-center gap-x-3">
                    <h1 className="text-3xl">تیکت ها</h1>
                </div>
            </div>
            <div className={"w-full h-full"}>
                <div className={"w-full flex justify-center gap-10"}>
                    <div className={"flex flex-col justify-center items-center gap-2"}>
                        <FontAwesomeIcon icon={faMailReply}/>
                        <span className={"text-sm"}>تیکت های باز</span>
                    </div>
                    <div className={"flex flex-col justify-center items-center gap-2"}>
                        <FontAwesomeIcon icon={faMailReply}/>
                        <span className={"text-sm"}>تیکت های باز</span>
                    </div>
                    <div className={"flex flex-col justify-center items-center gap-2"}>
                        <FontAwesomeIcon icon={faMailReply}/>
                        <span className={"text-sm"}>تیکت های باز</span>
                    </div>
                    <div className={"flex flex-col justify-center items-center gap-2"}>
                        <FontAwesomeIcon icon={faMailReply}/>
                        <span className={"text-sm"}>تیکت های باز</span>
                    </div>
                </div>
            </div>
        </div>
    )
}