import Link from 'next/link';
import { useRef } from 'react';
import { NavLink, Theme } from 'types/Base';
import styles from '/styles/DesktopNav.module.scss';

type DesktopNavItemProps = {
    link: NavLink;
};

// For rendering the three primary links of the desktop nav
// There is no support here for rendering a Careers link with a job count badge
// However you can choose pages within the careers site to link to, and have them preloaded.
const DesktopNavItem = ({ link }: DesktopNavItemProps) => (
    <li className={styles.desktopNavItem}>
        {link.isCareersSiteInternalLink ? (
            <Link href={link.url}>
                <a className={styles.desktopNavItem__link}>
                    <span className={styles.desktopNavItem__title}>
                        {link.title}
                    </span>
                </a>
            </Link>
        ) : (
            <a className={styles.desktopNavItem__link} href={link.url}>
                <span className={styles.desktopNavItem__title}>
                    {link.title}
                </span>
            </a>
        )}
    </li>
);

type SubnavProps = {
    links: NavLink[];
    jobsAvailable?: number;
    toggleMenu: () => void;
};

const Subnav = ({ links, jobsAvailable = 0, toggleMenu }: SubnavProps) => {
    // Use a ref as we don't need to rerender the component on tab navigation
    const keysPressedRef = useRef(new Array());

    const handleFirstItemKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
        if (['Tab', 'Shift'].includes(event.key)) {
            keysPressedRef.current.push(event.key);
        }

        if (event.key === 'Tab') {
            if (keysPressedRef.current.includes('Shift')) {
                toggleMenu();
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (['Tab', 'Shift'].includes(event.key)) {
            keysPressedRef.current.push(event.key);
        }
    };

    const handleLastItemKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
        if (['Tab', 'Shift'].includes(event.key)) {
            keysPressedRef.current.push(event.key);
        }

        if (event.key === 'Tab') {
            if (!keysPressedRef.current.includes('Shift')) {
                toggleMenu();
            }
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (keysPressedRef.current.includes(event.key)) {
            const index = keysPressedRef.current.indexOf(event.key);
            keysPressedRef.current.splice(index, 1);
        }
    };

    const navItems = links.map((link, index) => {
        const careerNavItemClass =
            link.title === 'Careers' && jobsAvailable > 0
                ? styles.subnav__itemWithBadge
                : '';

        // The first and last nav items need custom keyboard event handlers for tabbing into and out of the menu
        const handleVariedKeyDown =
            index === 0
                ? handleFirstItemKeyDown
                : index === links.length - 1
                ? handleLastItemKeyDown
                : handleKeyDown;

        // If the careers nav item is moved to the top of the list, you shouldn't tab out when shift tabbing the badge
        const handleBadgeKeyDown =
            index === links.length - 1 ? handleLastItemKeyDown : handleKeyDown;

        // If the careers nav item is at the bottom of the list, you shouldn't tab out until you tab through the badge
        const handleCareersKeyDown =
            index === 0 ? handleFirstItemKeyDown : handleKeyDown;

        return (
            <li
                key={index}
                className={`${styles.subnav__item} ${careerNavItemClass}`}
            >
                {/* Render next.js links with <Link> to preload content */}
                {link.isCareersSiteInternalLink ? (
                    <>
                        <Link href={link.url}>
                            <a
                                onKeyUp={handleKeyUp}
                                onKeyDown={handleCareersKeyDown}
                                className={styles.subnav__link}
                            >
                                {link.title}
                            </a>
                        </Link>
                        {link.title === 'Careers' && jobsAvailable > 0 && (
                            <Link href="/jobs/">
                                <a
                                    onKeyUp={handleKeyUp}
                                    onKeyDown={handleBadgeKeyDown}
                                    className={`${styles.subnav__badge} ${styles.badge}`}
                                    aria-label={`${jobsAvailable} jobs available`}
                                >
                                    {jobsAvailable}
                                </a>
                            </Link>
                        )}
                    </>
                ) : (
                    <a
                        className={styles.subnav__link}
                        href={link.url}
                        onKeyUp={handleKeyUp}
                        onKeyDown={handleVariedKeyDown}
                    >
                        {link.title}
                    </a>
                )}
            </li>
        );
    });

    return <ul className={styles.subnav}>{navItems}</ul>;
};

type DesktopNavProps = {
    isOpen: boolean;
    toggleMenu: () => void;
    links: NavLink[];
    jobsAvailable?: number;
};

export const DesktopNav = ({
    isOpen,
    toggleMenu,
    links,
    jobsAvailable = 0,
}: DesktopNavProps) => {
    const navItems = links
        .slice(0, 3)
        .map((link, index) => <DesktopNavItem link={link} key={index} />);

    const modalIsOpenClass = isOpen ? styles.desktopNav__modalOpen : '';

    return (
        <div className={styles.desktopNav}>
            <div className={styles.desktopNav__container}>
                <nav
                    className={`${styles.desktopNav__modal} ${modalIsOpenClass}`}
                    aria-label="Desktop navigation"
                    role="navigation"
                >
                    <ul className={styles.desktopNav__list}>
                        {navItems}
                        <li className={styles.desktopNav__moreItem}>
                            <button
                                className={styles.desktopNav__moreButton}
                                onClick={() => toggleMenu()}
                            >
                                More
                                <span className={styles.desktopNav__dots} />
                            </button>
                            {isOpen && (
                                <>
                                    <Subnav
                                        jobsAvailable={jobsAvailable}
                                        links={links.slice(3, links.length)}
                                        toggleMenu={toggleMenu}
                                    />
                                    <div
                                        className={styles.backgroundOverlay}
                                        onClick={() => toggleMenu()}
                                    />
                                </>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
