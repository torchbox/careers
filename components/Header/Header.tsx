import { useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TorchboxLogo } from 'components/Icons/TorchboxLogo';
import { MobileMenuButton, MobileNav } from 'components/Navigation/MobileNav';
import DesktopNav from 'components/Navigation/DesktopNav';
import styles from './Header.module.scss';

const NAVIGATION_LINKS = [
    {
        title: 'Design + build products',
        url: 'https://torchbox.com/digital-products/',
    },
    {
        title: 'Wagtail services',
        url: 'https://torchbox.com/wagtail-cms/',
    },
    {
        title: 'Digital marketing',
        url: 'https://torchbox.com/digital-marketing/',
    },
    { title: 'Jobs', url: '/jobs/', isCareersSiteInternalLink: true },
    {
        title: 'Being at Torchbox',
        url: '/',
        isCareersSiteInternalLink: true,
    },
    {
        title: 'Life at Torchbox',
        url: '/life-at-torchbox/',
        isCareersSiteInternalLink: true,
    },
    {
        title: 'Blog',
        url: 'https://torchbox.com/blog/',
    },
    {
        title: 'Events',
        url: 'https://torchbox.com/events/',
    },
    {
        title: 'Team',
        url: 'https://torchbox.com/team/',
    },
];

type HeaderProps = {
    jobsAvailable?: number;
};

export const Header = ({ jobsAvailable = 0 }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const mobileNavRef = useRef<HTMLDivElement>(null);

    const toggleMobileMenu = () => {
        const mobileNav = mobileNavRef.current as HTMLElement;

        if (isOpen) {
            setIsOpen(false);
            enableBodyScroll(mobileNav);
        } else {
            setIsOpen(true);
            disableBodyScroll(mobileNav);
        }
    };

    return (
        <div className={styles.container}>
            <a
                className={styles.torchboxLogo}
                href="https://torchbox.com"
                aria-label="Home"
            >
                <TorchboxLogo />
            </a>
            <MobileMenuButton
                isOpen={isOpen}
                toggleMobileMenu={toggleMobileMenu}
            />
            <MobileNav
                isOpen={isOpen}
                links={NAVIGATION_LINKS}
                navMenuRef={mobileNavRef}
                jobsAvailable={jobsAvailable}
            />
            <DesktopNav
                isOpen={isOpen}
                links={NAVIGATION_LINKS}
                toggleMenu={toggleMobileMenu}
                jobsAvailable={jobsAvailable}
            />
        </div>
    );
};

export default Header;
