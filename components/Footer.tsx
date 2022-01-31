import { Image } from './Image';
import { LocationIcon } from './Icons/LocationIcon';
import { LinkedInIcon } from './Icons/LinkedInIcon';
import { TwitterIcon } from './Icons/TwitterIcon';
import { InstagramIcon } from './Icons/InstagramIcon';
import styles from '/styles/Footer.module.scss';

const LOCATION_DATA = [
    {
        title: 'Oxfordshire',
        address:
            'The Top Floor, Southill Barn, Cornbury Park, Charlbury, Oxon, OX7 3EW, UK',
    },
    {
        title: 'Bristol',
        address: '3rd Floor, 15 Colston Street, Bristol, BS1 5AP, UK',
    },
    {
        title: 'Manilla',
        address:
            'Unit 214 Commercenter Alabang, Commerce Avenue, Filinvest Corporate City, Muntinlupa, Philippines 1780',
    },
    {
        title: 'Remote',
        address: 'Yep, most of us work from our spare rooms',
    },
];

const OurLocations = () => {
    const locations = LOCATION_DATA.map((location) => (
        <li key={location.title} className={styles.ourLocationsLocation}>
            <LocationIcon className={styles.ourLocationsIcon} />
            <div className={styles.ourLocationsInformation}>
                <p className={styles.ourLocationsTitle}>{location.title}</p>
                <p className={styles.ourLocationsAddress}>{location.address}</p>
            </div>
        </li>
    ));

    return (
        <div className={styles.ourLocations}>
            <h3 className={styles.ourLocationsHeading}>Our Locations</h3>
            <ul className={styles.ourLocationsList}>{locations}</ul>
        </div>
    );
};

const GetInTouch = () => (
    <div className={styles.getInTouch}>
        <h3 className={styles.getInTouchTitle}>
            Get in touch about your project
        </h3>
        <p className={styles.getInTouchDescription}>
            If you got a brief, we’d love to see it. If you haven’t, talk to us
            before you write it, we can help.
        </p>
        <div className={styles.getInTouchContact}>
            <Image
                className={styles.getInTouchImage}
                src="/images/will.jpeg"
                alt="Will Heinemann, New Business Director at Torchbox"
            />
            <div className={styles.getInTouchContactInformation}>
                <a
                    className={styles.getInTouchEmailLink}
                    href="mailto:willh@torchbox.com"
                    aria-label="Will's email address"
                >
                    willh@torchbox.com
                </a>
                <a
                    className={styles.getInTouchPhoneLink}
                    href="tel://+447545468483"
                    aria-label="Will's phone number"
                >
                    +447545468483
                </a>
            </div>
        </div>
    </div>
);

const Appendix = () => (
    <div className={styles.appendix}>
        <p className={styles.appendixCopyrightNotice}>© Torchbox 2022</p>
        <a className={styles.appendixLink} href="https://torchbox.com/privacy/">
            Privacy
        </a>
        <a className={styles.appendixLink} href="https://torchbox.com/cookies/">
            Cookies
        </a>
    </div>
);

const SocialMediaIcons = () => (
    <ul className={styles.socialMediaIcons}>
        <li className={styles.socialMediaIconsIcon}>
            <a
                aria-label="Follow us on Twitter"
                href="https://twitter.com/torchbox"
            >
                <TwitterIcon />
            </a>
        </li>
        <li className={styles.socialMediaIconsIcon}>
            <a
                aria-label="Connect with us on LinkedIn"
                href="https://www.linkedin.com/company/torchbox"
            >
                <LinkedInIcon />
            </a>
        </li>
        <li className={styles.socialMediaIconsIcon}>
            <a
                aria-label="Follow us on Instagram"
                href="https://www.instagram.com/torchboxltd/"
            >
                <InstagramIcon />
            </a>
        </li>
    </ul>
);

export const Footer = () => (
    <div className={styles.container}>
        <div className={styles.primaryContent}>
            <GetInTouch />
            <OurLocations />
        </div>
        <div className={styles.secondaryContent}>
            <Appendix />
            <SocialMediaIcons />
        </div>
    </div>
);

export default Footer;
