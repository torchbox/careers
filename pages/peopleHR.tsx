import type { NextPage } from "next";
import { getHRData, getJobDescriptions } from "../lib/peopleHR";
import styles from "styles/PeopleHR.module.scss";

const PeopleHR: NextPage<any> = ({ allJSONData, descriptions }) => {
    return (
        <div className={styles.container}>
            <p>{allJSONData.rss.channel[0].title}</p>
            {descriptions.map((description: string, index: number) => (
                <div key={index}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    ></div>
                    <hr className={styles.divider} />
                </div>
            ))}
        </div>
    );
};

export default PeopleHR;

export async function getStaticProps() {
    const allJSONData = (await getHRData()) ?? [];
    const descriptions = (await getJobDescriptions()) ?? [];
    return {
        props: { allJSONData, descriptions },
    };
}
