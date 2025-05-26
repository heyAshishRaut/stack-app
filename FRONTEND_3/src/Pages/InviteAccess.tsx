import { useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import star from "../assets/star.svg";
import bgimage from "../assets/bgimage.png";

const BASE_URL = "http://localhost:3000";

function InviteAccess() {
    const { token } = useParams();
    // @ts-ignore
    const [valid, setValid] = useState(null);

    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");

    const [links, setLinks] = useState(null);

    useEffect(() => {
        async function validateToken() {
            try {
                const res = await fetch(`${BASE_URL}/v1/validate-invite/${token}`);
                const data = await res.json();

                setValid(data.valid);

                if (data.valid) {
                    setUsername(data.username);
                }
            } catch (e) {
                console.error(e);
            }
        }

        validateToken();
    }, [token]);

    useEffect(() => {
        if (!username) return;

        async function Fullname() {
            try {
                const response = await fetch(`${BASE_URL}/v1/userdetailsinvite/${username}`);
                const res = await response.json();
                setFullname(res.message.fullname);
            } catch (e) {
                console.error(e);
            }
        }

        async function getAllLinks() {
            try {
                const response = await fetch(`${BASE_URL}/v1/linkdetailsinvite/${username}`);
                const res = await response.json();
                setLinks(res.message);
            } catch (e) {
                console.error(e);
            }
        }

        Fullname();
        getAllLinks();
    }, [username]);

    return (
        <div style={{ backgroundImage: `url(${bgimage})` }} className="min-h-[100vh] w-[100vw] flex flex-col bg-cover bg-center bg-no-repeat bg-fixed">

            {/* Logo and username */}
            <div className="z-50 h-[90px] w-[100%] pl-[40px] mb-[40px] fixed backdrop-blur-2xl flex items-center justify-center">
                <div className='h-[100%] flex w-[100%] justify-between items-center'>
                    <div className="absolute font-cabinet text-4xl z-10 text-white">Stack</div>
                    <div>
                        <img src={star} alt="" className="h-[70px] relative left-[67px] top-[8px]" />
                    </div>
                    <div className='flex flex-col items-start justify-center text-gray-300'>
                        <div className='font-poppins text-sm'>You're invited by</div>
                        <div className='pr-[50px] font-cabinet text-2xl text-white'>{fullname}</div>
                    </div>
                </div>
            </div>

            {/* Link snaps */}
            <div className='min-h-[98%] w-[100vw] mt-[80px] font-poppins flex justify-center pb-[100px]'>
                <div className="w-[80%] flex justify-center gap-x-[25px] gap-y-[25px] flex-wrap mt-[22px]">
       
                    {links ?
                        // @ts-ignore
                        (links.map((item: any) => {
                            const date = new Date(item.date);

                            const formattedDate = date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            });
                            return (
                                <div key={item._id} className="h-[270px] w-[22%] bg-stone-800/20 border-2 border-gray-300/20 backdrop-blur-md rounded-[25px] py-[15px] px-[20px] flex flex-col justify-between">
                                    <div className="flex flex-col ">
                                        <div className="h-[60px] font-cabinet text-white text-[18px]">{item.title}</div>

                                        <div className="text-[12px] text-gray-200 h-[50px] font-poppins overflow-hidden">
                                            {item.description}
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <div className="mb-[5px] text-gray-300 text-[12px]">{formattedDate}</div>
                                            <div className="w-[100%] flex">
                                                <div className="w-full flex items-center justify-between">
                                                    {
                                                        (item.source === "youtube") ? (<svg className="h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>) :
                                                            (item.source === "x") ? (<svg className="h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>) :
                                                                (item.source === "facebook") ? (<svg className="h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>) :
                                                                    (item.source === "instagram") ? (<svg className="h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>) :
                                                                        (item.source === "spotify" || item.source === "applemusic") ? (<svg className="h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" /></svg>) :
                                                                            (item.source === "linkedin") ? (<svg className="h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>) :
                                                                                (<svg className="h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" /></svg>)

                                                    }
                                                    <div className="flex gap-x-[10px]">
                                                        <a className="py-[12px] px-[12px] bg-stone-300/20 rounded-[50%] flex items-center justify-center" href={item.link} target="_blank">
                                                            <svg className="h-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" /></svg>
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

            {/* Created by */}
            <div className='w-[100%] flex flex-col items-center font-cabinet text-2xl pb-[150px] text-white'>
                <div>Created by Ashish Raut</div>
                <div className='flex gap-x-[25px] mt-[15px]'>
                    <a className='cursor-pointer' href="https://github.com/heyAshishRaut" target='_blank'><svg className='h-[33px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="#ffffff" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg></a>
                    <a className='cursor-pointer' href="https://www.linkedin.com/in/ashishraut0302" target='_blank'><svg className='h-[33px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg></a>
                    <a className='cursor-pointer' href="https://x.com/heyashishraut?t=8qFl-xXL7K8DpYfiXsFIGg&s=09" target='_blank'><svg className='h-[30px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg></a>
                </div>
            </div>
        </div>
    )
};

export default InviteAccess;