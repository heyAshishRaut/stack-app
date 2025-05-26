import { Outlet, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import bgimage from "../assets/bgimage.png";
import Navbar from "../navbar";

const BASE_URL = "http://localhost:3000";

const SharedDataContext = createContext(null);
export const useSharedData = () => useContext(SharedDataContext);

function Layout() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    async function refreshData() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token not found!");
                setLoading(false);
                return;
            }

            const response = await fetch(`${BASE_URL}/v1/getall`, {
                method: "GET",
                // @ts-ignore
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },

            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result);
            setData(result);
            console.log(result);
        }

        catch (e) {
            console.log("Fatal error - ", e);
        }
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found");
                navigate("/login");
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

                if (!response.ok) {
                    navigate("/login");
                    throw new Error(data.message || "Failed to fetch user details");
                    
                }

                setFullname(data.message.fullname);
                setUsername(data.message.username);

            } catch (err: any) {
                navigate("/login");
                console.log("Message - ", err);
            }
        };

        refreshData();
        fetchUserDetails();
        
    }, []);

    return (
        // @ts-ignore
            <div
                style={{ backgroundImage: `url(${bgimage})` }}
                className="flex font-poppins w-[100vw] min-h-screen bg-cover bg-center bg-no-repeat bg-fixed">
            {/* @ts-ignore */}
            <SharedDataContext.Provider value={{ data, loading, fullname, username, refreshData }}>
                {/* Sidebar */}
                <div className="fixed top-0 left-0 h-[100vh] w-[18%] backdrop-blur-lg">
                    <Navbar />
                </div>
                {/* Content / Outlet */}
                <div className="ml-[18%] w-[82%] min-h-[100vh]">
                    <Outlet />
                </div>
            </SharedDataContext.Provider>
            </div>
        
    );
}

export default Layout;
