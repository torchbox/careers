import Link from 'next/link';
import { RefObject } from 'react';
import { NavLink } from 'types/Base';
import styles from './MobileNav.module.scss';

type MobileNavItemProps = {
    link: NavLink;
    jobsAvailable?: number;
};

const MobileNavItem = ({ jobsAvailable = 0, link }: MobileNavItemProps) => (
    <li
        className={`${styles.mobileNavItem} ${
            link.title === 'Jobs' &&
            jobsAvailable > 0 &&
            styles.mobileNavItemWithBadge
        }`}
    >
        {link.isCareersSiteInternalLink ? (
            <Link href={link.url} scroll={false}>
                <a className={styles.mobileNavItemLink}>
                    <span className={styles.mobileNavItemTitle}>
                        {link.title}
                    </span>
                    {link.title === 'Jobs' && jobsAvailable > 0 && (
                        <span
                            className={`${styles.mobileNavItemBadgeLink} ${styles.badge}`}
                            aria-label={`${jobsAvailable} jobs available`}
                        >
                            {jobsAvailable}
                        </span>
                    )}
                </a>
            </Link>
        ) : (
            <a className={styles.mobileNavItemLink} href={link.url}>
                <span className={styles.mobileNavItemTitle}>{link.title}</span>
            </a>
        )}
    </li>
);

type MobileNavProps = {
    navMenuRef: RefObject<HTMLDivElement>;
    isOpen: boolean;
    links: NavLink[];
    jobsAvailable?: number;
};

export const MobileNav = ({
    navMenuRef,
    isOpen,
    links,
    jobsAvailable = 0,
}: MobileNavProps) => {
    const navItems = links.map((link, index) => (
        <MobileNavItem link={link} jobsAvailable={jobsAvailable} key={index} />
    ));

    return (
        <div className={styles.mobileNav} ref={navMenuRef}>
            <div className={styles.mobileNavContainer}>
                <nav
                    className={`${styles.mobileNavModal} ${
                        isOpen && styles.mobileNavModalOpen
                    }`}
                    aria-label="Mobile navigation"
                    role="navigation"
                >
                    <ul className={styles.mobileNavList}>{navItems}</ul>
                </nav>
            </div>
        </div>
    );
};

type MobileMenuButtonProps = {
    isOpen: boolean;
    toggleMobileMenu: (_: void) => void;
};

export const MobileMenuButton = ({
    isOpen,
    toggleMobileMenu,
}: MobileMenuButtonProps) => (
    <a
        className={`${styles.mobileMenuButton} ${
            isOpen && styles.mobileMenuActive
        }`}
        aria-label="Menu toggle"
        onClick={() => toggleMobileMenu()}
    >
        <span></span>
        <span></span>
        <span></span>
    </a>
);
