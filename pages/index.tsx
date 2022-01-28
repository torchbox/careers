import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';
import { getLandingPage } from '../lib/api';
import Layout from '../components/Layout';
import Image from 'next/image';
import { LandingPage } from 'types/LandingPage';
import LandingPageHero from 'components/LandingPage/LandingPageHero';
import LifeAsATorchboxer from 'components/LifeAsATorchboxer';
import LandingPageCTA from 'components/LandingPageCTA';
import LandingPageSubnav from 'components/LandingPageSubnav';
import SocialMediaPhotos from 'components/SocialMediaPhotos';

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
    <Layout preview={preview}>
        <div className={styles.container}>
            <h1 className={styles.title}>{landingPageContent.title}</h1>
            <p>{landingPageContent.metadataDescription}</p>
            <Image
                src={landingPageContent.heroImage.url}
                alt={landingPageContent.heroImage.description}
                width={landingPageContent.heroImage.width}
                height={landingPageContent.heroImage.height}
            />
            <p>{landingPageContent.ctaTitle}</p>
            <p>{JSON.stringify(landingPageContent.ctaDescription)}</p>

            <LandingPageHero image={PlaceholderImage}>
                {/* Todo: Replace this with a rich text field component. */}
                <p>
                    <strong>Glad you asked.</strong> We are not your average
                    digital agency...
                </p>
            </LandingPageHero>

            <LandingPageSubnav title="We are on a mission" jobs={3}>
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
            </LandingPageSubnav>
        </div>

        <LifeAsATorchboxer>
            <p>
                From Bristol to Texas, we go the extra mile (or 4,813). We’re
                remote-first, but always connected, championing unique people in
                unique places. <br />
                <br />
                Find out more about who we are, how we work, what we believe in
                and where we’re heading.
            </p>
        </LifeAsATorchboxer>

        <SocialMediaPhotos photos={ImageArray} />

        <LandingPageCTA jobs={10} title="Ready to make a difference?">
            <p>
                We’re always excited about finding new talent and meeting people
                that are as eager as we are to drive significant positive
                change.
            </p>
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
