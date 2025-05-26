import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="w-full min-h-screen flex flex-col px-[30px] relative overflow-hidden">

            {/* Greetings */}
            <div>
                <div className="text-white font-cabinet text-4xl my-[50px]">
                    Morning, Ashish! Ready to win the day?
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-x-[15px]">
                <button onClick={() => setShowModal(true)} className="py-[10px] w-[130px] bg-blue-500/30 rounded-[7px] text-white flex justify-center items-center gap-x-[15px]">
                    <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                    <div>Create</div>
                </button>

                <button className="py-[10px] w-[130px] bg-gray-300 rounded-[7px] flex justify-center items-center gap-x-[15px]">
                    <svg className="h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#1e40af" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304c0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
                    </svg>
                    <div className="text-blue-800">Invite</div>
                </button>
            </div>

            {/* Floating Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center w-[100%] h-[100%] backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div className="bg-neutral-500/50 rounded-[20px] w-[800px] h-[80%] flex justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            
                            <form className="font-poppins flex flex-col gap-y-[12px] items-center justify-center text-sm" onSubmit={(e) => { e.preventDefault(); setShowModal(false);}}>
                                <div className="text-white font-cabinet text-4xl text-center mb-[40px]">Create Link Snap</div>
                                <input type="text" placeholder="Title" className="py-[10px] px-[20px] w-[500px] rounded-[7px] border-none outline-none" />
                                <input type="text" placeholder="Link" className="py-[10px] px-[20px] w-[500px] rounded-[7px] border-none outline-none" />
                                <textarea className="textarea py-[10px] px-[20px] w-[500px] rounded-[7px] border-none outline-none h-[120px]" placeholder="Description"></textarea>
                                <div className="w-[500px] flex justify-end gap-x-[12px]">
                                    <div onClick={() => setShowModal(false)} className="py-[10px] w-[130px] bg-white rounded-[7px] text-blue-900 flex justify-center items-center gap-x-[15px]">Clear</div>
                                    <div className="py-[10px] w-[130px] bg-blue-900 rounded-[7px] text-white flex justify-center items-center gap-x-[15px]">Create</div>
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

                    <div className="h-[280px] w-[23%] bg-stone-500/10 border-2 border-stone-500/20 backdrop-blur-md rounded-[15px] py-[15px] px-[20px] flex flex-col justify-between">
                        <div className="flex flex-col ">
                            <div className="font-cabinet text-white text-[17px] mb-[10px]">Protocols to Improve Vision & Eyesight</div>

                            <div className="flex gap-x-[7px] items-center text-white text-[13px] mb-[10px]">
                                <div className="bg-red-500/30 border-2 border-red-50/10 px-[7px] py-[1px] rounded-[5px]">Exam</div>
                                <div className="bg-blue-500/30 border-2 border-blue-50/10 px-[7px] py-[1px] rounded-[5px]">GenAI</div>
                            </div>

                            <div className="text-[13px] text-gray-200 h-[80px] font-poppins overflow-hidden">
                                Huberman Labs - I discuss the science of vision and share simple, effective tools to enhance eyesight and preserve eye health.

                            </div>
                            <div className="text-[12px] mt-[15px] mb-[10px] text-gray-300">May 2, 2025</div>
                        </div>

                        <div>
                            <div className="w-[100%] flex">
                                <div className="w-full flex items-center justify-between">
                                    <svg className="h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>
                                    <div className="flex gap-x-[10px]">
                                        <div className="py-[7px] px-[20px] bg-stone-300/20 text-white tracking-wide rounded-[7px] flex items-center justify-center text-sm">
                                            Details
                                        </div>
                                        <div className="py-[7px] px-[20px] bg-stone-300/20 rounded-[7px] flex items-center justify-center text-sm">
                                            <svg className="h-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
