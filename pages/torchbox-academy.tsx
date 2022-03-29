import type { NextPage } from 'next';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import { getTorchboxAcademyPage } from 'lib/api';
import Hero from 'components/TorchboxAcademy/Hero';
import Layout from 'components/Layout';
import RichText from 'components/RichText';
import Metadata from 'components/Metadata';
import Quote from 'components/Quote';
import styles from 'styles/pages/TorchboxAcademy.module.scss';
import { getNumberOfActiveRoles } from './api/_peopleHR';

type TorchboxAcademyPageProps = {
    preview: boolean;
    jobsAvailable: number;
    content: TorchboxAcademy;
};

const TorchboxAcademyPage: NextPage<TorchboxAcademyPageProps> = ({
    preview,
    jobsAvailable,
    content,
}) => {
    return (
        <Layout theme="INDIGO" preview={preview} jobsAvailable={jobsAvailable}>
            <Metadata
                title={content.metadataTitle}
                description={content.metadataDescription}
                slug="torchbox-academy"
                image={content.metadataSocialMediaImage}
            />

            <Hero image={content.heroImage} subtitle={content.heroSubtitle}>
                <RichText theme="INDIGO" content={content.heroDescription} />
            </Hero>

            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <Quote name={content.quoteAuthor}>{content.quote}</Quote>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.mainContentContainer}>
                    <h2 className={styles.secondaryTitle}>
                        {content.mainSectionTitle}
                    </h2>
                    <RichText
                        theme="INDIGO"
                        content={content.mainSectionContent}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default TorchboxAcademyPage;

export async function getStaticProps({ preview = false }) {
    const content = await getTorchboxAcademyPage(preview);
    const jobsAvailable = await getNumberOfActiveRoles();

    return {
        props: { preview, jobsAvailable, content },
    };
}
