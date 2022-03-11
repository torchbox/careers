import Button from 'components/Button';
import { LocationIcon } from 'components/Icons/LocationIcon';
import ShareLink from 'components/ShareLink';
import styles from './JobListingHero.module.scss';

type JobListingHeroProps = {
    title: string;
    location: string;
    salary: string;
    applicationLink: string;
    description: string;
    sharingURL: string;
};

export const JobListingHero = ({
    title,
    location,
    salary,
    applicationLink,
    description,
    sharingURL,
}: JobListingHeroProps) => (
    <div className={styles.contentContainer}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.textContainer}>
            <ul className={styles.summary}>
                <li className={styles.summaryItem}>
                    <LocationIcon
                        width={22}
                        height={23}
                        className={styles.summaryIcon}
                    />
                    <p className={styles.summaryText}>{location}</p>
                </li>
                <li className={styles.summaryItem}>
                    <LocationIcon
                        width={22}
                        height={23}
                        className={styles.summaryIcon}
                    />
                    <p className={styles.summaryText}>{salary}</p>
                </li>
            </ul>
            <div className={styles.ctaContainer}>
                <Button
                    url={applicationLink}
                    internal={false}
                    className={styles.button}
                    theme="CORAL"
                >
                    Apply for this job
                </Button>
                <ShareLink
                    url={sharingURL}
                    title={title + ' | Torchbox Careers'}
                    description={description}
                />
            </div>
        </div>
    </div>
);

export default JobListingHero;
