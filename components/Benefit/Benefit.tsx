import type { NextPage } from "next";
import styles from "styles/Benefit.module.scss";

type BenefitProps = {
    text: string;
};

const Benefit: NextPage<BenefitProps> = ({ text }) => {
    return (
        <li className={styles.benefit}>
            <div className={styles.benefitIcon} />
            <p className={styles.benefitText}>{text}</p>
        </li>
    );
};

export default Benefit;
