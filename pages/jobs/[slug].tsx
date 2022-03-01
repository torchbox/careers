import type { NextPage } from 'next';
import type { JobPost } from 'lib/peopleHR';
import styles from 'styles/Jobs.module.scss';
import { getAllJobSlugs } from 'pages/api/jobs/slugs';
import { getJobPost } from 'pages/api/jobs/[slug]';
import { ApplyButton } from 'components/Button';

const JobPosting: NextPage<{ job: JobPost }> = ({ job }) => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1>{job.title}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: job.description,
                    }}
                ></div>

                <ApplyButton title="Apply for this job" url={job.jobURL}>
                    Join the team and help make the world a better place
                </ApplyButton>
            </div>
        </div>
    );
};

export default JobPosting;

export async function getStaticProps({ params }: { params: { slug: string } }) {
    try {
        const job = await getJobPost(params.slug);
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
    const allJobSlugs = await getAllJobSlugs();

    if (allJobSlugs) {
        return {
            paths: allJobSlugs,
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
