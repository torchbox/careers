import Link from 'next/link';
import { ArrowLoopRight } from '../../SVG/ArrowLoop/ArrowLoopRight';
import styles from './PageNav.module.scss';

type PageNavProps = {
    title: string;
    jobs?: number;
    children: React.ReactNode;
};

export const PageNav = ({ title, jobs = 0, children }: PageNavProps) => (
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

export default PageNav;
