import type { NextPage } from 'next';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import { getTorchboxAcademyPage } from 'lib/api';
import Layout from 'components/Layout';
import RichText from 'components/RichText/RichText';
import Image from 'components/Image';

type TorchboxAcademyPageProps = {
    preview: boolean;
    content: TorchboxAcademy;
};

const TorchboxAcademyPage: NextPage<TorchboxAcademyPageProps> = ({
    preview,
    content,
}) => (
    <Layout theme="INDIGO" preview={preview} jobsAvailable={8}>
        <h1>Torchbox Academy</h1>
        <RichText theme="INDIGO" content={content.heroSubtitle} />
        <Image
            src={content.heroImage.url}
            alt={content.heroImage.description}
        />
    </Layout>
);

export default TorchboxAcademyPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getTorchboxAcademyPage(preview)) ?? [];
    return {
        props: { preview, content },
    };
}
