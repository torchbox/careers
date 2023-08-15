// Code taken from GitHub discussion thread on Next/Image
// https://github.com/vercel/next.js/discussions/18739

import NextImage, { ImageProps } from 'next/legacy/image';
import styles from './Image.module.scss';

export const Image = ({ className = '', ...props }: ImageProps) => {
    if (!props.alt) {
        props.alt = '';
    }

    return (
        <div className={`${styles.container} ${className}`}>
            <NextImage className={styles.image} layout="fill" {...props} />
        </div>
    );
};
