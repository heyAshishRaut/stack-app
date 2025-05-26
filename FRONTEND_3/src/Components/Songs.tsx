import { useState } from "react";
import { useSharedData } from "../Pages/Layout";
import { AnimatePresence, motion } from "framer-motion";
import SpotifyEmbed from "../Pages/SpotifyEmbed";

const BASE_URL = "https://stack-app-e0fe.onrender.com";

function Songs() {
    // @ts-ignore
    const { data, loading } = useSharedData();

    const [eachLink, setEachLink] = useState(false);

    // each link detail
    const [etitle, setetitle] = useState("");
    const [elink, setelink] = useState("");
    const [edesc, setedesc] = useState("");
    const [etags, setetags] = useState<any[]>([]);
    const [esource, setesource] = useState("");
    const [etime, setetime] = useState("");

    async function removecard(title: string, link: string) {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/v1/deletelink`, {
                method: "DELETE",
                // @ts-ignore
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({
                    title: title,
                    link: link
                })
            });
            console.log(link);

            if (response.status === 200) {
                console.log("Deleted successfully");
                window.location.reload();
            }
            if (response.status === 404) {
                console.log("Link not found");
            }
        }
        catch (e) {
            console.log("Something unexpected happen!");
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col px-[30px] pb-[100px] relative overflow-hidden">

            <AnimatePresence>
                {eachLink && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center w-[100%] h-[100%] backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div className="bg-black/70 w-[70%] h-[100%] flex"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >

                            <form className="overflow-y-scroll font-poppins flex flex-col py-[50px] w-[100%] text-white" onSubmit={(e) => { e.preventDefault(); setEachLink(false); }}>

                                <div className="px-[70px]">

                                    <div className="pb-[30px]">
                                        {
                                            (esource === "spotify" || esource === "applemusic") ? (<svg className="h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" /></svg>) :
                                                (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" /></svg>)
                                        }
                                    </div>
                                    <div className="text-3xl font-cabinet mb-[30px]">{etitle}</div>
                                    <div className="font-cabinet text-gray-300 text-sm mb-[20px]">{etime}</div>
                                    <div className="flex gap-x-[15px]">
                                        {
                                            etags?.map((tag: any) => (
                                                <div className="text-[13px] px-[25px] py-[7px] rounded-[25px]" style={{ backgroundColor: `${tag.color}99` }}>{tag.tagname}</div>
                                            ))
                                        }
                                    </div>
                                    <div className="text-xl font-cabinet text-gray-300 mt-[30px]">{edesc}</div>
                                    <div className="w-[100%] flex items-center justify-between gap-x-[25px] mt-[30px]">
                                        <button onClick={() => setEachLink(false)} className="py-[10px] w-[130px] text-blue-900 rounded-[7px] bg-white flex justify-center items-center gap-x-[15px]">Back</button>

                                        <div className="flex items-center gap-x-[40px]">
                                            <button onClick={() => { removecard(etitle, elink) }}><svg className="h-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#db0a2a" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button>
                                            <a target="_blank" className="w-[130px] py-[10px] text-center bg-blue-900 text-white rounded-[7px]" href={elink}>Open</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-[70px] my-[50px]">
                                    <div className="font-cabinet text-3xl">Preview</div>
                                    <div className="flex justify-center mt-[50px]">
                                        { esource === "spotify" ? (
                                            < SpotifyEmbed embedUrl={elink} />
                                        ) : <div className="mt-[50px]">No preview available</div> }
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-[50px] mb-[50px] h-[70px] flex gap-x-[30px] items-center">
                <div className="bg-white w-[7px] h-[100%]"></div>
                <div className="text-white font-cabinet text-5xl tracking-wide">Music</div>
            </div>

            <div className="flex gap-x-[22px] gap-y-[22px] mb-[100px] w-[100%] flex-wrap">

                {data && data.message && data.message.length > 0 ?
                    (data.message.map((item: any) => {
                        if (item.source !== "spotify" && item.source !== "applemusic") return null;

                        const date = new Date(item.date);

                        const formattedDate = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        });
                        return (
                            <div key={item._id} className="h-[260px] w-[23%] bg-black/30 backdrop-blur-md rounded-[15px] py-[15px] px-[20px] flex flex-col justify-between">
                                <div className="flex flex-col ">
                                    <div className="max-h-[50px] font-cabinet text-white text-[17px] mb-[10px]">{item.title}</div>

                                    <div className="flex gap-x-[7px] items-center text-white mb-[10px] overflow-hidden">
                                        {
                                            item.tags.map((tag: any, index: number) => {

                                                return (
                                                    <div
                                                        key={tag._id || index}
                                                        style={{ backgroundColor: `${tag.color}80` }}
                                                        className={`px-[10px] h-[22px] text-[12px] flex items-center rounded-[25px] bg-opacity-70`}
                                                    >
                                                        {tag.tagname}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="text-[12px] text-gray-200 h-[50px] font-poppins overflow-hidden">
                                        {item.description}
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <div className="mb-[10px] text-gray-300 text-[12px]">{formattedDate}</div>
                                        <div className="w-[100%] flex">
                                            <div className="w-full flex items-center justify-between">
                                                <svg className="h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" /></svg>
                                                <div className="flex gap-x-[10px]">
                                                    <button onClick={() => {
                                                        setEachLink(true);
                                                        setetitle(item.title);
                                                        setelink(item.link);
                                                        setetags(item.tags);
                                                        setedesc(item.description);
                                                        setesource(item.source);
                                                        setetime(formattedDate);
                                                    }} 
                                                    className="py-[7px] px-[15px] bg-stone-300/40 text-white tracking-wider rounded-[7px] flex items-center justify-center text-[12px]">
                                                        Details
                                                    </button>
                                                    <a className="py-[7px] px-[15px] bg-stone-300/40 rounded-[7px] flex items-center justify-center" href={item.link} target="_blank">
                                                        <svg className="h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" /></svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })) : ""
                }
            </div>
        </div>
    );
}

export default Songs;