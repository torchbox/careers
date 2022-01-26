import { Image } from './Image';
import styles from '/styles/SocialMediaPhotos.module.scss';
import { ImageTypes } from 'types/Base';

type SocialMediaPhotosProps = {
    photos: ImageTypes[];
};

export const SocialMediaPhotos = ({ photos }: SocialMediaPhotosProps) => {
    const SocialMediaPhotos = photos.slice(0, 8).map((image) => (
        <li className={styles.image} key={image.description}>
            <Image layout="fill" src={image.url} alt={image.description} />
        </li>
    ));

    return <div className={styles.container}>{SocialMediaPhotos}</div>;
};

export default SocialMediaPhotos;
