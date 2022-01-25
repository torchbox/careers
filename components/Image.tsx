// Code taken from GitHub discussion thread on Next/Image
// https://github.com/vercel/next.js/discussions/18739

import styles from '/styles/Image.module.scss';
import NextImage, { ImageProps } from 'next/image';

export const Image = ({ className = '', ...props }: ImageProps) => {
    // I've specified a default empty string value for alt text here
    // So if you don't pass alt text into Image, it will assume the image is decorative.
    let altText = '';
    if (props.alt !== undefined) {
        altText = props.alt;
    }

    return (
        <div className={styles.container}>
            <NextImage
                className={styles.image}
                alt={altText}
                layout="fill"
                {...props}
            />
        </div>
    );
};
