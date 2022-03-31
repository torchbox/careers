import Image from 'components/Image';
import RichText from 'components/RichText';
import { ImageTypes } from 'types/Base';
import { Document } from '@contentful/rich-text-types';
import styles from './Introduction.module.scss';

type IntroductionProps = {
    title: string;
    content: { json: Document };
    image: ImageTypes;
};

export const Introduction = ({ title, content, image }: IntroductionProps) => {
    return (
        <>
            <svg className={styles.hiddenSVG}>
                <defs>
                    <clipPath
                        id="introductionImageClipPath"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M 1 0 L 1 1 L 0 1 L 0 0 L 0.407 0 L 0 0.719 L 0.516 1 L 0.924 0.285 L 0.407 0 L 1 0" />
                    </clipPath>
                </defs>
            </svg>

            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{title}</h2>
                    <RichText
                        theme="INDIGO"
                        content={content}
                        className={styles.content}
                    />
                </div>
                <div className={styles.imageContainer}>
                    <div className={styles.clipOverlay} />
                    <Image
                        className={styles.image}
                        layout="fill"
                        src={image.url}
                        alt={image.description}
                    />
                </div>
            </div>
        </>
    );
};

export default Introduction;
