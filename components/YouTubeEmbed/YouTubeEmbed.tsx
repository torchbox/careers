import styles from './YouTubeEmbed.module.scss';

/**
 * Parses any format of YouTube URL to return only the video ID.
 * This ensures a consistent format for the embed URL.
 * @param url The YouTube URL.
 * @returns The video ID, or null if the URL format is invalid.
 */
const parseURLtoGetVideoId = (url: string) => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

type YouTubeEmbedProps = {
    url: string;
    title: string;
};

export const YouTubeEmbed = ({ url, title }: YouTubeEmbedProps) => {
    const videoId = parseURLtoGetVideoId(url);

    if (!videoId) {
        return (
            <p>The YouTube video linked to by this embed was not accessible.</p>
        );
    }

    return (
        <iframe
            className={styles.container}
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        />
    );
};
