import Link from 'next/link';
import { NavLink } from 'types/Base';
import DesktopSubnav from '../DesktopSubnav';
import styles from './DesktopNav.module.scss';

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
                <a className={styles.desktopNavItemLink}>
                    <span className={styles.desktopNavItemTitle}>
                        {link.title}
                    </span>
                </a>
            </Link>
        ) : (
            <a className={styles.desktopNavItemLink} href={link.url}>
                <span className={styles.desktopNavItemTitle}>{link.title}</span>
            </a>
        )}
    </li>
);

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

    return (
        <div className={styles.desktopNav}>
            <div className={styles.desktopNavontainer}>
                <nav
                    className={`${styles.desktopNavModal} ${
                        isOpen ? styles.desktopNavModalOpen : ''
                    }`}
                    aria-label="Desktop navigation"
                    role="navigation"
                >
                    <ul className={styles.desktopNavList}>
                        {navItems}
                        <li className={styles.desktopNavMoreItem}>
                            <button
                                className={styles.desktopNavMoreButton}
                                onClick={() => toggleMenu()}
                            >
                                More
                                <span className={styles.desktopNavDots} />
                            </button>
                            {isOpen && (
                                <>
                                    <DesktopSubnav
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