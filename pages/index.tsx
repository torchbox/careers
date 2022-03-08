import type { NextPage } from 'next';
import type { LandingPage } from 'types/pages/LandingPage';
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
import RichText from 'components/RichText';
import MusingsFromTheTeam from 'components/LandingPage/MusingsFromTheTeam';

const TEMPORARY_JOBS_VARIABLE = 11;

type LandingPageProps = {
    preview: boolean;
    landingPageContent: LandingPage;
};

const LandingPage: NextPage<LandingPageProps> = ({
    preview,
    landingPageContent,
}) => {
    const clientLogos =
        landingPageContent.itemsCollection.items[2].clientsCollection.items.map(
            (item: any) => item.clientLogo,
        );

    const benefits =
        landingPageContent.itemsCollection.items[0].benefitsListCollection.items.map(
            (item: any) => item.benefitName,
        );

    const socialMediaProfilePhotos =
        landingPageContent.itemsCollection.items[1].imagesCollection.items.map(
            (item: any) => item.image,
        );

    return (
        <Layout
            theme={'INDIGO'}
            preview={preview}
            jobsAvailable={TEMPORARY_JOBS_VARIABLE}
        >
            <Hero image={landingPageContent.heroImage}>
                <RichText
                    theme="INDIGO"
                    content={landingPageContent.heroTagline}
                />
                <PageNav
                    title={landingPageContent.missionTitle}
                    jobs={TEMPORARY_JOBS_VARIABLE}
                >
                    <RichText
                        theme="INDIGO"
                        content={landingPageContent.missionDescription}
                    />
                </PageNav>
            </Hero>

            <ClientLogos logos={clientLogos} />

            <ComeWorkForYou image={landingPageContent.workForYouImage}>
                <RichText
                    theme="DARK"
                    content={landingPageContent.workForYouDescription}
                />
            </ComeWorkForYou>
            <div id="benefits">
                <Benefits
                    title="Real benefits in touch with real life"
                    benefits={benefits}
                />
            </div>

            <div id="lifeAsATorchboxer">
                <LifeAsATorchboxer>
                    <RichText
                        theme="INDIGO"
                        content={landingPageContent.lifeAsATorchboxer}
                    />
                </LifeAsATorchboxer>
            </div>
            <SocialMediaPhotos photos={socialMediaProfilePhotos} />

            <CTA
                jobs={TEMPORARY_JOBS_VARIABLE}
                title={landingPageContent.ctaTitle}
            >
                <RichText
                    theme="INDIGO"
                    content={landingPageContent.ctaDescription}
                />
            </CTA>

            <MusingsFromTheTeam
                postData={
                    landingPageContent.itemsCollection.items[3]
                        .blogPostsCollection.items
                }
            />
        </Layout>
    );
};

export default LandingPage;

export async function getStaticProps({ preview = false }) {
    const landingPageContent = (await getLandingPage(preview)) ?? [];
    return {
        props: { preview, landingPageContent },
    };
}
