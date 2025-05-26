import bg from "../assets/bg.jpg";

function Page404(){
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className="z-100 w-[100vw] h-[100vh] bg-cover flex flex-col items-center justify-start">
            <div className="text-white font-cabinet text-5xl mt-[100px]">Whoops! That didn't go as planned.</div>
            <div className="text-white font-cabinet text-2xl mt-[20px]">Please try again later.</div>
           
        </div>
    )
}

export default Page404;