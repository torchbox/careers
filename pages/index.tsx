import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';

import LifeAsATorchboxer from 'components/LifeAsATorchboxer';
const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Vercel Setup</h1>
            <LifeAsATorchboxer>
                <p>
                    From Bristol to Texas, we go the extra mile (or 4,813).
                    We’re remote-first, but always connected, championing unique
                    people in unique places. <br />
                    <br />
                    Find out more about who we are, how we work, what we believe
                    in and where we’re heading.
                </p>
            </LifeAsATorchboxer>
        </div>
    );
};

export default Home;
