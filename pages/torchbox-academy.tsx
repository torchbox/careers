import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { getTorchboxAcademyPage } from '../lib/api';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import RichText from 'components/RichText/RichText';
import ReasonsToJoin from 'components/TorchboxAcademy/ReasonsToJoin';

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
        <ReasonsToJoin title={content.reasonsToJoinTitle}>
            <RichText theme="LIGHT" content={content.reasonsToJoinContent} />
        </ReasonsToJoin>
    </Layout>
);

export default TorchboxAcademyPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getTorchboxAcademyPage(preview)) ?? [];
    return {
        props: { preview, content },
    };
}
