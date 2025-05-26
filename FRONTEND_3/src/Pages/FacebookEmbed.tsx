import { useEffect } from "react";

interface FacebookEmbedProps {
    postUrl: string;
}

const FacebookEmbed = ({ postUrl }: FacebookEmbedProps) => {
    useEffect(() => {
        if (!document.getElementById("fb-root")) {
            const fbRoot = document.createElement("div");
            fbRoot.id = "fb-root";
            document.body.appendChild(fbRoot);
        }

        if (!document.getElementById("facebook-jssdk")) {
            const script = document.createElement("script");
            script.id = "facebook-jssdk";
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
            script.async = true;
            script.defer = true;
            script.crossOrigin = "anonymous";
            document.body.appendChild(script);

            script.onload = () => {
                (window as any)?.FB?.XFBML?.parse();
            };
        } else {
            (window as any)?.FB?.XFBML?.parse();
        }
    }, [postUrl]);

    return (
        <div className="flex justify-center w-[80%]">
            <div
                className="fb-post"
                data-href={postUrl}
                data-width="500"
            ></div>
        </div>
    );
};

export default FacebookEmbed;