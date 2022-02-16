import type { NextPage } from 'next';
import type { JobPost } from 'lib/peopleHR';
import styles from 'styles/Jobs.module.scss';
import { concatenateAPIURL } from 'lib/peopleHR';

const JobPosting: NextPage<{ job: JobPost }> = ({ job }) => {
    return (
        <div className={styles.container}>
            <h1>{job.title}</h1>
            <div
                dangerouslySetInnerHTML={{
                    __html: job.description,
                }}
            ></div>
        </div>
    );
};

export default JobPosting;

const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': process.env.PEOPLEHR_AUTH_TOKEN as string,
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const apiURL = concatenateAPIURL('/api/jobs/' + params.slug);
    console.log('Get job - ', apiURL);
    try {
        const job = await fetch(apiURL, { headers: requestHeaders }).then(
            (res) => res.json(),
        );
        return {
            props: { job },
            revalidate: 60 * 60, // After one hour, the cache expires and the page gets rebuilt.
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export async function getStaticPaths() {
    const apiURL = concatenateAPIURL('/api/jobs/slugs');
    console.log('Get static paths - ', apiURL);
    const allJobSlugs = await fetch(apiURL, { headers: requestHeaders }).then(
        (res) => res.json(),
    );

    if (allJobSlugs) {
        return {
            paths: allJobSlugs.map((slug: string) => `/jobs/${slug}`),
            fallback: 'blocking',
        };
    }

    // If we can't find any job postings from peopleHR, don't create posting pages
    // Use fallback blocking so ISR gets triggered in the future and the page is generated when PeopleHR goes live.
    return {
        paths: [],
        fallback: 'blocking',
    };
}
