import type { NextPage } from "next";
import styles from "styles/Home.module.scss";
import BenefitsList from "components/BenefitsList/BenefitsList";

const stubBenefitsData = [
    {
        text: "The opportunity to be a co-owner of Torchbox, shaping and sharing in our success",
    },
    {
        text: "Private health scheme and access to mental health support",
    },
    {
        text: "Ethical pension scheme, with a 5% contribution from Torchbox",
    },
    {
        text: "25 days holiday, plus public holidays",
    },
    {
        text: "etc - base on Benefits content type",
    },
];

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
