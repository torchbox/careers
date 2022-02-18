import type { NextPage } from 'next';
import styles from 'styles/LifeAtTorchbox.module.scss';
import Layout from '../components/Layout';
import { getLifeAtTorchboxPage } from '../lib/api';
import { LifeAtTorchboxPage } from 'types/LifeAtTorchboxPage';
import Hero from 'components/LifeAtTorchbox/Hero';
import RichText from 'components/RichText/RichText';
import MainContent from 'components/LifeAtTorchbox/MainContent';

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
        <div className={styles.whiteBackground}>
            <MainContent
                firstLine={content.mainContentTitleFirstLine}
                secondLine={content.mainContentTitleSecondLine}
                thirdLine={content.mainContentTitleThirdLine}
            >
                <RichText theme="LIGHT" content={content.mainContent} />
            </MainContent>
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
