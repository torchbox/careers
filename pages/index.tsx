import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';

import LandingPageCTA from 'components/LandingPageCTA';
import HomepageSubnav from 'components/HomepageSubnav';
import SocialMediaPhotos from 'components/SocialMediaPhotos';

const PlaceholderImage = {
    description: 'This is a placeholder',
    url: 'https://source.unsplash.com/random/750x750/?nature',
    width: 750,
    height: 750,
};

const ImageArray = [...Array(10)].map((_) => PlaceholderImage);

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Vercel Setup</h1>
            <HomepageSubnav title="We are on a mission" jobs={3}>
                <p>
                    For over 20 years, we’ve been devoted to delivering
                    outstanding work, while making a positive impact on society.
                </p>

                <p>
                    We create deeper meaning that joins the dots. Because our
                    work doesn’t exist in a bubble. It has the potential to
                    create more opportunities, better lives and deliver lasting
                    value, for everyone.{' '}
                </p>

                <p>
                    Here’s a taste of the incredible organisations we partner
                    with:
                </p>
            </HomepageSubnav>
            <SocialMediaPhotos photos={ImageArray} />
            <LandingPageCTA jobs={10} title="Ready to make a difference?">
                <p>
                    We’re always excited about finding new talent and meeting
                    people that are as eager as we are to drive significant
                    positive change.
                </p>
            </LandingPageCTA>
        </div>
    );
};

export default Home;
