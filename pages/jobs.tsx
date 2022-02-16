import type { NextPage } from 'next';
import type { JobSummary } from '../lib/peopleHR';
import { getAllJobSummaries } from './api/jobs/summaries';
import { concatenateAPIURL } from '../lib/peopleHR';
import styles from 'styles/Jobs.module.scss';
import Link from 'next/link';

const Jobs: NextPage<{ jobs: JobSummary[] }> = ({ jobs }) => {
    return (
        <div className={styles.container}>
            {jobs.map((job: JobSummary, index: number) => (
                <div key={index}>
                    <p>
                        <b>{job.title}</b>
                    </p>
                    <p>{job.description}</p>
                    <Link href={'/jobs/' + job.slug}>
                        <a>Click here to read more.</a>
                    </Link>
                    <hr className={styles.divider} />
                </div>
            ))}
        </div>
    );
};

export default Jobs;

export async function getStaticProps() {
    /*
    const apiURL = concatenateAPIURL('/api/jobs/summaries');

    const requestHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': process.env.PEOPLEHR_AUTH_TOKEN as string,
    };
    */

    try {
        const jobs = await getAllJobSummaries();
        return {
            props: { jobs },
            revalidate: 60 * 60, // After one hour, the cache expires and the page gets rebuilt.
        };
    } catch (error) {
        // Todo: Instead of redirecting, show an appropriate error message to the user, telling them to try again later.
        return {
            notFound: true,
        };
    }
}
