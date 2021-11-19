import type { NextPage } from "next";
import ImageGrid from "components/ImageGrid/ImageGrid";
import styles from "styles/Home.module.scss";
import { imageGridData } from "data/image-grid";

const Home: NextPage = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Why Torchbox</h1>
            </div>

            <ImageGrid images={imageGridData} />
        </>
    );
};

export default Home;
