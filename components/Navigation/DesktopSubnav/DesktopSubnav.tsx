import Link from 'next/link';
import { useRef } from 'react';
import { NavLink } from 'types/Base';
import styles from './DesktopSubnav.module.scss';

type DesktopSubnavProps = {
    links: NavLink[];
    jobsAvailable?: number;
    toggleMenu: () => void;
};

export const DesktopSubnav = ({
    links,
    jobsAvailable = 0,
    toggleMenu,
}: DesktopSubnavProps) => {
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
