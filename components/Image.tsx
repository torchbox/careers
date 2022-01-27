// Code taken from GitHub discussion thread on Next/Image
// https://github.com/vercel/next.js/discussions/18739

import styles from '/styles/Image.module.scss';
import NextImage, { ImageProps } from 'next/image';

export const Image = ({ className = '', ...props }: ImageProps) => {
    if (!props.alt) {
        props.alt = '';
    }

    return (
        <div className={styles.container}>
            <NextImage className={styles.image} layout="fill" {...props} />
        </div>
    );
};
