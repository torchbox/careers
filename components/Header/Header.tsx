import { useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TorchboxLogo } from 'components/Icons/TorchboxLogo';
import { MobileMenuButton, MobileNav } from 'components/Navigation/MobileNav';
import DesktopNav from 'components/Navigation/DesktopNav';
import urls from 'lib/urls';
import styles from './Header.module.scss';

const NAVIGATION_LINKS = [
    {
        title: 'Digital products',
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
    {
        title: 'AI + Innovation',
        url: 'https://ai.torchbox.com/',
        isExternalLink: true,
    },
    { title: 'Jobs', url: urls.jobs, isCareersSiteInternalLink: true },
    {
        title: 'Being at Torchbox',
        url: urls.beingAtTorchbox,
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
        <>
            <div className={styles.container}>
                <div className={styles.navigationContainer}>
                    <div className={styles.logo}>
                        <a
                            className={styles.logoLink}
                            href="https://torchbox.com"
                            aria-label="Home"
                        >
                            <TorchboxLogo />
                        </a>
                    </div>
                    <DesktopNav
                        isOpen={isOpen}
                        links={NAVIGATION_LINKS}
                        toggleMenu={toggleMobileMenu}
                        jobsAvailable={jobsAvailable}
                    />
                </div>
            </div>
            <MobileNav
                isOpen={isOpen}
                toggleMobileMenu={toggleMobileMenu}
                links={NAVIGATION_LINKS}
                navMenuRef={mobileNavRef}
                jobsAvailable={jobsAvailable}
            />
            <MobileMenuButton
                isOpen={isOpen}
                toggleMobileMenu={toggleMobileMenu}
            />
        </>
    );
};

export default Header;
