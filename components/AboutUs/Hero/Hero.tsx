import { useRef, useState } from 'react';
import { ImageTypes, VideoTypes } from 'types/Base';
import { ArrowLoopRight } from 'components/SVG/ArrowLoop/ArrowLoopRight';
import Image from 'components/Image';
import { VideoPlayPauseButton } from './VideoPlayPauseButton';
import styles from './Hero.module.scss';

type HeroProps = {
    image: ImageTypes;
    video?: VideoTypes;
    subtitle: string;
    children: React.ReactNode;
};

export const Hero = ({ image, video, subtitle, children }: HeroProps) => {
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
            <svg className={styles.svg}>
                <defs>
                    <clipPath
                        id="shardClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0.436 0.033 L 0.917 0.34 L 0.519 0.985 L 0.024 0.67 Z " />
                        <path d="M 0.996 0.406 L 0.77 0.79 L 0.967 0.908 L 1.207 0.533 L 1.03 0.429 Z" />
                    </clipPath>
                    <clipPath
                        id="squareShardClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0.85 0.46 L 0.62 0.79 L 0.76 0.89 L 0.985 0.55 Z " />
                        <path d="M 0.46 0 L 0.9 0.3 L 0.45 0.95 L 0 0.63 Z" />
                    </clipPath>
                    <clipPath
                        id="inverseShardClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 1.01 0.411 L 0.928 0.344 L 0.468 0.029 L 0.024 0.67 L 0.499 0.978 L 0.928 0.344 L 1.01 0.411 L 0.757 0.788 L 0.95 0.924 L 1.207 0.533 Z M 0 0 L 1 0 L 1 1 L 0 1 Z" />
                    </clipPath>
                    <clipPath
                        id="inverseShardClipPathLarge"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0.803 0.421 L 0.567 0.768 L 0.759 0.894 L 0.985 0.551 L 0.803 0.421 L 0.84 0.245 L 0.493 0.021 L 0.047 0.646 L 0.402 0.883 L 0.84 0.245 Z M 0 0 L 1 0 L 1 1 L 0 1 Z" />
                    </clipPath>
                </defs>
            </svg>
            <div
                className={`${styles.heroContainer} ${
                    !video ? styles.desktopHeroImageBackgroundGradient : ''
                }`}
            >
                <Image
                    src={image.url}
                    alt={image.description}
                    className={styles.mobileImage}
                    priority
                />
                {video ? (
                    <>
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
                        <div className={styles.videoClip} />
                        <div className={styles.videoOverlay} />
                    </>
                ) : (
                    <Image
                        src={image.url}
                        alt={image.description}
                        className={styles.desktopImage}
                        priority
                    />
                )}
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>About us</h1>
                    <div className={styles.subtitle}>{subtitle}</div>
                    <div className={styles.description}>{children}</div>
                    <ArrowLoopRight className={styles.arrow} />
                </div>
            </div>
        </>
    );
};

export default Hero;
