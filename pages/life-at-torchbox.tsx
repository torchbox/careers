import type { NextPage } from 'next';
import type { LifeAtTorchboxPage } from 'types/pages/LifeAtTorchbox';
import Layout from 'components/Layout';
import Testimonial from 'components/Testimonial';
import Hero from 'components/LifeAtTorchbox/Hero';
import MainContent from 'components/LifeAtTorchbox/MainContent';
import ValuesCarousel from 'components/LifeAtTorchbox/ValuesCarousel';
import AtWorkAtPlay from 'components/LifeAtTorchbox/AtWorkAtPlay';
import Metadata from 'components/Metadata';
import RichText from 'components/RichText';
import { getLifeAtTorchboxPage } from 'lib/api';
import { getNumberOfActiveRoles } from './api/_peopleHR';
import styles from '../styles/pages/LifeAtTorchbox.module.scss';

type LifeAtTorchboxPageProps = {
    preview: boolean;
    jobsAvailable: number;
    content: LifeAtTorchboxPage;
};

const LifeAtTorchboxPage: NextPage<LifeAtTorchboxPageProps> = ({
    preview,
    jobsAvailable,
    content,
}) => (
    <Layout theme="DARK" preview={preview} jobsAvailable={jobsAvailable}>
        <Metadata
            title={content.metadataTitle}
            description={content.metadataDescription}
            slug="life-at-torchbox"
            image={content.metadataSocialMediaImage}
        />
        <div className={styles.indigoBackground}>
            <Hero
                image={content.heroImage}
                video={content.heroVideo}
                subtitle={content.heroSubtitle}
            >
                <RichText theme="DARK" content={content.heroDescription} />
            </Hero>
            <AtWorkAtPlay
                atWorkTitle={content.atWorkTitle}
                atPlayTitle={content.atPlayTitle}
                atPlayDescription={content.atPlayDescription}
                atWorkDescription={content.atWorkDescription}
                locations={content.workLocations.locationListCollection.items}
            />
        </div>
        <Testimonial testimonial={content.itemsCollection.items[0]} />
        <MainContent
            firstLine={content.mainContentTitleFirstLine}
            secondLine={content.mainContentTitleSecondLine}
            thirdLine={content.mainContentTitleThirdLine}
        >
            <RichText theme="LIGHT" content={content.mainContent} />
        </MainContent>
        <ValuesCarousel
            title={content.valueCarouselTitle}
            values={content.itemsCollection.items[1].valuesCollection.items}
        >
            {content.valueCarouselIntroduction && (
                <RichText
                    theme="INDIGO"
                    content={content.valueCarouselIntroduction}
                />
            )}
        </ValuesCarousel>
        <div className={styles.contentContainer}>
            <div className={styles.textContainer}>
                <RichText theme="LIGHT" content={content.valuesDescription} />
            </div>
        </div>
    </Layout>
);

export default LifeAtTorchboxPage;

export async function getStaticProps({ preview = false }) {
    const content = await getLifeAtTorchboxPage(preview);
    const jobsAvailable = await getNumberOfActiveRoles();
    return {
        props: { preview, jobsAvailable, content },
    };
}
