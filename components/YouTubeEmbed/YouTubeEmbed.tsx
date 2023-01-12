import { useState, useEffect } from 'react';
import styles from './YouTubeEmbed.module.scss';

const getVideoId = (url: string) => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

type YouTubeEmbedProps = {
    url: string;
};

export const YouTubeEmbed = ({ url }: YouTubeEmbedProps) => {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const videoId = getVideoId(url);
        if (videoId) {
            setVideoId(videoId);
        } else {
            setError('YouTube video ID could not be extracted.');
        }
    }, [url]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!videoId) {
        return <p>Loading...</p>;
    }

    return (
        <iframe
            className={styles.container}
            title="YouTube video player"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        />
    );
};
