import type { NextPage } from "next";
import { getJobData, getAllJobSlugs } from "lib/peopleHR";
import type { JobPost } from "lib/peopleHR";
import styles from "styles/Jobs.module.scss";

const JobPosting: NextPage<{ jobData: JobPost }> = ({ jobData }) => {
    return (
        <div className={styles.container}>
            <h1>{jobData.title}</h1>
            <div
                dangerouslySetInnerHTML={{
                    __html: jobData.description[0],
                }}
            ></div>
        </div>
    );
};

export default JobPosting;

type Parameters = {
    params: {
        slug: string;
    };
};

export async function getStaticProps({ params }: Parameters) {
    const jobData = (await getJobData(params.slug)) ?? [];
    return {
        props: { jobData },
        revalidate: 60 * 15, //After 15 minutes, the cache expires and the page gets rebuilt.
    };
}

export async function getStaticPaths() {
    const allJobSlugs = await getAllJobSlugs();
    return {
        paths: allJobSlugs.map((slug) => `/jobs/${slug}`) ?? [],
        fallback: "blocking",
    };
}
