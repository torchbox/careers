import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';

import LandingPageHero from 'components/LandingPage/LandingPageHero';

const PlaceholderImage = {
    description: 'This is a placeholder',
    url: 'https://source.unsplash.com/random/900×700/?nature',
    width: 750,
    height: 750,
};

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <LandingPageHero image={PlaceholderImage}>
                {/* Todo: Replace this with a rich text field component. */}
                <p>
                    <strong>Glad you asked.</strong> We are not your average
                    digital agency...
                </p>
            </LandingPageHero>
            <h1 className={styles.title}>Vercel Setup</h1>
        </div>
    );
};

export default Home;
