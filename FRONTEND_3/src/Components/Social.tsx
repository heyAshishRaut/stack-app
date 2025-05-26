import { useState } from "react";
import { useSharedData } from "../Pages/Layout";
import { AnimatePresence, motion } from "framer-motion";
import TwitterEmbed from "../Pages/TwitterEmbed";
import InstagramEmbed from "../Pages/InstagramEmbed";
import FacebookEmbed from "../Pages/FacebookEmbed";
import LinkedInEmbed from "../Pages/LinkedInEmbed";

const BASE_URL = "http://localhost:3000";

function Social() {
    // @ts-ignore
    const { data, loading } = useSharedData();
    const [app, setApp] = useState("instagram");

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

    function convertXtoTwitterURL(url: string): string {
        if (url.includes("x.com")) {
            return url.replace("x.com", "twitter.com");
        }
        return url;
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
                                            (esource === "youtube") ? (<svg className="h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>) :
                                                (esource === "x") ? (<svg className="h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>) :
                                                    (esource === "facebook") ? (<svg className="h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>) :
                                                        (esource === "instagram") ? (<svg className="h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>) :
                                                            (esource === "spotify" || esource === "applemusic") ? (<svg className="h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" /></svg>) :
                                                                ""
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
                                        { esource === "x" ? (
                                            <TwitterEmbed tweetUrl={convertXtoTwitterURL(elink)} />
                                        ) : esource === "instagram" ? (
                                            <InstagramEmbed postUrl={elink} />
                                        ) : esource === "facebook" ? (
                                            < FacebookEmbed postUrl={elink} />
                                        ) :  esource === "linkedin" ? (
                                            < LinkedInEmbed postUrl={elink} />
                                        ) : "No preview available"}
                                    </div>
                                </div>

                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-[50px] mb-[50px] h-[70px] flex gap-x-[30px] items-center">
                <div className="bg-white w-[7px] h-[100%]"></div>
                <div className="text-white font-cabinet text-5xl tracking-wide">Social</div>
            </div>

            <div className="text-white font-poppins flex gap-x-[15px] items-center mb-[50px]">
                <button onClick={() => setApp("instagram")} className="py-[10px] px-[20px] text-sm text-center rounded-[7px] bg-blue-500/30 hover:bg-blue-500/40">
                    Instagram
                </button>

                <button onClick={() => setApp("linkedin")} className="cursor-pointer py-[10px] text-sm text-center px-[20px] rounded-[7px] bg-blue-500/30 hover:bg-blue-500/40">
                    LinkedIn
                </button>

                <button onClick={() => setApp("facebook")} className="cursor-pointer py-[10px] text-sm text-center px-[20px] rounded-[7px] bg-blue-500/30 hover:bg-blue-500/40">
                    Facebook
                </button>

                <button onClick={() => setApp("x")} className="cursor-pointer py-[10px] text-sm text-center px-[20px] rounded-[7px] bg-blue-500/30 hover:bg-blue-500/40">
                    Twitter
                </button>
            </div>

            <div>
                <div className="text-white font-cabinet text-4xl w-[100%] pb-[15px] mb-[30px] border-b-2 border-white">
                    {
                        (app === "facebook") ? <span>Facebook</span> : (app === "instagram") ? <span>Instagram</span> : (app === "linkedin") ? <span>LinkedIn</span> : (app === "x") ? <span>X (Twitter)</span> : ""
                    }
                </div>

                <div className="flex gap-x-[22px] gap-y-[22px] mb-[100px] w-[100%] flex-wrap">

                    {data && data.message && data.message.length > 0 ?
                        (data.message.map((item: any) => {
                            if (item.source !== app) return null;

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
                                                    {
                                                        (item.source === "youtube") ? (<svg className="h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>) :
                                                            (item.source === "x") ? (<svg className="h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>) :
                                                                (item.source === "facebook") ? (<svg className="h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>) :
                                                                    (item.source === "instagram") ? (<svg className="h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>) :
                                                                        (item.source === "spotify" || item.source === "applemusic") ? (<svg className="h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" /></svg>) :
                                                                            (item.source === "linkedin") ? (<svg className="h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>) :
                                                                                (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" /></svg>)
                                                    }
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
        </div>
    );
}

export default Social;