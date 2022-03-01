import FruitBowl from 'components/SVG/FruitBowl';
import { useScreen } from 'hooks/useScreen';
import { useEffect, useState } from 'react';
import { BenefitStarIcon } from '../Icons/BenefitStarIcon';
import styles from './Benefits.module.scss';

type BenefitsProps = {
    title: string;
    benefits: string[];
};

export const Benefits = ({ title, benefits }: BenefitsProps) => {
    const [bowlSize, setBowlSize] = useState(208);
    const screen = useScreen();

    useEffect(() => {
        if (screen.includes('medium')) setBowlSize(238);
        if (screen.includes('large')) setBowlSize(285);
    }, [screen]);

    const listOfBenefits = benefits.map((benefit) => (
        <li className={styles.benefitItem} key={benefit}>
            <BenefitStarIcon className={styles.benefitIcon} />
            <div className={styles.benefitText}>{benefit}</div>
        </li>
    ));

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                <ul className={styles.benefitsList}>{listOfBenefits}</ul>
            </div>
            <div className={styles.fruit}>
                <FruitBowl size={bowlSize} />
            </div>
        </div>
    );
};

export default Benefits;
