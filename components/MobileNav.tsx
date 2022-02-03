import Link from 'next/link';
import { RefObject } from 'react';
import { NavLink } from 'types/Base';
import styles from '/styles/MobileNav.module.scss';

type MobileNavItemProps = {
    link: NavLink;
    jobsAvailable?: number;
};

const MobileNavItem = ({ jobsAvailable = 0, link }: MobileNavItemProps) => (
    <li
        className={`${styles.mobileNavItem} ${
            link.title === 'Careers' &&
            jobsAvailable > 0 &&
            styles.mobileNavItem__withBadge
        }`}
    >
        {link.isCareersSiteInternalLink ? (
            <Link href={link.url}>
                <a className={styles.mobileNavItem__link}>
                    <span className={styles.mobileNavItem__title}>
                        {link.title}
                    </span>
                    {link.title === 'Careers' && jobsAvailable > 0 && (
                        <span
                            className={`${styles.mobileNavItem__badgeLink} ${styles.badge}`}
                            aria-label={`${jobsAvailable} jobs available`}
                        >
                            {jobsAvailable}
                        </span>
                    )}
                </a>
            </Link>
        ) : (
            <a className={styles.mobileNavItem__link} href={link.url}>
                <span className={styles.mobileNavItem__title}>
                    {link.title}
                </span>
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
            <div className={styles.mobileNav__container}>
                <nav
                    className={`${styles.mobileNav__modal} ${
                        isOpen && styles.mobileNav__modalOpen
                    }`}
                    aria-label="Mobile navigation"
                    role="navigation"
                >
                    <ul className={styles.mobileNav__list}>{navItems}</ul>
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
