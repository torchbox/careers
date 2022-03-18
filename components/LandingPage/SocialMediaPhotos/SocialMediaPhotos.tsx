import { ImageTypes } from 'types/Base';
import { Image } from 'components/Image/Image';
import styles from './SocialMediaPhotos.module.scss';

type SocialMediaPhotosProps = {
    photos: ImageTypes[];
};

export const SocialMediaPhotos = ({ photos }: SocialMediaPhotosProps) => {
    const SocialMediaPhotos = photos.slice(0, 8).map((image, index) => (
        <li className={styles.image} key={`social-media-image-${index}`}>
            <Image layout="fill" src={image.url} alt={image.description} />
        </li>
    ));

    return <ul className={styles.container}>{SocialMediaPhotos}</ul>;
};

export default SocialMediaPhotos;
