import { useEffect } from "react";

interface TwitterEmbedProps {
    tweetUrl: string;
}

const TwitterEmbed = ({ tweetUrl }: TwitterEmbedProps) => {
    useEffect(() => {
        const scriptId = "twitter-wjs";

        // Add Twitter script if not already added
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
        } else {
            // If already added, reload the widget
            if ((window as any)?.twttr?.widgets) {
                (window as any).twttr.widgets.load();
            }
        }
    }, [tweetUrl]);

    return (
        <div className="flex justify-center w-[80%]">
            <blockquote className="twitter-tweet">
                <a href={tweetUrl}></a>
            </blockquote>
        </div>
    );
};

export default TwitterEmbed;
