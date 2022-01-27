import Link from 'next/link';
import { ArrowLoopRight } from './ArrowLoopRight';
import styles from '/styles/HomepageSubnav.module.scss';

type HomepageSubnavProps = {
    title: string;
    jobs?: number;
    children: React.ReactNode;
};

export const HomepageSubnav = ({
    title,
    jobs = 0,
    children,
}: HomepageSubnavProps) => (
    <div className={styles.container}>
        <ul className={styles.navigation}>
            <li className={styles.navItem}>
                <a className={styles.navLink} href="#benefits">
                    Benefits
                </a>
            </li>
            <li className={styles.navItem}>
                <a className={styles.navLink} href="#lifeAsATorchboxer">
                    Life as a Torchboxer
                </a>
            </li>
            <li className={styles.jobNavItem}>
                <Link href="/jobs">
                    <a className={styles.jobsLink}>
                        Jobs
                        {jobs > 0 ? (
                            <div className={styles.jobsBadge}>{jobs}</div>
                        ) : null}
                    </a>
                </Link>
            </li>
        </ul>
        <ArrowLoopRight className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.richText}>{children}</div>
    </div>
);

export default HomepageSubnav;