import type { NextPage } from 'next';
import styles from 'styles/LifeAtTorchbox.module.scss';
import Layout from '../components/Layout';
import { getLifeAtTorchboxPage } from '../lib/api';
import { LifeAtTorchboxPage } from 'types/pages/LifeAtTorchbox';
import Hero from 'components/LifeAtTorchbox/Hero';
import RichText from 'components/RichText/RichText';

const PlaceholderImage = {
    description: 'This is a placeholder',
    url: 'https://source.unsplash.com/random/750x750/?forest',
    width: 750,
    height: 750,
};

const PlaceholderVideo = {
    description: 'This is a video',
    url: 'https://videos.ctfassets.net/j97ble2qvn7g/1NiavumsiPSVMntrkOg4Iz/1c70dc30fc1d13488d9547bad9c96689/video__1_.mp4',
};

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
        </div>
    </Layout>
);

export default LifeAtTorchboxPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getLifeAtTorchboxPage(preview)) ?? [];
    return {
        props: { preview, content },
    };
}