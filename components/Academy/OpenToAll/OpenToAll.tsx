import Image from 'components/Image';
import RichText from 'components/RichText';
import Link from 'next/link';
import { ImageTypes } from 'types/Base';
import { Document } from '@contentful/rich-text-types';
import styles from './OpenToAll.module.scss';

type OpenToAllProps = {
    title: string;
    content: { json: Document };
    image: ImageTypes;
};

export const OpenToAll = ({ title, content, image }: OpenToAllProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                <RichText
                    theme="DARK"
                    content={content}
                    className={styles.content}
                />
                <Link href="/" scroll={false}>
                    <a className="underline-link underline-link--white">
                        Find out more about Torchbox
                    </a>
                </Link>
                <div className={styles.background}></div>
            </div>
            <div className={styles.image}>
                <Image src={image.url} alt={image.description} />
            </div>
        </div>
    );
};

export default OpenToAll;
