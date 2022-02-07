import Button from '../../Button/';
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
        <Button className={styles.button} url="/jobs/" jobs={jobs}>
            See all our available jobs
        </Button>
    </div>
);

export default CTA;
