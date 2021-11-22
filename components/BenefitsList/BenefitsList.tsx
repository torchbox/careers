import type { NextPage } from "next";
import Benefit from "components/Benefit/Benefit";
import styles from "styles/BenefitsList.module.scss";

interface Benefit {
    text: string;
}

type BenefitsListProps = {
    heading: string;
    benefits: Benefit[];
};

const BenefitsList: NextPage<BenefitsListProps> = ({ heading, benefits }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>{heading}</h3>
            <ul className={styles.benefits}>
                {benefits.map((benefit) => (
                    <Benefit key={benefit.text} text={benefit.text} />
                ))}
            </ul>
        </div>
    );
};

export default BenefitsList;
