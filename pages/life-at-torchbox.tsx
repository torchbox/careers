import type { NextPage } from 'next';
import styles from 'styles/LifeAtTorchbox.module.scss';
import Layout from '../components/Layout';
import { getLifeAtTorchboxPage } from '../lib/api';
import { LifeAtTorchboxPage } from 'types/LifeAtTorchboxPage';
import Hero from 'components/LifeAtTorchbox/Hero';
import RichText from 'components/RichText/RichText';
import AtWorkAtPlay from 'components/LifeAtTorchbox/AtWorkAtPlay';

type LifeAtTorchboxPageProps = {
    preview: boolean;
    content: LifeAtTorchboxPage;
};

const LifeAtTorchboxPage: NextPage<LifeAtTorchboxPageProps> = ({
    preview,
    content,
}) => (
    <Layout theme="DARK" preview={preview} jobsAvailable={8}>
        <Hero
            image={content.heroImage}
            video={content.heroVideo}
            subtitle={content.heroSubtitle}
        >
            <RichText theme="DARK" content={content.heroDescription} />
        </Hero>
        <AtWorkAtPlay
            atPlayDescription={content.atPlayDescription}
            atWorkDescription={content.atWorkDescription}
            locations={content.workLocations.locationListCollection.items}
        />
    </Layout>
);

export default LifeAtTorchboxPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getLifeAtTorchboxPage(preview)) ?? [];
    console.log(content.workLocations.locationListCollection.items);
    return {
        props: { preview, content },
    };
}
