import { useEffect } from "react";

interface InstagramEmbedProps {
    postUrl: string;
}

const InstagramEmbed = ({ postUrl }: InstagramEmbedProps) => {
    useEffect(() => {
        const scriptId = "instagram-embed-script";

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
        } else {
            (window as any)?.instgrm?.Embeds?.process();
        }
    }, [postUrl]);

    return (
        <div className="flex justify-center w-[80%]">
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={postUrl}
                data-instgrm-version="14"
            ></blockquote>
        </div>
    );
};

export default InstagramEmbed;
