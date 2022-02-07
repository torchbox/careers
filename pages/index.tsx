import type { NextPage } from 'next';
import type { LandingPage } from 'types/LandingPage';
import { getLandingPage } from '../lib/api';
import Layout from 'components/Layout';
import ClientLogos from 'components/ClientLogos';
import Benefits from 'components/Benefits';
import Hero from 'components/LandingPage/Hero';
import PageNav from 'components/LandingPage/PageNav';
import LifeAsATorchboxer from 'components/LandingPage/LifeAsATorchboxer';
import ComeWorkForYou from 'components/LandingPage/ComeWorkForYou';
import SocialMediaPhotos from 'components/LandingPage/SocialMediaPhotos';
import CTA from 'components/LandingPage/CTA';
import RichText from 'components/RichText/RichText';

const ExampleBenefits = [
    'Performance and ownership bonus',
    '25 days holiday',
    'Personal development budget',
    'Private health cover',
    'Flexible hours',
    'Regular socials - online and in-person',
    'Ethical pension',
    'Fruit!',
];

const PlaceholderImage = {
    description: 'This is a placeholder',
    url: 'https://source.unsplash.com/random/750×750/?nature',
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
    <Layout theme="LIGHT" preview={preview} jobsAvailable={11}>
        <Hero image={PlaceholderImage}>
            {/* Todo: Replace this with a rich text field component. */}
            <p>
                <strong>Glad you asked.</strong> We are not your average digital
                agency...
            </p>
            <PageNav title={landingPageContent.missionTitle} jobs={3}>
                <RichText
                    theme="INDIGO"
                    content={landingPageContent.missionDescription}
                />
            </PageNav>
        </Hero>

        <ClientLogos logos={ImageArray} />

        <ComeWorkForYou image={PlaceholderImage}>
            <strong>
                No parent company, no shareholders, just a team of equal owners.
            </strong>
            <br />
            <br />
            <p>
                100% of our business belongs to our Employee Ownership Trust
                (EOT). Everyone is included, everyone is updated and everyone
                belongs.
            </p>
        </ComeWorkForYou>

        <Benefits
            title="Real benefits in touch with real life"
            benefits={ExampleBenefits}
        />

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

        <CTA jobs={10} title={landingPageContent.ctaTitle}>
            <RichText
                theme="INDIGO"
                content={landingPageContent.ctaDescription}
            />
        </CTA>
    </Layout>
);

export default LandingPage;

export async function getStaticProps({ preview = false }) {
    const landingPageContent = (await getLandingPage(preview)) ?? [];
    return {
        props: { preview, landingPageContent },
    };
}
