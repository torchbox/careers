import type { NextPage } from "next";
import ClientBlock from "components/ClientBlock/ClientBlock";
import { clientBlockData } from "data/client-block";
import styles from "styles/Home.module.scss";

const Home: NextPage = () => {
    console.log(clientBlockData);
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Why Torchbox</h1>
            </div>
            <ClientBlock
                title={clientBlockData.title}
                text={clientBlockData.text}
                logos={clientBlockData.logos}
            />
        </>
    );
};

export default Home;
