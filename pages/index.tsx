import type { NextPage } from 'next';
import type { LandingPage } from 'types/pages/LandingPage';
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
import Metadata from 'components/Metadata';
import { getLandingPage } from 'lib/api';
import { getNumberOfActiveRoles } from './api/_peopleHR';

type LandingPageProps = {
    preview: boolean;
    jobsAvailable: number;
    landingPageContent: LandingPage;
};

const LandingPage: NextPage<LandingPageProps> = ({
    preview,
    jobsAvailable,
    landingPageContent,
}) => {
    const benefitCollection = landingPageContent.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'Benefits',
    );

    const clientLogoCollection = landingPageContent.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'Clients',
    );

    const socialImagesCollection =
        landingPageContent.itemsCollection.items.find(
            (obj: any) => obj.__typename === 'ProfileImages',
        );

    const blogPostsCollection = landingPageContent.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'MusingsFromTheTeam',
    );

    const benefits = benefitCollection.benefitsListCollection.items.map(
        (item: any) => item.benefitName,
    );

    const clientLogos = clientLogoCollection.clientsCollection.items.map(
        (item: any) => item.clientLogo,
    );

    const socialMediaProfilePhotos =
        socialImagesCollection.imagesCollection.items.map(
            (item: any) => item.image,
        );

    return (
        <Layout
            theme={'INDIGO'}
            preview={preview}
            jobsAvailable={jobsAvailable}
        >
            <Metadata
                title={landingPageContent.metadataTitle}
                description={landingPageContent.metadataDescription}
                slug=""
                image={landingPageContent.metadataSocialMediaImage}
            />
            <Hero image={landingPageContent.heroImage}>
                <RichText
                    theme="INDIGO"
                    content={landingPageContent.heroTagline}
                />
                <PageNav
                    title={landingPageContent.missionTitle}
                    jobs={jobsAvailable}
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
                    title={benefitCollection.benefitsTitle}
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

            <CTA jobs={jobsAvailable} title={landingPageContent.ctaTitle}>
                <RichText
                    theme="INDIGO"
                    content={landingPageContent.ctaDescription}
                />
            </CTA>

            <MusingsFromTheTeam
                postData={blogPostsCollection.blogPostsCollection.items}
            />
        </Layout>
    );
};

export default LandingPage;

export async function getStaticProps({ preview = false }) {
    const landingPageContent = await getLandingPage(preview);
    const jobsAvailable = await getNumberOfActiveRoles();
    return {
        props: { preview, jobsAvailable, landingPageContent },
    };
}
