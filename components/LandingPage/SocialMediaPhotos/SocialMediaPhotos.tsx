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
        <a
            href={photo.instagramLink}
            key={`social-media-image-${index}`}
            target="_blank"
            rel="noreferrer"
        >
            <li className={styles.image}>
                <Image
                    layout="fill"
                    src={photo.image.url}
                    alt={photo.image.description}
                />
            </li>
        </a>
    ));

    return <ul className={styles.container}>{SocialMediaPhotos}</ul>;
};

export default SocialMediaPhotos;
