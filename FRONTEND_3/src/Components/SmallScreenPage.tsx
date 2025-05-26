import star from "../assets/star.svg"
import smallscreen from "../assets/smallscreen.png";

function SmallScreenPage(){
    return (
        <div style={{
            background: 'linear-gradient(to right, #2F0743, #41295a)'
        }} className="w-screen h-screen">
            <div>
                <div className="h-[100px] w-[100%] pt-[30px] pl-[20px]">
                    <div className="absolute font-cabinet text-4xl z-10 text-white">Stack</div>
                    <div>
                        <img src={star} alt="" className="h-[70px] relative left-[67px] top-[-5px]" />
                    </div>
                </div>
            </div>

            <div
                className="w-[100%] font-cabinet text-2xl flex flex-col gap-y-[20px] justify-center items-center text-justify px-[40px] text-white">
                <img src={smallscreen} alt="" className="h-[300px]" />
                <div>This Stack is currently available only on larger screens (13 inches or wider). </div>
                <div>Please switch to a laptop or desktop for the <span className="text-white bg-black px-[5px]">best</span> experience.</div>
            </div>
        </div>
    );
}

export default SmallScreenPage;