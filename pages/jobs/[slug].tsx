import type { NextPage } from 'next';
import { getJobPost, getAllJobSlugs } from 'lib/peopleHR';
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

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const job = await getJobPost(params.slug);

    if (!job)
        return {
            notFound: true,
        };

    return {
        props: { job },
        revalidate: 60 * 60, //After one hour, the cache expires and the page gets rebuilt.
    };
}

export async function getStaticPaths() {
    const allJobSlugs = await getAllJobSlugs();
    if (allJobSlugs) {
        return {
            paths: allJobSlugs.map((slug) => `/jobs/${slug}`),
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
