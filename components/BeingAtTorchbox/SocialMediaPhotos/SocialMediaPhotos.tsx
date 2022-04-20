import { ImageTypes } from 'types/Base';
import { Image } from 'components/Image/Image';
import styles from './SocialMediaPhotos.module.scss';

type SocialMediaPhotosProps = {
    photos: {
        image: ImageTypes;
        instagramLink: string;
    }[];
};

export const SocialMediaPhotos = ({ photos }: SocialMediaPhotosProps) => {
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

    return <ul className={styles.container}>{SocialMediaPhotos}</ul>;
};

export default SocialMediaPhotos;
