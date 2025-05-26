import { Link, useNavigate } from 'react-router-dom';
import star from "../assets/star.svg";
import login from "../assets/acc3.svg";
import bgimage from "../assets/bgimage.png";
import { motion } from "framer-motion";
import { useState } from 'react';

const BASE_URL = "http://localhost:3000";

function Login() {
    const navigate = useNavigate();
    
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginHandler() {
        if (email === "" || password === "") {
            setErr(true);
            setErrMsg("All fields are required!");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return; 
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checkEmail = emailRegex.test(email);

        if (!checkEmail) {
            setErr(true);
            setErrMsg("Enter valid email address!");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/v1/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if(response.status == 400){
                setErr(true);
                setErrMsg("Either invalid email or password");
                setTimeout(() => {
                    setErr(false);
                    setErrMsg("");
                }, 2000);
                return; 
            }

            if (!response.ok) {
                setErr(true);
                setErrMsg("Something went wrong!");
                setTimeout(() => {
                    setErr(false);
                    setErrMsg("");
                }, 2000);
                return; 
            }

            localStorage.setItem("token", data.message);
            console.log("logged in");
            navigate("/");

        } catch (e: any) {
            setErr(true);
            setErrMsg("Invalid Credentials");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
        }
    }

    return (
        <div style={{ backgroundImage: `url(${bgimage})` }} className="overflow-hidden w-[100vw] h-[100vh] flex flex-col bg-[#1a1a1a]">
            <div className="h-[100px] w-[100%] pt-[30px] pl-[40px] backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeIn" }}
                className="absolute font-cabinet text-4xl z-10 text-white">Stack</motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeIn" }}>
                    <img src={star} alt="" className="h-[70px] relative left-[67px] top-[-5px]" />
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
            className="font-poppins flex-1 w-[100%] px-[150px] flex justify-center items-center backdrop-blur-sm">
                <div className="w-[50%] h-[100%] flex flex-col justify-center items-center text-sm">
                    <div className="text-4xl font-cabinet text-white text-center mb-[50px]">Welcome Back</div>
                    <div className="flex flex-col gap-y-[15px] w-[100%] px-[80px]">
                        <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="py-[10px] px-[20px] rounded-[7px] border-none outline-none" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="py-[10px] px-[20px] rounded-[7px] border-none outline-none" />
                    </div>
                    <button onClick={loginHandler} className="py-[12px] bg-black mt-[15px] rounded-[7px] text-white px-[40px]">Log in</button>

                    <div className="w-[100%] pl-[80px] mt-[40px] text-sm justify-content-start">
                        <div className="">Don't have account ?</div>
                        <button className="text-white mt-[5px] flex items-center gap-x-[5px]">
                            <Link to="/signup" className='flex gap-x-[5px] items-center'>
                                <div className="text-white">Sign up</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </Link>
                        </button>
                    </div>
                </div>
                <img src={login} alt="" className="w-[50%] h-[80%]" />

                {/* Alert Box */}
                {err &&
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 5 }}
                        transition={{ duration: 0.5, ease: "easeIn" }}
                        className='absolute z-[100] top-[-50px] px-[40px] h-[45px] flex items-center text-sm text-white bg-blue-600/40  backdrop-blur-md rounded-[25px]'>
                        {errMsg}
                    </motion.div>
                }
            </motion.div>
        </div>
    );
}

export default Login;