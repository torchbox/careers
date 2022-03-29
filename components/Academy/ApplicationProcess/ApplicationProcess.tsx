import { SmallArrowLoopRight } from 'components/SVG/ArrowLoop/SmallArrowLoopRight';
import styles from './ApplicationProcess.module.scss';

type ApplicationProcessProps = {
    title: string;
    children: React.ReactNode;
};

export const ApplicationProcess = ({
    title,
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
                <p className={styles.stepText}>Apply for a role above</p>
            </li>
            <li className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <p className={styles.stepText}>We&apos;ll then set up a call</p>
            </li>
            <li className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <p className={styles.stepText}>
                    If successful, we&apos;ll invite you to one of our Academy
                    Days
                </p>
            </li>
        </ul>
    </div>
);
