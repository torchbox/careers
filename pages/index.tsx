import type { NextPage } from "next";
import ChevronLink from "components/ChevronLink/ChevronLink";
import styles from "styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Let&apos;s work <span>together</span>.
            </h1>
            <p className={styles.intro}>
                Use your skills to Without midst in may. Yielding, over
                gathering midst let divided open the given green god years
                subdue you&apos;re you us of thing saw had is air so, also.
                Second kind fruitful evening.
            </p>

            <ChevronLink href="/careers/jobs">View available jobs</ChevronLink>
        </div>
    );
};

export default Home;
