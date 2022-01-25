import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';
import ComeWorkForYou from 'components/ComeWorkForYou';

const PlaceholderImage = {
    description: 'This is a placeholder',
    url: 'https://source.unsplash.com/random/1600×900/?nature',
    width: 1600,
    height: 900,
};

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Vercel Setup</h1>
            <ComeWorkForYou image={PlaceholderImage}>
                <strong>
                    No parent company, no shareholders, just a team of equal
                    owners.
                </strong>
                <br />
                <br />
                <p>
                    100% of our business belongs to our Employee Ownership Trust
                    (EOT). Everyone is included, everyone is updated and
                    everyone belongs.
                </p>
            </ComeWorkForYou>
        </div>
    );
};

export default Home;
