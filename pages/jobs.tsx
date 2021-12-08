import type { NextPage } from "next";
import { getAllJobs } from "../lib/peopleHR";
import type { JobPost } from "../lib/peopleHR";
import styles from "styles/Jobs.module.scss";
import Link from "next/link";

interface JobPostWithSlug {
    job: JobPost;
    slug: string;
}

//Todo: the URL for the Link might not work on production.

const Jobs: NextPage<{ jobsWithSlugs: JobPostWithSlug[] }> = ({
    jobsWithSlugs,
}) => {
    return (
        <div className={styles.container}>
            {jobsWithSlugs.map(
                (jobWithSlug: JobPostWithSlug, index: number) => (
                    <div key={index}>
                        <p>{jobWithSlug.job.title[0]}</p>
                        <Link href={"/jobs/" + jobWithSlug.slug}>
                            <a>Click here to view this job.</a>
                        </Link>
                        <hr className={styles.divider} />
                    </div>
                )
            )}
        </div>
    );
};

export default Jobs;

export async function getStaticProps() {
    const jobs = (await getAllJobs()) ?? [];

    let jobsWithSlugs: JobPostWithSlug[] = [];

    for (let i = 0; i < jobs.length; i++) {
        let title: string = jobs[i].title[0];
        title = title.toLowerCase();
        title = title.replace(/[^a-zA-Z0-9]+/g, "-");
        jobsWithSlugs.push({ job: jobs[i], slug: title });
    }

    return {
        props: { jobsWithSlugs },
        revalidate: 60 * 15, //After 15 minutes, the cache expires and the page gets rebuilt.
    };
}
