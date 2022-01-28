import { SwishButton } from './Button';
import styles from '/styles/LandingPageCTA.module.scss';

type LandingPageCTAProps = {
    title: string;
    jobs: number;
    children: React.ReactNode;
};

export const LandingPageCTA = ({
    title,
    jobs,
    children,
}: LandingPageCTAProps) => (
    <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.richText}>{children}</div>
        <SwishButton className={styles.button} url="/jobs/" jobs={jobs}>
            See all our available jobs
        </SwishButton>
    </div>
);

export default LandingPageCTA;
