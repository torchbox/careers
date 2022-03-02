import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { getTorchboxAcademyPage } from '../lib/api';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import RichText from 'components/RichText/RichText';
import Hero from 'components/TorchboxAcademy/Hero';

type TorchboxAcademyPageProps = {
    preview: boolean;
    content: TorchboxAcademy;
};

const TorchboxAcademyPage: NextPage<TorchboxAcademyPageProps> = ({
    preview,
    content,
}) => (
    <Layout theme="INDIGO" preview={preview} jobsAvailable={8}>
        <Hero image={content.heroImage}>
            <RichText theme="INDIGO" content={content.heroSubtitle} />
        </Hero>
    </Layout>
);

export default TorchboxAcademyPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getTorchboxAcademyPage(preview)) ?? [];
    return {
        props: { preview, content },
    };
}
