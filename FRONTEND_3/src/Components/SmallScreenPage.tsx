import star from "../assets/star.svg"

function SmallScreenPage(){
    return (
        <div style={{
            background: 'linear-gradient(to left, #fff, #076585)'
        }} className="w-screen h-[100vh]">
            <div className="h-[10%] w-[100%] ">
                <div className="pt-[30px] pl-[20px]">
                    <div className="absolute font-cabinet text-4xl z-10 text-white">Stack</div>
                    <div>
                        <img src={star} alt="" className="h-[70px] relative left-[67px] top-[-5px]" />
                    </div>
                </div>
            </div>

            <div
                className="h-[90%] w-[100%] text-stone-800 font-cabinet text-2xl flex justify-center items-center text-justify px-[50px]">
                <div>This application is currently available only on <span className="text-white bg-stone-800 px-[5px]">larger screens</span> (13 inches or wider). </div>
            </div>
        </div>
    );
}

export default SmallScreenPage;