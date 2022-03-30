import Image from 'components/Image';
import { ImageTypes } from '../../../types/Base';
import styles from './Hero.module.scss';

type HeroProps = {
    image: ImageTypes;
    subtitle: string;
    children: React.ReactNode;
};

export const Hero = ({ image, subtitle, children }: HeroProps) => {
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
                </defs>
                <defs>
                    <clipPath
                        id="squareShardClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 0.85 0.46 L 0.62 0.79 L 0.76 0.89 L 0.985 0.55 Z " />
                        <path d="M 0.46 0 L 0.9 0.3 L 0.45 0.95 L 0 0.63 Z" />
                    </clipPath>
                </defs>
            </svg>
            <div className={styles.heroContainer}>
                <Image
                    src={image.url}
                    alt={image.description}
                    className={styles.image}
                />
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>
                        Torchbox
                        <br />
                        <span className={styles.titleAccent}>Academy</span>
                    </h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                    <div className={styles.description}>{children}</div>
                </div>
            </div>
        </>
    );
};

export default Hero;
