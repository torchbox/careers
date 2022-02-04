import { Image } from 'components/Image/Image';
import styles from './Hero.module.scss';
import { ImageTypes } from '../../../types/Base';

type HeroProps = {
    image: ImageTypes;
    children: React.ReactNode;
};

export const Hero = ({ image, children }: HeroProps) => {
    return (
        <>
            <svg height="0">
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
                    className={styles.image}
                />
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>
                        <span className={styles.titleAccent}>Being at</span>
                        <br />
                        Torchbox
                    </h1>
                    <div className={styles.subtitle}>{children}</div>
                </div>
            </div>
        </>
    );
};

export default Hero;
