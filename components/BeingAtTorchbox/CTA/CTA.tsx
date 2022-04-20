import { SwishButton } from 'components/Button';
import urls from 'lib/urls';
import styles from './CTA.module.scss';

type CTAProps = {
    title: string;
    jobs: number;
    children: React.ReactNode;
};

export const CTA = ({ title, jobs, children }: CTAProps) => (
    <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.richText}>{children}</div>
        <SwishButton className={styles.jobsButton} url={urls.jobs} jobs={jobs}>
            See all our available jobs
        </SwishButton>
        <SwishButton className={styles.academyButton} url={urls.academy}>
            Discover the Torchbox Academy
        </SwishButton>
    </div>
);

export default CTA;
