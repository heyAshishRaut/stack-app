import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useSharedData } from "./Layout";

import TwitterEmbed from "./TwitterEmbed";
import InstagramEmbed from "./InstagramEmbed";
import FacebookEmbed from "./FacebookEmbed";
import SpotifyEmbed from "./SpotifyEmbed";
import LinkedInEmbed from "./LinkedInEmbed";

const BASE_URL = "http://localhost:3000";

function Dashboard() {
    // @ts-ignore
    const { data, loading, fullname, username, refreshData } = useSharedData();

    const navigate = useNavigate();

    // error message (custom alert box)
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    // Modal (link, tags, detailsofeachlink)
    const [showModal, setShowModal] = useState(false);
    const [addTag, setAddTag] = useState(false);
    const [eachLink, setEachLink] = useState(false);

    // Tagname
    const [tagName, setTagName] = useState("");
    // Color for tag
    const [selectedColor, setSelectedColor] = useState("");
    const colors = ["#64748b", "#f43f5e", "#3b82f6", "#fcd34d", "#4ade80"];

    // All tags
    const [allTags, setAllTags] = useState<{ _id: string; tagname: string; color: string }[]>([]);

    async function createTagHanlder() {
        if (tagName.trim().toLowerCase().length > 15 || selectedColor === "") {
            setErr(true);
            setErrMsg("Invalid input");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/v1/addTag`, {
                method: "POST",
                // @ts-ignore
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({
                    tagname: tagName.trim().toLowerCase(),
                    color: selectedColor
                })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    setErr(true);
                    setErrMsg("Tag already exists");
                    setTimeout(() => {
                        setErr(false);
                        setErrMsg("");
                    }, 2000);
                    return;
                }

                if (response.status === 404) {
                    setErr(true);
                    setErrMsg("A user can add max. 4 tags");
                    setTimeout(() => {
                        setErr(false);
                        setErrMsg("");
                    }, 2000);
                    return;
                }
                throw new Error("Failed to add Tag");
            }

            if (response.ok) {
                if (response.status == 201) {
                    console.log("Tag added successfully");
                }
            }
        }
        catch (e) {
            console.log("Something unexpected happen!");
        }
    }

    // adding link with multiple tags
    const [tagforlink, setTagforlink] = useState<string[]>([]);
    // select - deselect
    function toggleTag(id: string) {
        setTagforlink(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return Array.from(newSet);
        });
    };

    // Snap title
    const [title, setTitle] = useState("");
    // Snap link 
    const [link, setLink] = useState("");
    //  Snap desc
    const [desc, setDesc] = useState("");
    // invite link
    // @ts-ignore
    const [inviteLink, setInviteLink] = useState("");

    // Snap tags (can be multiple or none) - link - 54

    //source name
    const sourceMap: { [key: string]: string } = {
        "youtube.com": "youtube",
        "youtu.be": "youtube",
        "instagram.com": "instagram",
        "twitter.com": "x",
        "x.com": "x",
        "facebook.com": "facebook",
        "linkedin.com": "linkedin",
        "spotify.com": "spotify",
        "open.spotify.com": "spotify",
        "apple.com": "applemusic"
    };

    function getSourceName(url: string): string {
        try {
            const hostname = new URL(url).hostname.replace("www.", "");
            return sourceMap[hostname] || "other";
        } catch {
            return "Invalid URL";
        }
    }

    function isValidURL(str: string): boolean {
        try {
            const url = new URL(str);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch (_) {
            return false;
          }
    }

    // create link
    async function createLinkSnap() {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        if (title.length > 40 || desc.length > 300) {
            setErr(true);
            setErrMsg("Invalid title or description");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }

        if (title === "" || link === "") {
            setTitle("");
            setLink("");
            setDesc("");

            setErr(true);
            setErrMsg("Title and link is required");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }

        if(isValidURL(link) == false){
            setTitle("");
            setLink("");
            setDesc("");

            setErr(true);
            setErrMsg("Invalid Link");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/v1/addlink`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({
                    title: title,
                    link: link,
                    desc: desc,
                    tags: tagforlink,
                    source: getSourceName(link)
                })
            });

            const data = await response.json();
            refreshData();

            if (response.status === 400) {
                setErr(true);
                setErrMsg("Link already exists");
                setTimeout(() => {
                    setErr(false);
                    setErrMsg("");
                }, 2000);
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch user details");
            }
            if (response.status == 201) {
                console.log("Link added successfully");
            }

        } catch (err: any) {
            console.log("Message - ", err);
        }
        finally {
            setTitle("");
            setLink("");
            setDesc("");
            setTagforlink([]);
        }
    }

    // call to get all tags
    async function getAllTags() {

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/v1/getalltags`, {
                method: "GET",
                // @ts-ignore
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            });
            const data = await response.json();

            setAllTags(data.message);

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch tags");
            }
        }
        catch (e) {
            console.log("Something unexpected happen!");
        }
    }

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

    // Handle invite
    const handleInvite = async () => {
        const un = username;
        const res = await fetch(`${BASE_URL}/v1/generate-invite?username=${un}`);

        const data = await res.json();
        const inviteLink = `${window.location.origin}/invite/${data.token}`;
        console.log(inviteLink);
        await navigator.clipboard.writeText(inviteLink);
    };

    // Each link detail
    const [etitle, setetitle] = useState("");
    const [elink, setelink] = useState("");
    const [edesc, setedesc] = useState("");
    const [etags, setetags] = useState<any[]>([]);
    const [esource, setesource] = useState("");
    const [etime, setetime] = useState("");

    function convertToYouTubeEmbed(url: string): string | null {
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;

            if (hostname.includes("youtube.com") && parsedUrl.pathname === "/watch") {
                const videoId = parsedUrl.searchParams.get("v");
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
            }

            if (hostname === "youtu.be") {
                const videoId = parsedUrl.pathname.substring(1); // remove leading slash
                return `https://www.youtube.com/embed/${videoId}`;
            }

            if (hostname.includes("youtube.com") && parsedUrl.pathname.startsWith("/live/")) {
                const videoId = parsedUrl.pathname.split("/live/")[1];
                return `https://www.youtube.com/embed/${videoId}`;
            }

            return null;
        } catch (e) {
            console.error("Invalid URL:", url);
            return null;
        }
    }

    function convertXtoTwitterURL(url: string): string {
        if (url.includes("x.com")) {
            return url.replace("x.com", "twitter.com");
        }
        return url;
    }
      
    const embedLink = esource === "youtube" ? convertToYouTubeEmbed(elink) : elink;

    // current time
    // @ts-ignore
    const [time, setTime] = useState(() => new Date().getHours());

    useEffect(() => {
        if (esource === "x") {
            const scriptId = "twitter-wjs";

            if (!document.getElementById(scriptId)) {
                const script = document.createElement("script");
                script.id = scriptId;
                script.src = "https://platform.twitter.com/widgets.js";
                script.async = true;
                document.body.appendChild(script);
            } else {
                // @ts-ignore
                if (window?.twttr?.widgets) {
                    // @ts-ignore
                    window.twttr.widgets.load();
                }
            }
        } else if (esource === "instagram" && (window as any)?.instgrm?.Embeds) {
            (window as any).instgrm.Embeds.process();
        } else if (esource === "facebook" && (window as any)?.FB?.XFBML) {
            (window as any).FB.XFBML.parse();
        }

        async function getAllTags() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${BASE_URL}/v1/getalltags`, {
                    method: "GET",
                    // @ts-ignore
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                });
                const data = await response.json();
                setAllTags(data.message);


                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch tags");
                }
            }
            catch (e) {
                console.log("Something unexpected happen!");
            }
        }

        getAllTags();
    }, [time, showModal, esource, embedLink]);

    const [check, setCheck] = useState(false);

    function funCheck(){
        setCheck(true);

        setTimeout(() => {
            setCheck(false);
        }, 2000);
        return;
    }
    
    return (
        <div className="w-full min-h-screen flex flex-col px-[30px] relative overflow-hidden">
            
            {/* Alert Box */}
            {err &&
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 5 }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    className='absolute z-[100] top-[30px] left-[35%] px-[40px] h-[45px] flex items-center text-sm text-white bg-blue-600/40  backdrop-blur-md rounded-[25px]'>
                    {errMsg}
                </motion.div>
            }

            {/* Greetings */}
            <div>
                <div className="text-white font-cabinet text-4xl my-[50px]">
                    {
                        (time >= 0 && time < 12) ?
                            (`Morning, ${fullname.split(" ")[0]}! Ready to win the day ?`) : (time >= 12 && time < 17) ?
                                (`Hope your day’s going well, ${fullname.split(" ")[0]}!`) : (time >= 17 && time <= 21) ?
                                    (`Good Evening, ${fullname.split(" ")[0]}! Time to relax or reflect?`) : (`Winding down ${fullname.split(" ")[0]} ? Hope your night is calm and cozy.`)
                    }
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-x-[15px]">
                <button onClick={() => { setShowModal(true) }} className="py-[10px] w-[130px] bg-blue-500/30 rounded-[7px] text-white flex justify-center items-center gap-x-[15px]">
                    <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                    <div>Create</div>
                </button>

                <button onClick={() => { handleInvite(); funCheck(); }} className="py-[10px] w-[130px] bg-gray-300 rounded-[7px] flex justify-center items-center gap-x-[15px]">
                    <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#1e40af" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304c0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
                    </svg>
                    <div className="text-blue-800">Invite</div>
                </button>
                <AnimatePresence>
                    {check && (
                        <motion.div
                            className="absolute font-cabinet text-white top-[110px] left-[260px] bg-blue-800/60 border-2 border-red-200/30 px-[20px] py-[6px] rounded-[25px]"
                            initial={{ opacity: 0, y: 0, scale: 1 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            Link Copied!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Create Link Snap Floating */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center w-[100%] h-[100%] backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div className="bg-emerald-500/30 rounded-[20px] w-[800px] h-[80%] flex justify-center backdrop-blur-xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >

                            <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); }} className="font-poppins flex flex-col gap-y-[12px] items-center justify-center text-sm">
                                <div className="text-white font-cabinet text-4xl text-center mb-[40px]">Create Link Snap</div>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="py-[10px] px-[20px] w-[500px] rounded-[7px] border-none outline-none" />
                                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" className="py-[10px] px-[20px] w-[500px] rounded-[7px] border-none outline-none" />
                                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="textarea py-[10px] px-[20px] w-[500px] rounded-[7px] border-none outline-none h-[120px]" placeholder="Description"></textarea>

                                {/* Create New Tag  */}
                                <button onClick={() => setAddTag(true)} className="self-start py-[10px] w-[150px] bg-blue-900 rounded-[7px] text-white flex justify-center items-center gap-x-[15px]">
                                    <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                    </svg>
                                    <div>New Tag</div>
                                </button>
                                <div className="self-start flex gap-x-[15px] mb-[20px]">
                                    <div className="self-start flex gap-x-[10px] mb-[20px]">
                                        {allTags.map(({ _id, tagname, color }) => (
                                            <button
                                                type="button"
                                                key={_id}
                                                onClick={() => toggleTag(_id)}
                                                className={`px-[20px] py-[7px] rounded-[25px] cursor-pointer flex items-center justify-center text-white text-sm font-medium
                                                    `}
                                                style={{
                                                    backgroundColor: `${color}90`,
                                                    border: tagforlink.includes(_id) ? `2px solid ${color}` : "2px solid #44403c99"
                                                }}>
                                                {tagname}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-[500px] flex justify-end gap-x-[12px]">
                                    <button onClick={
                                        () => {
                                            setShowModal(false);
                                            setTitle("");
                                            setLink("");
                                            setDesc("");
                                            setTagforlink([]);
                                        }}
                                        className="py-[10px] w-[130px] bg-white rounded-[7px] text-blue-900 flex justify-center items-center gap-x-[15px]">Clear</button>
                                    <button onClick={() => { createLinkSnap(); }} className="py-[10px] w-[130px] bg-blue-900 rounded-[7px] text-white flex justify-center items-center gap-x-[15px]">Create</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* New Tag Modal */}
            <AnimatePresence>
                {addTag && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center w-[100%] h-[100%] backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div className="bg-stone-700/60 rounded-[20px] w-[800px] h-[80%] flex justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >

                            <form className="font-poppins flex flex-col gap-y-[12px] items-center justify-center text-sm" onSubmit={(e) => { e.preventDefault(); setAddTag(false); }}>
                                <div className="text-white font-cabinet text-5xl text-center mb-[40px]">Create Tag</div>

                                <input
                                    type="text"
                                    placeholder="Tagname"
                                    value={tagName}
                                    onChange={(e) => setTagName(e.target.value)}
                                    className="py-[10px] mb-[30px] px-[20px] w-[300px] rounded-[7px] border-none outline-none"
                                />

                                <div className="w-[300px] flex mb-[30px] items-center justify-between">
                                    {colors.map((color) => (
                                        <div
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-[50px] h-[50px] rounded-[50%] cursor-pointer`}
                                            style={{
                                                backgroundColor: `${color}`,
                                            }}
                                        ></div>
                                    ))}
                                </div>

                                <div className="w-[300px] flex justify-center gap-x-[12px]">
                                    <button onClick={() => {

                                        setTagName("");
                                        setSelectedColor("");
                                        setAddTag(false);
                                        setShowModal(true);
                                    }} className="py-[10px] w-[130px] bg-white rounded-[7px] text-blue-900 flex justify-center items-center gap-x-[15px]">Clear</button>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (!tagName || !selectedColor) return;
                                            await createTagHanlder();
                                            await getAllTags();
                                            setAddTag(false);
                                            setShowModal(true);
                                            setTagName("");
                                            setSelectedColor("");
                                        }}
                                        className="py-[10px] w-[130px] bg-blue-900 rounded-[7px] text-white flex justify-center items-center gap-x-[15px]">Create</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Each Link Modal */}
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
                                                <div className="text-[13px] px-[25px] py-[7px] rounded-[25px]" style={{backgroundColor: `${tag.color}99`}}>{tag.tagname}</div>
                                            ))
                                        }
                                    </div>
                                    <div className="text-xl font-cabinet text-gray-300 mt-[30px]">{edesc}</div>
                                    <div className="w-[100%] flex items-center justify-between gap-x-[25px] mt-[30px]">
                                        <button onClick={() => setEachLink(false)} className="py-[10px] w-[130px] text-blue-900 rounded-[7px] bg-white flex justify-center items-center gap-x-[15px]">Back</button>

                                        <div className="flex items-center gap-x-[40px]">
                                            <button onClick={() => {removecard(etitle, elink)}}><svg className="h-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#db0a2a" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button>
                                            <a target="_blank" className="w-[130px] py-[10px] text-center bg-blue-900 text-white rounded-[7px]" href={elink}>Open</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-[70px] my-[50px]">
                                    <div className="font-cabinet text-3xl">Preview</div>
                                    <div className="flex justify-center mt-[50px]">
                                        {esource === "youtube" ? (
                                            <iframe
                                                width="560"
                                                height="315"
                                                // @ts-ignore 
                                                src={embedLink}
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        ) : esource === "x" ? (
                                                <TwitterEmbed tweetUrl={convertXtoTwitterURL(elink)} />
                                        ) : esource === "instagram" ? (
                                                <InstagramEmbed postUrl={elink} />
                                        ) : esource === "facebook" ? (
                                                < FacebookEmbed postUrl={elink} />
                                        ) : esource === "spotify" ? (
                                                < SpotifyEmbed embedUrl={elink} />
                                        ) : esource === "linkedin" ? (
                                                < LinkedInEmbed postUrl={elink} />
                                        ) : "No preview available"}
                                    </div>
                                </div>

                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* All */}
            <div className="my-[50px]">
                <div className="text-white font-cabinet text-4xl w-[100%] pb-[15px] mb-[30px] border-b-2 border-white">All</div>

                <div className="flex gap-x-[22px] gap-y-[22px] w-[100%] flex-wrap">

                    {data && data.message && data.message.length > 0 ?
                        (data.message.map((item: any) => {
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
                                                                                (<svg className="h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" /></svg>)

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
                                                        }} className="py-[7px] px-[15px] bg-stone-300/40 text-white tracking-wider rounded-[7px] flex items-center justify-center text-[12px]">
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

export default Dashboard;