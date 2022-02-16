import type { NextPage } from 'next';
import styles from 'styles/LifeAtTorchbox.module.scss';
import Layout from '../components/Layout';
import { getLifeAtTorchboxPage } from '../lib/api';
import { LifeAtTorchboxPage } from 'types/LifeAtTorchboxPage';

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
            <h1>{content.metadataTitle}</h1>
            <p>{content.metadataDescription}</p>

            {/*
            <Hero
                image={PlaceholderImage}
                video={PlaceholderVideo}
                subtitle="Remote-first, but always connected, our international team’s a tight-knit bunch."
            >
                Our international clients are just a Zoom call away, and with a
                solid team of 80+ permanent staff - spanning four offices and
                five continents - we’ve got them covered, no matter the time
                zone.
          </Hero> */}
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
