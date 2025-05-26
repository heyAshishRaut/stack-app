import { Link, useNavigate } from "react-router-dom";
import star from "./assets/star.svg";
import { useEffect } from "react";
import { useSharedData } from "./Pages/Layout";

// comment

function Navbar() {
    const navigate = useNavigate();
    // @ts-ignore
    const { fullname, username } = useSharedData();

    const firstname = fullname.split(" ")[0];
    const lastname = fullname.split(" ")[1];
    const lastnameChar = lastname ? lastname[0] : ''; 

    function backToLogin() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found");
            navigate("/login");
            return;
        }
    }, []);

    return (
        <div className="h-[100%] w-[100%] flex flex-col">
            {/* Logo */}
            <div className="h-[100px] w-[100%] pt-[30px] pl-[40px] mb-[40px]">
                <div className="absolute font-cabinet text-4xl z-10 text-white">Stack</div>
                <div>
                    <img src={star} alt="" className="h-[70px] relative left-[67px] top-[-5px]" />
                </div>
            </div>

            {/* Components */}
            <div className="flex flex-col gap-y-[10px] text-white w-[100%] h-[100%] px-[30px]">

                <Link to="/">
                    <div className="py-[10px] bg-blue-300/10 px-[20px] rounded-[7px] flex gap-x-[20px] items-center text-sm hover:bg-blue-400/20">
                        <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" /></svg>
                        <div>Dashboard</div>
                    </div>
                </Link>

                <Link to="/youtube">
                    <div className="py-[10px] bg-blue-300/10 px-[20px] rounded-[7px] flex gap-x-[20px] items-center text-sm hover:bg-blue-400/20">
                        <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>
                        <div>YouTube</div>
                    </div>
                </Link>

                <Link to="/social">
                    <div className="py-[10px] bg-blue-300/10 px-[20px] rounded-[7px] flex gap-x-[20px] items-center text-sm hover:bg-blue-400/20">
                        <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg>
                        <div>Social</div>
                    </div>
                </Link>

                <Link to="/songs">
                    <div className="py-[10px] bg-blue-300/10 px-[20px] rounded-[7px] flex gap-x-[20px] items-center text-sm hover:bg-blue-400/20">
                        <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" /></svg>
                        <div>Music</div>
                    </div>
                </Link>

                <Link to="/tags">
                    <div className="py-[10px] bg-blue-300/10 px-[20px] rounded-[7px] flex gap-x-[20px] items-center text-sm hover:bg-blue-400/20">
                        <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5L0 80C0 53.5 21.5 32 48 32l149.5 0c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>
                        <div>Tags</div>
                    </div>
                </Link>
            </div>

            <div>
                <div className="flex flex-col gap-y-[20px] text-white px-[30px] mb-[20px]">
                    <div className="w-[100%] h-[70px] flex items-center gap-x-[20px]">
                        <div className="w-[3%] h-[60px] bg-white"></div>

                        <div className="w-[97%] h-[100%] flex flex-col justify-center items-start">
                            <div className="font-cabinet text-2xl overflow-hidden">{firstname} {lastnameChar}.</div>
                            <div className="font-cabinet text-md">{username}</div>
                        </div>
                    </div>

                    <div className="flex gap-x-[10px]">
                        <Link to="/settings">
                            <div className="flex-1 py-[8px] bg-blue-300/10 hover:bg-blue-400/20 border-[2px] border-blue-400/20 px-[20px] rounded-[7px] flex gap-x-[20px] items-center text-sm">
                                <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>
                                <div>Settings</div>
                            </div>
                        </Link>

                        <button onClick={backToLogin} className="py-[8px] bg-red-500/30 hover:bg-red-600/30 border-[2px] border-red-500/20 rounded-[7px] flex items-center justify-center px-[20px] text-sm">
                            <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#f96c6c" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;