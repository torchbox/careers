import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';

import SocialMediaPhotos from 'components/SocialMediaPhotos';

const PlaceholderImage = {
    description: 'This is a placeholder',
    url: 'https://source.unsplash.com/random/750x750/?nature',
    width: 750,
    height: 750,
};

const ImageArray = [...Array(10)].map((_, i) => PlaceholderImage);

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Vercel Setup</h1>
            <SocialMediaPhotos photos={ImageArray} />
        </div>
    );
};

export default Home;
