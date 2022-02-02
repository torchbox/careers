import { ArrowLoopRight } from 'components/ArrowLoopRight';
import { Image } from 'components/Image';
import { useRef, useState } from 'react';
import styles from '../../styles/LifeAtTorchboxHero.module.scss';
import { ImageTypes, VideoTypes } from '../../types/Base';
import { VideoPlayPauseButton } from './VideoPlayPauseButton';

type LifeAtTorchboxHeroProps = {
    image: ImageTypes;
    video?: VideoTypes;
    subtitle: string;
    children: React.ReactNode;
};

export const LifeAtTorchboxHero = ({
    image,
    video,
    subtitle,
    children,
}: LifeAtTorchboxHeroProps) => {
    const [isVideoPlaying, setVideoPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleVideoPlaying = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
        setVideoPlaying(!isVideoPlaying);
    };

    return (
        <>
            <svg>
                <defs>
                    <clipPath
                        id="shardClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0.436 0.033 L 0.917 0.34 L 0.519 0.985 L 0.024 0.67 Z " />
                        <path d="M 0.996 0.406 L 0.77 0.79 L 0.967 0.908 L 1.207 0.533 L 1.03 0.429 Z" />
                    </clipPath>
                </defs>
            </svg>
            <div className={styles.heroContainer}>
                <Image
                    src={image.url}
                    alt={image.description}
                    className={styles.mobileImage}
                />
                {video ? (
                    <div className={styles.videoContainer}>
                        <video
                            className={styles.video}
                            src={video.url}
                            autoPlay
                            muted
                            loop
                            ref={videoRef}
                            onClick={toggleVideoPlaying}
                        />
                        <VideoPlayPauseButton
                            className={styles.playPauseButton}
                            playing={isVideoPlaying}
                            toggleVideoPlaying={toggleVideoPlaying}
                        />
                    </div>
                ) : (
                    <Image
                        src={image.url}
                        alt={image.description}
                        className={styles.desktopImage}
                    />
                )}
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>
                        <span className={styles.titleAccent}>Life at</span>
                        <br />
                        Torchbox
                    </h1>
                    <div className={styles.subtitle}>{subtitle}</div>
                    <div className={styles.description}>{children}</div>
                    <ArrowLoopRight className={styles.arrow} />
                </div>
            </div>
        </>
    );
};

export default LifeAtTorchboxHero;
