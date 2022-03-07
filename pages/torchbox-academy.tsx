import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { getTorchboxAcademyPage } from '../lib/api';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import Academies from 'components/TorchboxAcademy/Academies';
import type { AcademyTypes } from 'types/Base';
import ApplicationDeadline from 'components/TorchboxAcademy/ApplicationDeadline';
import RichText from 'components/RichText';

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
            <h1>Torchbox Academy</h1>
            {academies && <Academies academies={academies} />}
            <ApplicationDeadline
                titleIntro={content.applicationsOpenTitleIntro}
                titleEmphasis={content.applicationsOpenTitleEmphasis}
                image={content.applicationsOpenImage}
            >
                <RichText
                    theme="DARK"
                    content={content.applicationsOpenDescription}
                />
            </ApplicationDeadline>
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
