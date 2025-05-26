import { Link } from 'react-router-dom';
import bgimage from "../assets/bgimage.png";
import sone from "../assets/sone.png"
import star from "../assets/star.svg";
import stari from "../assets/stari.png";
import s7 from "../assets/s7.png"

import {motion} from "framer-motion";

function Showcase() {
    return (
        <div style={{ backgroundImage: `url(${bgimage})` }} className="w-[100vw] min-h-screen bg-cover bg-center bg-no-repeat bg-fixed">
            {/* Logo */}
            <div className="h-[100px] w-[100%] pt-[30px] pl-[40px]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeIn" }}
                    className="absolute font-cabinet text-4xl z-10 text-white">Stack</motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeIn" }}
                >
                    <img src={star} alt="" className="h-[70px] relative left-[67px] top-[-5px]" />
                </motion.div>
            </div>

            {/* Slogan */}
            <div style={{ height: 'calc(100vh - 100px)' }} className="w-[100%] flex flex-col text-center justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeIn" }}
                    className="font-cabinet text-4xl leading-[50px] text-white">
                    <div>Everything You Discover Online, All in One Place <br />
                        Sorted, Tagged, and Always Within Reach.</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeIn" }}
                    className="w-[100%] mt-[30px]  font-cabinet">
                    <Link to="/signup">
                        <button className="text-white text-2xl border-b-2 border-black pb-[5px] hover:border-white">
                            Get Started
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Image */}
            <div className='py-[100px] px-[200px] bg-gray-800 flex flex-col' style={{ background: 'linear-gradient(to right, #fdeff9, #ec38bc, #7303c0, #03001e)',}}>
                <div className='font-cabinet text-4xl mb-[10px] text-white'>Your links, sorted beautifully.</div>
                <img src={sone} alt="" className='rounded-[20px]' />
                <div className='mt-[10px] font-cabinet text-4xl text-white self-end text-end'>No more messy bookmarks.<br />Organize your world with Stack — clean, simple, powerful.</div>
            </div>

            {/* Feature */}
            <div className="h-[600px] w-[100vw] flex justify-center items-center px-[150px]">
                <div className="w-[50%] h-[100%] flex flex-col justify-center ml-[50px]">
                    <div className="font-cabinet text-white text-5xl mb-[50px]">
                        <img src={stari} alt="" className="relative h-[100px] inline-block top-[-5px] left-[-50px]" />
                        <div className='z-10'>Features</div>
                    </div>
                    <div className="font-cabinet text-white flex flex-col gap-y-[10px]">
                        <div className="text-2xl">Save Any Link Instantly</div>
                        <div className="text-2xl">Organize with Tags</div>
                        <div className="text-2xl">Smart Dashboard</div>
                        <div className="text-2xl">Dedicated Sections</div>
                        <div className="text-2xl">Quick Search & Filter</div>
                        <div className='text-2xl'>Detailed View on Demand</div>
                        <div className='text-2xl'>Minimal, Customizable Interface</div>
                    </div>
                </div>
                <div className="w-[50%] h-[100%] flex items-center">
                    <img src={s7} alt="" className="w-[100%]"/>
                </div>
            </div>

            {/* Footer */}
            <div className="h-[400px] w-[100vw] backdrop-blur-xl bg-black/30 px-[150px] flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-x-[150px]">
                    <div>
                        <div className="absolute font-cabinet text-4xl z-10 text-white">Stack</div>
                        <img src={star} alt="" className="h-[70px] relative left-[67px] top-[-5px]" />
                    </div>

                    <div className="font-cabinet text-2xl text-white mb-[15px]">
                        More features rolling out soon. Stay tuned!
                    </div>
                </div>
                <div className="text-white text-xl font-cabinet mt-[50px] flex flex-col justify-center">
                    <div>Created by Ashish Raut</div>

                    <button onClick={() => window.location.href = 'mailto:theashish32@gmail.com'} className="flex flex-col items-center mt-[15px]">
                        <div className="text-white">
                            <div>Open to work</div>
                            <div className='h-[2px] mt-[3px] bg-white'></div>
                        </div>
                    </button>

                    <div className='flex gap-x-[30px] justify-center mt-[50px]'>
                        <a className='cursor-pointer' href="https://github.com/heyAshishRaut" target='_blank'><svg className='h-[33px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="#ffffff" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg></a>
                        <a className='cursor-pointer' href="https://www.linkedin.com/in/ashishraut0302" target='_blank'><svg className='h-[33px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg></a>
                        <a className='cursor-pointer' href="https://x.com/heyashishraut?t=8qFl-xXL7K8DpYfiXsFIGg&s=09" target='_blank'><svg className='h-[30px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Showcase;