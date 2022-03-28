import type { NextPage } from 'next';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import { getTorchboxAcademyPage } from 'lib/api';
import Layout from 'components/Layout';
import RichText from 'components/RichText';
import Metadata from 'components/Metadata';
import { CharacterType } from 'types/Base';
import AcademyDayCards from 'components/TorchboxAcademy/AcademyDayCards';
import { getNumberOfActiveRoles } from './api/_peopleHR';

type TorchboxAcademyPageProps = {
    preview: boolean;
    jobsAvailable: number;
    content: TorchboxAcademy;
};

const TorchboxAcademyPage: NextPage<TorchboxAcademyPageProps> = ({
    preview,
    jobsAvailable,
    content,
}) => {
    const academyDays = content.academyDaysCollection.items.map(
        (card, index) => {
            return {
                title: card.title,
                content: card.description,
                link: card.applicationLink,
                character: (index === 0
                    ? 'MICROPHONE'
                    : 'COFFEE') as CharacterType,
            };
        },
    );
    return (
        <Layout theme="INDIGO" preview={preview} jobsAvailable={jobsAvailable}>
            <Metadata
                title={content.metadataTitle}
                description={content.metadataDescription}
                slug="torchbox-academy"
                image={content.metadataSocialMediaImage}
            />
            <h1>Torchbox Academy</h1>
            <p>
                <strong>{content.heroSubtitle}</strong>
            </p>
            <RichText theme="INDIGO" content={content.heroDescription} />
            <AcademyDayCards academyDays={academyDays} />
        </Layout>
    );
};

export default TorchboxAcademyPage;

export async function getStaticProps({ preview = false }) {
    const content = await getTorchboxAcademyPage(preview);
    const jobsAvailable = await getNumberOfActiveRoles();

    return {
        props: { preview, jobsAvailable, content },
    };
}
