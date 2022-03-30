import { SmallArrowLoopRight } from 'components/SVG/ArrowLoop/SmallArrowLoopRight';
import styles from './ApplicationProcess.module.scss';

type ApplicationProcessProps = {
    title: string;
    stepOne: string;
    stepTwo: string;
    stepThree: string;
    children: React.ReactNode;
};

export const ApplicationProcess = ({
    title,
    stepOne,
    stepTwo,
    stepThree,
    children,
}: ApplicationProcessProps) => (
    <div className={styles.container}>
        <div className={styles.introductionContainer}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.description}>{children}</div>
            </div>
            <SmallArrowLoopRight className={styles.arrow} />
        </div>
        <ul className={styles.list}>
            <li className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <p className={styles.stepText}>{stepOne}</p>
            </li>
            <li className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <p className={styles.stepText}>{stepTwo}</p>
            </li>
            <li className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <p className={styles.stepText}>{stepThree}</p>
            </li>
        </ul>
    </div>
);
