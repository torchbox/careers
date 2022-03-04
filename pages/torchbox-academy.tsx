import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { getTorchboxAcademyPage } from '../lib/api';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import Academies from 'components/TorchboxAcademy/Academies';
import type { AcademyTypes } from 'types/Base';
import Metadata from 'components/Metadata';

type AcademyItemCollection = {
    __typename: string;
    academiesCollection: { items: AcademyTypes[] };
};

type TorchboxAcademyPageProps = {
    preview: boolean;
    content: TorchboxAcademy;
};

const TorchboxAcademyPage: NextPage<TorchboxAcademyPageProps> = ({
    preview,
    content,
}) => {
    const academyCollectionItem = content.itemsCollection.items.find(
        (obj: AcademyItemCollection) => obj.__typename === 'Academies',
    );

    let academies = undefined;
    if (academyCollectionItem)
        academies = academyCollectionItem.academiesCollection.items;

    return (
        <Layout theme="INDIGO" preview={preview} jobsAvailable={8}>
            <Metadata
                title={content.metadataTitle}
                description={content.metadataDescription}
                slug="torchbox-academy"
                image={content.metadataSocialMediaImage}
            />
            <h1>Torchbox Academy</h1>
            {academies && <Academies academies={academies} />}
        </Layout>
    );
};

export default TorchboxAcademyPage;

export async function getStaticProps({ preview = false }) {
    const content = await getTorchboxAcademyPage(preview);
    return {
        props: { preview, content },
    };
}
