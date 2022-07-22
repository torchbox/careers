import Link from 'next/link';
import React, { RefObject } from 'react';
import { useRouter } from 'next/router';
import { NavLink } from 'types/Base';
import { pluralize } from 'lib/utilities';
import styles from './MobileNav.module.scss';

type MobileNavItemProps = {
    link: NavLink;
    toggleMobileMenu: (_: void) => void;
    jobsAvailable?: number;
};

const MobileNavItem = ({
    jobsAvailable = 0,
    toggleMobileMenu,
    link,
}: MobileNavItemProps) => {
    const router = useRouter();
    const redirectOrCloseMenu = (
        event: React.MouseEvent<HTMLAnchorElement>,
    ) => {
        if (link.url === router.pathname) {
            event.preventDefault();
            toggleMobileMenu();
        }
    };
    return (
        <li
            className={`${styles.mobileNavItem} ${
                link.title === 'Jobs' &&
                jobsAvailable > 0 &&
                styles.mobileNavItemWithBadge
            }`}
        >
            {link.isCareersSiteInternalLink ? (
                <Link href={link.url} scroll={false}>
                    <a
                        className={styles.mobileNavItemLink}
                        onClick={redirectOrCloseMenu}
                    >
                        <span className={styles.mobileNavItemTitle}>
                            {link.title}
                        </span>
                        {link.title === 'Jobs' && jobsAvailable > 0 && (
                            <span
                                className={`${styles.mobileNavItemBadgeLink} ${styles.badge}`}
                                aria-label={`${jobsAvailable} ${pluralize(
                                    jobsAvailable,
                                    'job',
                                    's',
                                )} available`}
                            >
                                {jobsAvailable}
                            </span>
                        )}
                    </a>
                </Link>
            ) : (
                <a className={styles.mobileNavItemLink} href={link.url}>
                    <span className={styles.mobileNavItemTitle}>
                        {link.title}
                    </span>
                </a>
            )}
        </li>
    );
};

type MobileNavProps = {
    navMenuRef: RefObject<HTMLDivElement>;
    toggleMobileMenu: (_: void) => void;
    isOpen: boolean;
    links: NavLink[];
    jobsAvailable?: number;
};

export const MobileNav = ({
    navMenuRef,
    toggleMobileMenu,
    isOpen,
    links,
    jobsAvailable = 0,
}: MobileNavProps) => {
    const navItems = links.map((link, index) => (
        <MobileNavItem
            link={link}
            jobsAvailable={jobsAvailable}
            key={`mobile-nav-item-${index}`}
            toggleMobileMenu={toggleMobileMenu}
        />
    ));

    return (
        <div className={styles.mobileNav} ref={navMenuRef}>
            <div className={styles.mobileNavContainer}>
                <nav
                    className={`${styles.mobileNavModal} ${
                        isOpen && styles.mobileNavModalOpen
                    }`}
                    aria-label="Mobile navigation"
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
    <button
        className={`${styles.mobileMenuButton} ${
            isOpen && styles.mobileMenuActive
        }`}
        aria-label="Menu toggle"
        onClick={() => toggleMobileMenu()}
    >
        <span></span>
        <span></span>
        <span></span>
    </button>
);
