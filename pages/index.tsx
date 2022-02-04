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
}) => {
    const clientLogos =
        landingPageContent.itemsCollection.items[2].clientsCollection.items.map(
            (item: any) => item.clientLogo,
        );

    return (
        <Layout theme={'LIGHT'} preview={preview} jobsAvailable={11}>
            <Hero image={PlaceholderImage}>
                {/* Todo: Replace this with a rich text field component. */}
                <p>
                    <strong>Glad you asked.</strong> We are not your average
                    digital agency...
                </p>
                <PageNav title={landingPageContent.missionTitle} jobs={3}>
                    <p>
                        For over 20 years, we’ve been devoted to delivering
                        outstanding work, while making a positive impact on
                        society.
                    </p>

                    <p>
                        We create deeper meaning that joins the dots. Because
                        our work doesn’t exist in a bubble. It has the potential
                        to create more opportunities, better lives and deliver
                        lasting value, for everyone.{' '}
                    </p>

                    <p>
                        Here’s a taste of the incredible organisations we
                        partner with:
                    </p>
                </PageNav>
            </Hero>

            <ClientLogos logos={clientLogos} />

            <ComeWorkForYou image={PlaceholderImage}>
                <strong>
                    No parent company, no shareholders, just a team of equal
                    owners.
                </strong>
                <br />
                <br />
                <p>
                    100% of our business belongs to our Employee Ownership Trust
                    (EOT). Everyone is included, everyone is updated and
                    everyone belongs.
                </p>
            </ComeWorkForYou>

            <div id="benefits">
                <Benefits
                    title="Real benefits in touch with real life"
                    benefits={ExampleBenefits}
                />
            </div>

            <div id="lifeAsATorchboxer">
                <LifeAsATorchboxer>
                    <p>
                        From Bristol to Texas, we go the extra mile (or 4,813).
                        We’re remote-first, but always connected, championing
                        unique people in unique places. <br />
                        <br />
                        Find out more about who we are, how we work, what we
                        believe in and where we’re heading.
                    </p>
                </LifeAsATorchboxer>
            </div>

            <SocialMediaPhotos photos={ImageArray} />

            <CTA jobs={10} title="Ready to make a difference?">
                <p>
                    We’re always excited about finding new talent and meeting
                    people that are as eager as we are to drive significant
                    positive change.
                </p>
            </CTA>
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
