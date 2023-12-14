import { ImageTypes } from 'types/Base';
import { Image } from 'components/Image/Image';
import { RefObject, useRef } from 'react';
import { useFadeInChildren } from 'hooks/useFadeInChildren';
import styles from './SocialMediaPhotos.module.scss';

type SocialMediaPhotosProps = {
    photos: {
        image: ImageTypes;
        instagramLink: string;
    }[];
};

export const SocialMediaPhotos = ({ photos }: SocialMediaPhotosProps) => {
    const containerRef: RefObject<HTMLUListElement> =
        useRef<HTMLUListElement | null>(null);

    useFadeInChildren(containerRef, 0.3);

    const SocialMediaPhotos = photos.slice(0, 8).map((photo, index) => (
        <li className={styles.image} key={`social-media-image-${index}`}>
            <a
                href={photo.instagramLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Go to this photo on Instagram"
            >
                <Image
                    layout="fill"
                    src={photo.image.url}
                    alt={photo.image.description}
                />
            </a>
        </li>
    ));

    return (
        <ul className={styles.container} ref={containerRef}>
            {SocialMediaPhotos}
        </ul>
    );
};

export default SocialMediaPhotos;
