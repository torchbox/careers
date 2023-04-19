import Button from 'components/Button';
import ShareLink from 'components/ShareLink';
import styles from './JobListingHero.module.scss';

type JobListingHeroProps = {
    title: string;
    department: string;
    location: string;
    salary?: string;
    applicationLink: string;
    description: string;
    sharingURL: string;
};

export const JobListingHero = ({
    title,
    department,
    location,
    salary,
    applicationLink,
    description,
    sharingURL,
}: JobListingHeroProps) => (
    <div className={styles.contentContainer}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.textContainer}>
            {salary && <p className={styles.salary}>{salary}</p>}
            <p className={styles.department}>{department}</p>
            <p className={styles.location}>{location}</p>

            <div className={styles.ctaContainer}>
                <Button
                    url={applicationLink}
                    internal={false}
                    className={styles.button}
                    theme="INDIGO"
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
