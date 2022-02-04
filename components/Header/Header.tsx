import { useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TorchboxLogo } from '../Icons/TorchboxLogo';
import styles from './Header.module.scss';

import { MobileMenuButton, MobileNav } from '../Navigation/MobileNav';
import DesktopNav from '../Navigation/DesktopNav';

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
    { title: 'Careers', url: '/careers/', isCareersSiteInternalLink: true },
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
            <a className={styles.torchboxLogo} href="https://torchbox.com">
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