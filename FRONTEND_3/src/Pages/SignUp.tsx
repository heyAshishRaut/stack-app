import { Link, useNavigate } from 'react-router-dom';
import star from "../assets/star.svg";
import signup from "../assets/acc1.svg";
import bgimage from "../assets/bgimage.png";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

const BASE_URL = "http://localhost:3000";

function SignUp() {
    const navigate = useNavigate();

    // fullname
    const [fullName, setFullName] = useState("");
    // username
    const [username, setUsername] = useState("");
    // email
    const [email, setEmail] = useState("");
    //password
    const [password, setPassword] = useState("");
    
    // error message (custom alert box)
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    // Email verification modal
    const [verify, setVerify] = useState(false);


    const [emailStatus, setEmailStatus] = useState(false);
    const [otp, setOtp] = useState('');
    const handleChange = (value: string) => setOtp(value);

    const [sendOtp, setSendOtp] = useState<string>('');

    // Open info
    const [openInfo, setOpenInfo] = useState(false);

    // email verify button - side of email input box
    async function verifyButton() {
        if (email === "") {
            setErr(true);
            setErrMsg("Email required!");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }

        if (fullName === "" || username === "") {
            setErr(true);
            setErrMsg("Above fields are required!");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }

        if (!email.includes("@")) {
            setErr(true);
            setErrMsg("Invalid email");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }

        try{
            const res = await fetch(`${BASE_URL}/v1/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                })
            });
            if(res.status === 400){
                setErr(true);
                setErrMsg("Account already exists!");
                setTimeout(() => {
                    setErr(false);
                    setErrMsg("");
                }, 2000);
                return;
            }
        }
        catch(e){
            console.log(e);
        }

        setVerify(true);

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSendOtp(generatedOtp);

        try {
            // Backend > email verification
            const response = await fetch(`${BASE_URL}/v1/emailverify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    otp: generatedOtp,
                })
            });
            if (!response.ok) {
                if (response.status === 500) {
                    console.log("Something went wrong!");
                }
            }
            else {
                if (response.status === 200) {
                    console.log("Email sent successfully");
                }
            }
        } catch (e) {
            console.log("Fatal error - ", e);
        }
    }

    // email verify using OTP
    function emailVerifyHandler() {
        if (otp === sendOtp.toString()) {
            setEmailStatus(true);
            setVerify(false); 
        } else {
            setOtp("");
            setErr(true);
            setErrMsg("Invalid OTP");

            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);

            console.log("Invalid OTP");
        }
    }

    // username verify fun
    async function usernameHandler(): Promise<boolean> {
        const checkUsername = /\s/.test(username);

        if (checkUsername) {
            setErr(true);
            setErrMsg("Username cannot have spaces!");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return false;
        }
        else {
            setUsername(username);
            return true;
        }
    }

    // email valid fun
    async function emailHandler(): Promise<boolean> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checkEmail = emailRegex.test(email)

        if (!checkEmail) {
            setErr(true);
            setErrMsg("Enter valid email address!");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return false;
        }
        else {
            setEmail(email);
            return true;
        }
    }

    // password valid fun
    async function passwordHandler(): Promise<boolean> {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        const checkPassword = passwordRegex.test(password)

        if (!checkPassword) {
            setErr(true);
            setErrMsg("Password must contains small, capital, numbers and special characters!");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return false;
        }
        else {
            setPassword(password);
            return true;
        }
    }

    async function signupSubmitHandler() {
        if (fullName == "" || username == "" || email == "" || password == "") {
            setErr(true);
            setErrMsg("All fields are required!");
            setTimeout(() => {
                setErr(false);
                setErrMsg("");
            }, 2000);
            return;
        }

        else {
            // first, verifying username, email and password
            let userbool = await usernameHandler();
            let emailbool = await emailHandler();
            let passbool = await passwordHandler();

            if (userbool === false || emailbool === false || passbool === false) {
                return;
            }
            if (emailStatus === false){
                setErr(true);
                setErrMsg("Email is not verified!");
                setTimeout(() => {
                    setErr(false);
                    setErrMsg("");
                }, 2000);
                return;
            }

            try {
                // Backend > Sign up
                const response = await fetch(`${BASE_URL}/v1/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fullname: fullName,
                        username: username,
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();

                if(response.status == 402){
                    setErr(true);
                    setErrMsg("An account with this username already exists!");
                    setTimeout(() => {
                        setErr(false);
                        setErrMsg("");
                    }, 2000);
                    return;
                }

                if (response.status == 403) {
                    setErr(true);
                    setErrMsg("An account with this email already exists!");
                    setTimeout(() => {
                        setErr(false);
                        setErrMsg("");
                    }, 2000);
                    return;
                }

                if (!response.ok) {
                    setErr(true);
                    setErrMsg(data.message);
                    setTimeout(() => {
                        setErr(false);
                        setErrMsg("");
                    }, 2000);
                    return;
                }
                else {
                    if (response.status === 201) {
                        console.log("Account created");
                        navigate("/login");
                    }
                }

            } catch (e: any) {
                setErr(true);
                setErrMsg(e.message || "Something went wrong");
                setTimeout(() => {
                    setErr(false);
                    setErrMsg("");
                }, 2000);
            }
        }
    }

    return (
        <div style={{ backgroundImage: `url(${bgimage})` }} className="overflow-hidden w-[100vw] h-[100vh] flex flex-col bg-[#1a1a1a]">
            {/* Logo */}
            <div className="h-[100px] w-[100%] pt-[30px] pl-[40px] backdrop-blur-sm">
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

            <AnimatePresence>
                {verify && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center w-[100%] h-[100%] "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div className="bg-[#dadada] rounded-[20px] w-[800px] h-[80%] flex justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >

                            <form className="px-[50px] font-cabinet flex flex-col gap-y-[12px] items-center justify-center text-sm" onSubmit={(e) => { e.preventDefault(); setVerify(false); }}>
                                <div className="text-4xl mb-2">Verify Email</div>
                                <div className='font-poppins text-center pb-[30px]'>We've sent a 6-digit verification code to your email. <br /> Please check your inbox and spam folder.</div>

                                <div className='px-[100px] pb-[30px]'>
                                    <MuiOtpInput value={otp} onChange={handleChange} length={6} className='text-white' />
                                </div>

                                <div className='flex gap-x-[15px] font-poppins'>
                                    <button onClick={() => { setOtp(""); setVerify(false) }} className="mt-4 bg-white text-black px-[40px] py-[12px] rounded-md">Cancel</button>
                                    <button onClick={emailVerifyHandler} className="mt-4 bg-black text-white px-[40px] py-[12px] rounded-md">Verify</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {openInfo && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-end w-[100%] h-[100%] p-[100px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div className="bg-black border-2 border-gray-200/30 rounded-[25px] w-[400px] h-[400px] flex"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='flex flex-col justify-between p-[20px] text-white w-full'>
                                <div className='flex flex-col'>
                                    <div className='font-cabinet text-2xl self-center'>Things to Remember</div>

                                    <div className='font-cabinet mt-[50px] flex flex-col gap-y-[20px] px-[20px] text-justify'>
                                        <div>1. Please ensure the username is 6 to 10 characters in length.</div>
                                        <div>2. New email required for sign-up.</div>
                                        <div>3. Password must contain 6 - 10 characters, including uppercase, lowercase, numeric, and special symbols.</div>
                                    </div>
                                </div>

                                <button onClick={() => setOpenInfo(false)} className='self-end font-cabinet w-[130px] py-[8px] bg-blue-800 rounded-[10px]'>Understand</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
                className="font-poppins flex-1 w-[100%] px-[150px] flex justify-center items-center backdrop-blur-sm">

                {/* Main content > Image */}
                <div className="w-[50%] h-[100%]">
                    <img src={signup} alt="" />
                </div>

                {/* Main content > Sign up details */}
                <div className="w-[50%] h-[100%] flex flex-col justify-center items-center text-sm">
                    <div className="text-4xl font-cabinet text-white text-center mb-[50px]">Create Account</div>
                    
                    <div className="flex flex-col gap-y-[15px] w-[100%] px-[80px] ">
                        <input type="text" onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="py-[10px] px-[20px] rounded-[7px] border-none outline-none" />
                        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="py-[10px] px-[20px] rounded-[7px] border-none outline-none" />
                        <div className='flex gap-x-[15px]'>
                            <input disabled={emailStatus}  type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="flex-1 py-[10px] px-[20px] rounded-[7px] border-none outline-none" />
                            <button disabled={emailStatus} onClick={verifyButton} className="py-[12px] bg-black rounded-[7px] text-white px-[40px]">
                                Verify
                            </button>
                        </div>
                        <div className='flex gap-x-[15px] items-center'>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="flex-1 py-[10px] px-[20px] rounded-[7px] border-none outline-none" />
                            <svg className='h-[30px] cursor-pointer' onClick={() => setOpenInfo(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                        </div>
                        
                    </div>
                    <button onClick={signupSubmitHandler} className="py-[12px] bg-black mt-[15px] rounded-[7px] text-white px-[40px]">
                        Sign up
                    </button>

                    <div className="w-[100%] pl-[80px] mt-[40px] text-sm justify-content-start">
                        <div>Already have account ?</div>
                        <button className="text-white mt-[5px] flex items-center gap-x-[5px]">
                            <Link to="/login" className='flex gap-x-[5px] items-center'>
                                <div className="">Log in</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </Link>
                        </button>
                    </div>
                </div>

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

export default SignUp;