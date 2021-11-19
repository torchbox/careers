import type { NextPage } from "next";
import styles from "styles/Home.module.scss";
import BenefitsList from "components/BenefitsList/BenefitsList";
import { stubBenefitsData } from "data/benefits-list";

const Home: NextPage = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Why Torchbox</h1>
            </div>
            <BenefitsList
                heading="Perks of working with us"
                benefits={stubBenefitsData}
            />
        </>
    );
};

export default Home;
