import type { NextPage } from 'next';
import styles from 'styles/LifeAtTorchbox.module.scss';
import Layout from '../components/Layout';
import LifeAtTorchboxHero from 'components/LifeAtTorchbox/LifeAtTorchboxHero';

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
};

const LifeAtTorchboxPage: NextPage<LifeAtTorchboxPageProps> = ({ preview }) => (
    <Layout preview={preview}>
        <div className={styles.container}>
            <div className={styles.gradientBackground}>
                <LifeAtTorchboxHero
                    image={PlaceholderImage}
                    video={PlaceholderVideo}
                    subtitle="Remote-first, but always connected, our international team’s a tight-knit bunch."
                >
                    Our international clients are just a Zoom call away, and
                    with a solid team of 80+ permanent staff - spanning four
                    offices and five continents - we’ve got them covered, no
                    matter the time zone.
                </LifeAtTorchboxHero>
            </div>
        </div>
    </Layout>
);

export default LifeAtTorchboxPage;

/* Todo: Add fetching page data API function

import { getLifeAtTorchboxPage } from '../lib/api';
import { LifeAtTorchboxPage } from 'types/LifeAtTorchboxPage';

export async function getStaticProps({ preview = false }) {
    const LifeAtTorchboxPageContent = (await getLifeAtTorchboxPage(preview)) ?? [];
    return {
        props: { preview, LifeAtTorchboxPageContent },
    };
}
*/
