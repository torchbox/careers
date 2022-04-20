import type { NextPage } from 'next';
import type { AboutUsPage } from 'types/pages/AboutUs';
import Layout from 'components/Layout';
import Testimonial from 'components/Testimonial';
import Hero from 'components/AboutUs/Hero';
import MainContent from 'components/AboutUs/MainContent';
import ValuesCarousel from 'components/AboutUs/ValuesCarousel';
import AtWorkAtPlay from 'components/AboutUs/AtWorkAtPlay';
import Metadata from 'components/Metadata';
import RichText from 'components/RichText';
import { getAboutUsPage } from 'lib/api';
import { getNumberOfActiveRoles } from './api/_peopleHR';
import styles from '../styles/pages/LifeAtTorchbox.module.scss';

type AboutUsPageProps = {
    preview: boolean;
    jobsAvailable: number;
    content: AboutUsPage;
};

const AboutUsPage: NextPage<AboutUsPageProps> = ({
    preview,
    jobsAvailable,
    content,
}) => {
    const TestimonialItems = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'Testimonial',
    );

    const TorchboxValuesCarouselItems = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'TorchboxValuesCarousel',
    );

    return (
        <Layout theme="DARK" preview={preview} jobsAvailable={jobsAvailable}>
            <Metadata
                title={content.metadataTitle}
                description={content.metadataDescription}
                slug="about-us"
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
                    locations={
                        content.workLocations.locationListCollection.items
                    }
                />
            </div>
            <Testimonial testimonial={TestimonialItems} />
            <MainContent
                firstLine={content.mainContentTitleFirstLine}
                secondLine={content.mainContentTitleSecondLine}
                thirdLine={content.mainContentTitleThirdLine}
            >
                <RichText theme="LIGHT" content={content.mainContent} />
            </MainContent>
            <ValuesCarousel
                title={content.valueCarouselTitle}
                values={TorchboxValuesCarouselItems.valuesCollection.items}
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
                    <RichText
                        theme="LIGHT"
                        content={content.valuesDescription}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default AboutUsPage;

export async function getStaticProps({ preview = false }) {
    const content = await getAboutUsPage(preview);
    const jobsAvailable = await getNumberOfActiveRoles();
    return {
        props: { preview, jobsAvailable, content },
    };
}
