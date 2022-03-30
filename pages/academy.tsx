import type { NextPage } from 'next';
import { Academy } from 'types/pages/Academy';
import { getAcademyPage } from 'lib/api';
import Hero from 'components/Academy/Hero';
import ApplicationProcess from 'components/Academy/ApplicationProcess';
import TypicalDay from 'components/Academy/TypicalDay';
import Layout from 'components/Layout';
import RichText from 'components/RichText';
import Metadata from 'components/Metadata';
import Quote from 'components/Quote';
import styles from 'styles/pages/Academy.module.scss';
import { getNumberOfActiveRoles } from './api/_peopleHR';

type AcademyPageProps = {
    preview: boolean;
    jobsAvailable: number;
    content: Academy;
};

const AcademyPage: NextPage<AcademyPageProps> = ({
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

            <TypicalDay
                title={content.typicalDayTitle}
                firstHeading={content.typicalDayFirstHeading}
                firstContent={content.typicalDayFirstContent}
                secondHeading={content.typicalDaySecondHeading}
                secondContent={content.typicalDaySecondContent}
            />

            <div className={styles.longDivider} />

            <ApplicationProcess
                title={content.applicationProcessTitle}
                stepOne={content.applicationProcessStepOne}
                stepTwo={content.applicationProcessStepTwo}
                stepThree={content.applicationProcessStepThree}
            >
                <RichText
                    theme="INDIGO"
                    content={content.applicationProcessDescription}
                />
            </ApplicationProcess>
        </Layout>
    );
};

export default AcademyPage;

export async function getStaticProps({ preview = false }) {
    const content = await getAcademyPage(preview);
    const jobsAvailable = await getNumberOfActiveRoles();

    return {
        props: { preview, jobsAvailable, content },
    };
}
