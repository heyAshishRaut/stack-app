interface SpotifyEmbedProps {
    embedUrl: string; 
}

const SpotifyEmbed = ({ embedUrl }: SpotifyEmbedProps) => {
    const trackUrl = embedUrl.replace("open.spotify.com/track/", "open.spotify.com/embed/track/").split("?")[0];

    return (
        <div className="flex justify-center w-[80%]">
            <iframe
                src={trackUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default SpotifyEmbed;
  