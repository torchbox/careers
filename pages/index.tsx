import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';

import LandingPageCTA from 'components/LandingPageCTA';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Vercel Setup</h1>
            <LandingPageCTA jobs={4} title="Ready to make a difference?">
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
