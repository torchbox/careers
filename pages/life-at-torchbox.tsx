import type { NextPage } from 'next';
import styles from 'styles/LifeAtTorchbox.module.scss';
import Layout from '../components/Layout';
import { getLifeAtTorchboxPage } from '../lib/api';
import Testimonial from 'components/Testimonial';
import { LifeAtTorchboxPage } from 'types/pages/LifeAtTorchbox';
import Hero from 'components/LifeAtTorchbox/Hero';
import RichText from 'components/RichText';
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
                locations={content.workLocations.locationListCollection.items}
            />
        </div>
        <Testimonial testimonial={content.itemsCollection.items[0]} />
    </Layout>
);

export default LifeAtTorchboxPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getLifeAtTorchboxPage(preview)) ?? [];
    return {
        props: { preview, content },
    };
}
