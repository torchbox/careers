import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';
import { getLandingPage } from '../lib/api';
import Layout from '../components/Layout';
import Image from 'next/image';
import { LandingPage } from 'types/LandingPage';

import HomepageSubnav from 'components/HomepageSubnav';
import SocialMediaPhotos from 'components/SocialMediaPhotos';

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
            <h1 className={styles.title}>{landingPageContent.title}</h1>
            <p>This is a landing page preview mode demonstration.</p>
            <Image
                src={landingPageContent.heroImage.url}
                alt={landingPageContent.heroImage.description}
                width={landingPageContent.heroImage.width}
                height={landingPageContent.heroImage.height}
            />
            <p>{landingPageContent.metadataDescription}</p>
            <p>{landingPageContent.ctaTitle}</p>
            <p>{JSON.stringify(landingPageContent.ctaDescription)}</p>
            <h1 className={styles.title}>Vercel Setup</h1>
            <HomepageSubnav title="We are on a mission" jobs={3}>
                <p>
                    For over 20 years, we’ve been devoted to delivering
                    outstanding work, while making a positive impact on society.
                </p>

                <p>
                    We create deeper meaning that joins the dots. Because our
                    work doesn’t exist in a bubble. It has the potential to
                    create more opportunities, better lives and deliver lasting
                    value, for everyone.{' '}
                </p>

                <p>
                    Here’s a taste of the incredible organisations we partner
                    with:
                </p>
            </HomepageSubnav>
            <SocialMediaPhotos photos={ImageArray} />
        </div>
    </Layout>
);

export default LandingPage;

export async function getStaticProps({ preview = false }) {
    const landingPageContent = (await getLandingPage(preview)) ?? [];
    return {
        props: { preview, landingPageContent },
    };
}
