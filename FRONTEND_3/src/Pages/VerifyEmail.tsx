import {motion} from "framer-motion";
import bgimage from "../assets/bgimage.png";
import star from "../assets/star.svg";

function VerifyEmail(){
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

            <div className="flex-1 width-[100vw] flex flex-col justify-center items-center">
                <div>Please verify email</div>
                <div>We've sent a 6-digit verification code (OTP) to your email address.
                    Please check your inbox and enter the code below</div>
                <input type="text" placeholder="Enter OTP" className="py-[10px] px-[20px] rounded-[7px] outline-none border-none"/>
            </div>
        </div>
    )
}

export default VerifyEmail;