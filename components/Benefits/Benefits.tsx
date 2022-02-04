/* eslint-disable @next/next/no-img-element */
import { BenefitStarIcon } from '../Icons/BenefitStarIcon';
import styles from './Benefits.module.scss';

type BenefitsProps = {
    title: string;
    benefits: string[];
};

export const Benefits = ({ title, benefits }: BenefitsProps) => {
    const listOfBenefits = benefits.map((benefit) => (
        <li className={styles.benefit__item} key={benefit}>
            <BenefitStarIcon className={styles.benefit__icon} />
            <div className={styles.benefit__text}>{benefit}</div>
        </li>
    ));

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                <ul className={styles.benefitsList}>{listOfBenefits}</ul>
            </div>
            <div className={styles.fruit}>
                <img src="images/fruit.svg" alt="" />
            </div>
        </div>
    );
};

export default Benefits;
