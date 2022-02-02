import styles from '../../styles/VideoPlayPauseButton.module.scss';

type VideoPlayPauseButtonProps = {
    playing: boolean;
    toggleVideoPlaying: () => void;
    className?: string;
};

export const VideoPlayPauseButton = ({
    className,
    toggleVideoPlaying,
    playing,
}: VideoPlayPauseButtonProps) => {
    const handleKeyboardEvent = (event: React.KeyboardEvent<SVGSVGElement>) => {
        //Arrow keys can be used to scroll the webpage.
        if (!['Tab', 'Shift', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
            toggleVideoPlaying();
        }
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="51"
            fill="none"
            onClick={toggleVideoPlaying}
            onKeyDown={handleKeyboardEvent}
            className={[className, styles.button].join(' ')}
            tabIndex={0}
        >
            <path
                className={styles.background}
                fill="#251657"
                d="M18.412 0l31.89 18.412-18.412 31.89L0 31.89z"
            />
            {playing ? (
                <path
                    className={styles.icon}
                    fill="#fff"
                    d="M18.992 19.286h3v12h-3zm8.101 0h3v12h-3z"
                />
            ) : (
                <path
                    className={styles.icon}
                    fill="#fff"
                    d="M 23 18 L 31 26 L 23 33 z"
                />
            )}
        </svg>
    );
};
