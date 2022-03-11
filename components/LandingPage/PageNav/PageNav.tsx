/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import Link from 'next/link';
import { ArrowLoopRight } from '../../SVG/ArrowLoop/ArrowLoopRight';
import styles from './PageNav.module.scss';

type PageNavProps = {
    title: string;
    jobs?: number;
    children: React.ReactNode;
};

const AnchorLinks = ({ jobs = 0 }: { jobs: number }) => {
    const smoothScrollToElement = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    const handleBenefitsLinkKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
        if (event.key === 'Enter') {
            smoothScrollToElement('#benefits');
        }
    };

    const handleLifeAtTorchboxLinkKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
        if (event.key === 'Enter') {
            smoothScrollToElement('#lifeAsATorchboxer');
        }
    };

    return (
        <ul className={styles.navigation}>
            <li className={styles.navItem}>
                <a
                    className={styles.navLink}
                    onClick={() => smoothScrollToElement('#benefits')}
                    onKeyDown={handleBenefitsLinkKeyDown}
                    tabIndex={0}
                >
                    Benefits
                </a>
            </li>
            <li className={styles.navItem}>
                <a
                    className={styles.navLink}
                    onClick={() => smoothScrollToElement('#lifeAsATorchboxer')}
                    onKeyDown={handleLifeAtTorchboxLinkKeyDown}
                    tabIndex={0}
                >
                    Life as a Torchboxer
                </a>
            </li>
            <li className={styles.jobNavItem}>
                <Link href="/jobs" scroll={false}>
                    <a className={styles.jobsLink}>
                        Jobs
                        {jobs > 0 ? (
                            <div className={styles.jobsBadge}>{jobs}</div>
                        ) : null}
                    </a>
                </Link>
            </li>
        </ul>
    );
};

export const PageNav = ({ title, jobs = 0, children }: PageNavProps) => {
    return (
        <div className={styles.container}>
            <ArrowLoopRight className={styles.image} />
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.richText}>{children}</div>
        </div>
    );
};
export default PageNav;
