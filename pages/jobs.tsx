import { useState } from 'react';
import Link from 'next/link';
import { getAllJobSummaries } from 'pages/api/jobs/summaries';
import { getJobListingPage } from 'lib/api';
import type { NextPage } from 'next';
import type { Jobs } from 'types/pages/Jobs';
import Title from 'components/Title';
import Layout from 'components/Layout';
import RichText from 'components/RichText';
import { SwishButton } from 'components/Button/Button';
import WomanLeanIn from 'components/SVG/WomanLeanIn';
import Select from 'components/Select';
import Metadata from 'components/Metadata';
import urls from 'lib/urls';
import type { JobSummary } from '../lib/peopleHR';
import styles from '../styles/pages/Jobs.module.scss';

type JobEntryProps = {
    job: JobSummary;
};

const JobEntry = ({ job }: JobEntryProps) => (
    <Link href={urls.jobs + job.slug}>
        <a className={styles.jobCard}>
            <p className={styles.jobTitle}>{job.title}</p>
            <p className={styles.jobDescription}>{job.description}</p>
            <p className={styles.jobDepartment}>{job.department}</p>
            <p className={styles.jobLocation}>{job.city}</p>
        </a>
    </Link>
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

    const resetFilter = () => {
        setLocation(LOCATIONS);
        setDepartment(DEPARTMENTS);
    };

    const resetFilterKeyDownHandler = (
        event: React.KeyboardEvent<HTMLButtonElement>,
    ) => {
        if (!['Tab', 'Shift', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
            resetFilter();
        }
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
        <Layout theme="LIGHT" preview={preview} jobsAvailable={jobs.length}>
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
                        {content.subtitle && (
                            <RichText
                                theme="INDIGO"
                                content={content.subtitle}
                            />
                        )}

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
                                        <button
                                            className={styles.filterReset}
                                            onClick={resetFilter}
                                            onKeyDown={
                                                resetFilterKeyDownHandler
                                            }
                                            tabIndex={0}
                                        >
                                            Click here to reset the filter.
                                        </button>
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
        return {
            notFound: true,
        };
    }
}
