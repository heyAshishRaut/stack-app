interface LinkedInEmbedProps {
    postUrl: string; // Normal LinkedIn post URL
}

const LinkedInEmbed = ({ postUrl }: LinkedInEmbedProps) => {
    // Extract post ID from the regular LinkedIn URL
    const postIdMatch = postUrl.match(/activity-(\d+)-/);
    const postId = postIdMatch?.[1];

    const embedUrl = postId
        ? `https://www.linkedin.com/embed/feed/update/urn:li:share:${postId}`
        : "";

    if (!postId) {
        return (
            <div className="text-red-500 text-sm">
                Invalid LinkedIn URL. Please provide a proper LinkedIn post link.
            </div>
        );
    }

    return (
        <div className="flex justify-center w-[80%]">
            <iframe
                src={embedUrl}
                height="500"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title="LinkedIn Post"
            ></iframe>
        </div>
    );
};

export default LinkedInEmbed;
  
  