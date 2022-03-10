import type { NextPage } from 'next';
import { LifeAtTorchboxPage } from 'types/pages/LifeAtTorchbox';
import { getLifeAtTorchboxPage } from 'lib/api';
import Layout from 'components/Layout';
import Testimonial from 'components/Testimonial';
import Hero from 'components/LifeAtTorchbox/Hero';
import RichText from 'components/RichText/RichText';
import AtWorkAtPlay from 'components/LifeAtTorchbox/AtWorkAtPlay';
import styles from './LifeAtTorchbox.module.scss';

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
