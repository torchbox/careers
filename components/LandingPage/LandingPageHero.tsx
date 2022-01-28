import { Image } from 'components/Image';
import styles from '../../styles/LandingPageHero.module.scss';
import { ImageTypes } from '../../types/Base';
import { ShardClip } from './ShardClip';

type LandingPageHeroProps = {
    image: ImageTypes;
    children: React.ReactNode;
};

export const LandingPageHero = ({ image, children }: LandingPageHeroProps) => {
    return (
        <>
            <svg width="0" height="0" viewBox="0 0 1 1">
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

export default LandingPageHero;
