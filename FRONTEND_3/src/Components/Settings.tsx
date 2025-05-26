import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function Settings() {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    const navigate = useNavigate();

    async function sendFeedback(text: string){
        if(text === ""){
            console.log("empty");
            
            return;
        }
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }
        
        try {
            await fetch(`${BASE_URL}/v1/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({
                    text: text
                })
            });
            setText("");
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        async function userDetails() {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found");
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/v1/userDetail`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                });

                const data = await response.json();
                
                setFullname(data.message.fullname);
                setUsername(data.message.username);
                setEmail(data.message.email);

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch user details");
                }

            } catch (err: any) {
                console.log("Message - ", err);
            }
        };
        userDetails();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col px-[30px] relative overflow-hidden bg-black ">
            <div className="mt-[50px] mb-[50px] h-[70px] flex gap-x-[30px] items-center">
                <div className="bg-white w-[7px] h-[100%]"></div>
                <div className="text-white font-cabinet text-5xl">Settings</div>
            </div>

            <div className="w-[100%] p-[30px] bg-[#F8F4E1] rounded-[15px] text-[#3B3030]">
                <div>
                    <div className="font-cabinet text-5xl ">{fullname}</div>
                    <div className="font-cabinet">{username}</div>
                </div>
                <div className="font-cabinet text-xl mt-[30px] text-[#3B3030]">{email}</div>
            </div>

            <div className="flex flex-col gap-y-[10px]">
                <div className="text-2xl text-white font-cabinet mt-[50px]">Got a suggestion? Let us know.</div>
                <textarea name="" id="" onChange={(e) => setText(e.target.value)} className="textarea py-[10px] px-[20px] min-h-[200px] max-h-[200px] w-[100%] rounded-[15px] border-none outline-none h-[120px]"></textarea>
                <button onClick={() => sendFeedback(text)} className="w-[130px] py-[10px] bg-blue-900 rounded-[7px] text-white">Submit</button>
            </div>

        </div>
    );
}

export default Settings;