import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { getTorchboxAcademyPage } from '../lib/api';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import Academies from 'components/TorchboxAcademy/Academies';

type TorchboxAcademyPageProps = {
    preview: boolean;
    content: TorchboxAcademy;
};

const TorchboxAcademyPage: NextPage<TorchboxAcademyPageProps> = ({
    preview,
    content,
}) => {
    const academyCollectionItem = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'Academies',
    );

    const academies = academyCollectionItem.academiesCollection.items;

    return (
        <Layout theme="INDIGO" preview={preview} jobsAvailable={8}>
            <h1>Torchbox Academy</h1>
            <Academies academies={academies} />
        </Layout>
    );
};

export default TorchboxAcademyPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getTorchboxAcademyPage(preview)) ?? [];
    return {
        props: { preview, content },
    };
}
