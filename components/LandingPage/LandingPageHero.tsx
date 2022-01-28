import styles from '../../styles/LandingPageHero.module.scss';
import { ImageTypes } from '../../types/Base';
import { ShardClip } from './ShardClip';

type LandingPageHeroProps = {
    image: ImageTypes;
    children: React.ReactNode;
};

export const LandingPageHero = ({ image, children }: LandingPageHeroProps) => {
    return (
        <div className={styles.heroContainer}>
            <ShardClip>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className={styles.image}
                    src={image.url}
                    alt={image.description}
                    width={image.width}
                    height={image.height}
                />
            </ShardClip>

            <div className={styles.textContainer}>
                <h1 className={styles.title}>
                    <span className={styles.titleAccent}>Being at</span>
                    <br />
                    Torchbox
                </h1>
                <div className={styles.subtitle}>{children}</div>
            </div>
        </div>
    );
};

export default LandingPageHero;
