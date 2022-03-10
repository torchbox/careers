import FruitBowl from 'components/SVG/FruitBowl';
import { useScreen } from 'hooks/useScreen';
import { BenefitStarIcon } from 'components/Icons/BenefitStarIcon';
import styles from './Benefits.module.scss';

type BenefitsProps = {
    title: string;
    benefits: string[];
};

export const Benefits = ({ title, benefits }: BenefitsProps) => {
    const listOfBenefits = benefits.map((benefit) => (
        <li className={styles.benefitItem} key={benefit}>
            <BenefitStarIcon className={styles.benefitIcon} />
            <div className={styles.benefitText}>{benefit}</div>
        </li>
    ));

    const screen = useScreen();
    let bowlSize = 208;
    if (screen.includes('medium')) bowlSize = 238;
    if (screen.includes('large')) bowlSize = 285;

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
