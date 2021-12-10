import type { NextPage } from "next";
import styles from "styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Why Torchbox?</h1>
            <button
                type="button"
                onClick={() => {
                    throw new Error("Sentry Frontend Error");
                }}
            >
                Throw error
            </button>
        </div>
    );
};

export default Home;
