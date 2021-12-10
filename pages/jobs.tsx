import type { NextPage } from "next";
import { getAllJobSummaries } from "../lib/peopleHR";
import type { JobSummary } from "../lib/peopleHR";
import styles from "styles/Jobs.module.scss";
import Link from "next/link";

const Jobs: NextPage<{ jobs: JobSummary[] }> = ({ jobs }) => {
    return (
        <div className={styles.container}>
            {jobs.map((job: JobSummary, index: number) => (
                <div key={index}>
                    <p>
                        <b>{job.title}</b>
                    </p>
                    <p>{job.description}</p>
                    <Link href={"/jobs/" + job.slug}>
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
    const jobs = (await getAllJobSummaries()) ?? [];

    return {
        props: { jobs },
        revalidate: 60 * 60, //After one hour, the cache expires and the page gets rebuilt.
    };
}
