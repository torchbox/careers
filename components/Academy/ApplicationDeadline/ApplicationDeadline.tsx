import { ImageTypes } from 'types/Base';
import Link from 'next/link';
import styles from './ApplicationDeadline.module.scss';
import Image from '../../Image';

type ApplicationDeadlineProps = {
    titleIntro: string;
    titleEmphasis: string;
    image: ImageTypes;
    children: React.ReactNode;
};

export const ApplicationDeadline = ({
    titleIntro,
    titleEmphasis,
    image,
    children,
}: ApplicationDeadlineProps) => (
    <div className={styles.container}>
        <div className={styles.textContainer}>
            <h2 className={styles.title}>
                {titleIntro}{' '}
                <span className={styles.emphasis}>{titleEmphasis}</span>
            </h2>
            <div className={styles.richText}>{children}</div>
            <Link href="/" legacyBehavior>
                <a className="underline-link underline-link--white">
                    Apply now
                </a>
            </Link>
            <div className={styles.background}></div>
        </div>
        <div className={styles.image}>
            <Image src={image.url} alt={image.description} />
        </div>
    </div>
);

export default ApplicationDeadline;
