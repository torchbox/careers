import type { NextPage } from 'next';
import type { JobPost } from 'lib/peopleHR';
import styles from 'styles/Job.module.scss';
import { getAllJobSlugs } from 'pages/api/jobs/slugs';
import { getJobPost } from 'pages/api/jobs/[slug]';
import JobListingHero from 'components/JobListingHero';

type JobPostingProps = {
    job: JobPost;
    sharingURL: string;
};

const JobPosting: NextPage<JobPostingProps> = ({ job, sharingURL }) => {
    return (
        <div className={styles.pageContainer}>
            <JobListingHero
                title={job.title}
                salary={job.salaryRange}
                location={job.city}
                applicationLink={job.jobURL}
                sharingURL={sharingURL}
            />

            <div className={styles.contentContainer}>
                <div className={styles.textContainer}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: job.description,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default JobPosting;

export async function getStaticProps({ params }: { params: { slug: string } }) {
    try {
        const job = await getJobPost(params.slug);
        const sharingURL = params.slug;
        return {
            props: { job, sharingURL },
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
