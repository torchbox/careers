import type { NextPage } from "next";
import styles from "styles/Home.module.scss";
import CTA from "components/CTA/CTA";

const Home: NextPage = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Why Torchbox</h1>
            </div>
            <CTA
                title="Meet the team"
                text="Get to know the people you’ll be working with"
                href="/team"
            />
        </>
    );
};

export default Home;
