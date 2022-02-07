import type { NextPage } from 'next';
import type { JobPost } from 'lib/peopleHR';
import styles from 'styles/Jobs.module.scss';

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
    const apiURL =
        process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL + '/api/jobs/' + params.slug;

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
    const apiURL =
        process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL + '/api/jobs/slugs';
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
