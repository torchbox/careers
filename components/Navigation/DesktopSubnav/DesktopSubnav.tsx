import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/router';
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
    const router = useRouter();
    // Use a ref as we don't need to rerender the component on tab navigation
    const keysPressedRef = useRef<Array<string>>([]);

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
            link.title === 'Jobs' && jobsAvailable > 0
                ? styles.subnavItemWithBadge
                : '';

        // The first and last nav items need custom keyboard event handlers for tabbing into and out of the menu
        const handleVariedKeyDown =
            index === 0
                ? handleFirstItemKeyDown
                : index === links.length - 1
                ? handleLastItemKeyDown
                : handleKeyDown;

        // If the careers nav item is at the bottom of the list, you shouldn't tab out until you tab through the badge
        const handleCareersKeyDown =
            index === 0 ? handleFirstItemKeyDown : handleKeyDown;

        return (
            <li
                key={index}
                className={`${styles.subnavItem} ${careerNavItemClass}`}
            >
                {/* Render next.js links with <Link> to preload content */}
                {link.isCareersSiteInternalLink ? (
                    <>
                        <Link href={link.url} scroll={false}>
                            <a
                                onKeyUp={handleKeyUp}
                                onKeyDown={handleCareersKeyDown}
                                className={`${styles.subnavLink} ${
                                    link.url === router.pathname
                                        ? styles.subnavLinkActive
                                        : null
                                }`}
                            >
                                {link.title}
                            </a>
                        </Link>
                        {link.title === 'Jobs' && jobsAvailable > 0 && (
                            <Link href="/jobs" scroll={false}>
                                <a
                                    className={`${styles.subnavBadge} ${styles.badge}`}
                                    aria-label={`${jobsAvailable} jobs available`}
                                    tabIndex={-1}
                                >
                                    {jobsAvailable}
                                </a>
                            </Link>
                        )}
                    </>
                ) : (
                    <a
                        className={styles.subnavLink}
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
