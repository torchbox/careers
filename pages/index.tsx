import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';

import Benefits from 'components/Benefits';

const ExampleBenefits = [
    'Performance and ownership bonus',
    '25 days holiday',
    'Personal development budget',
    'Private health cover',
    'Flexible hours',
    'Regular socials - online and in-person',
    'Ethical pension',
    'Fruit!',
];

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Vercel Setup</h1>
            <Benefits
                title="Real benefits in touch with real life"
                benefits={ExampleBenefits}
            />
        </div>
    );
};

export default Home;
