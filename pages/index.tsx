import type { NextPage } from 'next';
import type { BeingAtTorchbox } from 'types/pages/BeingAtTorchbox';
import Layout from 'components/Layout';
import ClientLogos from 'components/ClientLogos';
import Benefits from 'components/Benefits';
import Hero from 'components/BeingAtTorchbox/Hero';
import PageNav from 'components/BeingAtTorchbox/PageNav';
import LifeAsATorchboxer from 'components/BeingAtTorchbox/LifeAsATorchboxer';
import ComeWorkForYou from 'components/BeingAtTorchbox/ComeWorkForYou';
import SocialMediaPhotos from 'components/BeingAtTorchbox/SocialMediaPhotos';
import CTA from 'components/BeingAtTorchbox/CTA';
import RichText from 'components/RichText';
import MusingsFromTheTeam from 'components/BeingAtTorchbox/MusingsFromTheTeam';
import Metadata from 'components/Metadata';
import { getBeingAtTorchboxPage } from 'lib/api';
import { getNumberOfActiveRoles } from './api/_peopleHR';

type BeingAtTorchboxProps = {
    preview: boolean;
    jobsAvailable: number;
    content: BeingAtTorchbox;
};

const BeingAtTorchbox: NextPage<BeingAtTorchboxProps> = ({
    preview,
    jobsAvailable,
    content,
}) => {
    const benefitCollection = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'Benefits',
    );

    const clientLogoCollection = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'Clients',
    );

    const socialImagesCollection = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'ProfileImages',
    );

    const blogPostsCollection = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'MusingsFromTheTeam',
    );

    const benefits = benefitCollection.benefitsListCollection.items.map(
        (item: any) => item.benefitName,
    );

    const clientLogos = clientLogoCollection.clientsCollection.items.map(
        (item: any) => item.clientLogo,
    );

    const socialMediaProfilePhotos =
        socialImagesCollection.imagesCollection.items;

    return (
        <Layout
            theme={'INDIGO'}
            preview={preview}
            jobsAvailable={jobsAvailable}
        >
            <Metadata
                title={content.metadataTitle}
                description={content.metadataDescription}
                slug=""
                image={content.metadataSocialMediaImage}
            />
            <Hero image={content.heroImage}>
                <RichText theme="INDIGO" content={content.heroTagline} />
                <PageNav title={content.missionTitle} jobs={jobsAvailable}>
                    <RichText
                        theme="INDIGO"
                        content={content.missionDescription}
                    />
                </PageNav>
            </Hero>

            <ClientLogos logos={clientLogos} />

            <ComeWorkForYou image={content.workForYouImage}>
                <RichText
                    theme="DARK"
                    content={content.workForYouDescription}
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
                        content={content.lifeAsATorchboxer}
                    />
                </LifeAsATorchboxer>
            </div>
            <SocialMediaPhotos photos={socialMediaProfilePhotos} />

            <CTA jobs={jobsAvailable} title={content.ctaTitle}>
                {content.ctaDescription && (
                    <RichText theme="INDIGO" content={content.ctaDescription} />
                )}
            </CTA>

            <MusingsFromTheTeam
                postData={blogPostsCollection.blogPostsCollection.items}
            />
        </Layout>
    );
};

export default BeingAtTorchbox;

export async function getStaticProps({ preview = false }) {
    const content = await getBeingAtTorchboxPage(preview);
    const jobsAvailable = await getNumberOfActiveRoles();
    return {
        props: { preview, jobsAvailable, content },
    };
}
