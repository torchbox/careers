import type { NextPage } from 'next';
import type { JobSummary } from '../lib/peopleHR';
import type { Jobs } from 'types/pages/Jobs';
import { getAllJobSummaries } from './api/jobs/summaries';
import styles from 'styles/Jobs.module.scss';
import Link from 'next/link';
import Title from 'components/Title';
import Layout from 'components/Layout';
import { getJobListingPage } from 'lib/api';
import RichText from 'components/RichText';
import { SwishButton } from 'components/Button/Button';
import WomanLeanIn from 'components/SVG/WomanLeanIn';
import { LocationIcon } from 'components/Icons/LocationIcon';
import { useState } from 'react';
import Select from 'components/Select';
import Metadata from 'components/Metadata';

type JobEntryProps = {
    job: JobSummary;
};

const JobEntry = ({ job }: JobEntryProps) => (
    <>
        <Link href={'/jobs/' + job.slug}>
            <a className={styles.jobTitle}>{job.title}</a>
        </Link>
        <p className={styles.jobDescription}>{job.description}</p>
        <div className={styles.jobMetadataItems}>
            <div className={styles.jobMetadata}>
                <LocationIcon
                    width={22}
                    height={23}
                    className={styles.jobMetadataIcon}
                />{' '}
                {job.department}
            </div>
            <div className={styles.jobMetadata}>
                <LocationIcon
                    width={22}
                    height={23}
                    className={styles.jobMetadataIcon}
                />{' '}
                <div>{job.city}</div>
            </div>
        </div>
    </>
);

type JobCTAProps = {
    title: string;
    children: React.ReactNode;
};

const JobCTA = ({ title, children }: JobCTAProps) => (
    <>
        <h2 className={styles.ctaTitle}>{title}</h2>
        <div className={styles.ctaDescription}>{children}</div>
        <SwishButton jobs={0} url="mailto:recruitment@torchbox.com">
            Send us your CV
        </SwishButton>
    </>
);

type JobsPageProps = {
    preview: boolean;
    jobs: JobSummary[];
    content: Jobs;
};

const LOCATIONS = 'Locations';
const DEPARTMENTS = 'Departments';

const Jobs: NextPage<JobsPageProps> = ({ preview, jobs, content }) => {
    const jobsAvailable = jobs && jobs.length > 0;

    const [location, setLocation] = useState(LOCATIONS);
    const [department, setDepartment] = useState(DEPARTMENTS);

    const locations = jobs.reduce(
        (acc: string[], job: JobSummary) => {
            if (!acc.includes(job.city)) {
                acc.push(job.city);
            }
            return acc;
        },
        [LOCATIONS],
    );
    const departments = jobs.reduce(
        (acc: string[], job: JobSummary) => {
            if (!acc.includes(job.department)) {
                acc.push(job.department);
            }
            return acc;
        },
        [DEPARTMENTS],
    );

    if (location !== LOCATIONS) {
        jobs = jobs.filter((job) => job.city === location);
    }
    if (department !== DEPARTMENTS) {
        jobs = jobs.filter((job) => job.department === department);
    }

    const jobEntries = jobs.map((job: JobSummary, index: number) => (
        <JobEntry job={job} key={index} />
    ));

    const resetFilterKeyDownHandler = (
        event: React.KeyboardEvent<HTMLParagraphElement>,
    ) => {
        if (!['Tab', 'Shift', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
            resetFilter();
        }
    };

    const resetFilter = () => {
        setLocation(LOCATIONS);
        setDepartment(DEPARTMENTS);
    };

    const handleLocationChange = (event: React.FormEvent) => {
        const target = event.target as HTMLSelectElement;
        setLocation(target.value);
    };

    const handleDepartmentChange = (event: React.FormEvent) => {
        const target = event.target as HTMLSelectElement;
        setDepartment(target.value);
    };

    return (
        <Layout theme="LIGHT" preview={preview} jobsAvailable={8}>
            <Metadata
                title={content.metadataTitle}
                description={content.metadataDescription}
                slug="jobs"
                image={content.metadataSocialMediaImage}
            />
            <div className={styles.pageContainer}>
                <div className={styles.contentContainer}>
                    <Title
                        firstLine={content.firstTitleLine}
                        secondLine={content.secondTitleLine}
                    />
                    <div className={styles.textContainer}>
                        <RichText theme="INDIGO" content={content.subtitle} />

                        {jobsAvailable ? (
                            <>
                                <div className={styles.filter}>
                                    <Select
                                        label="Filter by locations"
                                        options={locations}
                                        value={location}
                                        handleChange={handleLocationChange}
                                        className={styles.filterSelect}
                                    />
                                    <Select
                                        label="Filter by departments"
                                        options={departments}
                                        value={department}
                                        handleChange={handleDepartmentChange}
                                        className={styles.filterSelect}
                                    />
                                </div>
                                {jobEntries.length > 0 ? (
                                    jobEntries
                                ) : (
                                    <div className={styles.filterNoResults}>
                                        <p
                                            className={
                                                styles.filterNoResultsMessage
                                            }
                                        >
                                            No jobs found for these filter
                                            options.
                                        </p>
                                        <p
                                            className={styles.filterReset}
                                            onClick={resetFilter}
                                            onKeyDown={
                                                resetFilterKeyDownHandler
                                            }
                                            tabIndex={0}
                                        >
                                            Click here to reset the filter.
                                        </p>
                                    </div>
                                )}{' '}
                            </>
                        ) : (
                            <p className={styles.noPositionsAvailable}>
                                Unfortunately there are no positions available
                                at the moment. <br aria-hidden />
                                <br aria-hidden /> Please check back again
                                later, or consider sending a speculative
                                application below.
                            </p>
                        )}

                        <WomanLeanIn className={styles.womanSVG} />

                        <JobCTA title={content.ctaTitle}>
                            <RichText
                                theme="INDIGO"
                                content={content.ctaDescription}
                            />
                        </JobCTA>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Jobs;

export async function getStaticProps({ preview = false }) {
    try {
        const jobs = await getAllJobSummaries();
        const content = (await getJobListingPage(preview)) ?? [];
        return {
            props: { preview, jobs, content },
            revalidate: 60 * 60, // After one hour, the cache expires and the page gets rebuilt.
        };
    } catch (error) {
        // Todo: Instead of redirecting, show an appropriate error message to the user, telling them to try again later.
        return {
            notFound: true,
        };
    }
}
