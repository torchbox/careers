import type { NextPage } from "next";
import Teaser from "components/Teaser/Teaser";
import styles from "styles/TeaserList.module.scss";

interface Teaser {
    href: string;
    title: string;
    text: string;
}

type TeaserListProps = {
    title?: string;
    teasers: Teaser[];
};

const TeaserList: NextPage<TeaserListProps> = ({ title, teasers }) => {
    return (
        <div className={styles.list}>
            <div className={styles.container}>
                {title ? <h3 className={styles.title}>{title}</h3> : null}

                <div className={styles.content}>
                    {teasers.map((teaser, index) => (
                        <Teaser
                            key={index}
                            href={teaser.href}
                            title={teaser.title}
                            text={teaser.text}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeaserList;
