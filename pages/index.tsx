import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';
import { getLandingPage } from '../lib/api';
import Layout from '../components/Layout';
import Image from 'next/image';
import { LandingPage } from 'types/LandingPage';

import LifeAsATorchboxer from 'components/LifeAsATorchboxer';
import LandingPageCTA from 'components/LandingPageCTA';
import LandingPageSubnav from 'components/LandingPageSubnav';
import SocialMediaPhotos from 'components/SocialMediaPhotos';
import RichText from 'components/RichText/RichText';

const PlaceholderImage = {
    description: 'This is a placeholder',
    url: 'https://source.unsplash.com/random/750x750/?nature',
    width: 750,
    height: 750,
};

const ImageArray = [...Array(10)].map((_) => PlaceholderImage);

type LandingPageProps = {
    preview: boolean;
    landingPageContent: LandingPage;
};

const LandingPage: NextPage<LandingPageProps> = ({
    preview,
    landingPageContent,
}) => (
    <Layout preview={preview}>
        <div className={styles.container}>
            <LandingPageSubnav title={landingPageContent.missionTitle} jobs={3}>
                <RichText
                    theme="INDIGO"
                    content={landingPageContent.missionDescription}
                />
            </LandingPageSubnav>
        </div>

        {/* Todo: Implement the landing page hero.
        
        <h1 className={styles.title}>{landingPageContent.title}</h1>
        <p>{landingPageContent.metadataDescription}</p>
        <Image
            src={landingPageContent.heroImage.url}
            alt={landingPageContent.heroImage.description}
            width={landingPageContent.heroImage.width}
            height={landingPageContent.heroImage.height}
        />
        */}

        <LifeAsATorchboxer>
            <RichText
                theme="INDIGO"
                content={landingPageContent.lifeAsATorchboxer}
            />
        </LifeAsATorchboxer>

        <SocialMediaPhotos photos={ImageArray} />

        <LandingPageCTA jobs={10} title={landingPageContent.ctaTitle}>
            <RichText
                theme="INDIGO"
                content={landingPageContent.ctaDescription}
            />
        </LandingPageCTA>
    </Layout>
);

export default LandingPage;

export async function getStaticProps({ preview = false }) {
    const landingPageContent = (await getLandingPage(preview)) ?? [];
    return {
        props: { preview, landingPageContent },
    };
}
