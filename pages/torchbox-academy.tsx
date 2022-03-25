import type { NextPage } from 'next';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import { getTorchboxAcademyPage } from 'lib/api';
import Hero from 'components/TorchboxAcademy/Hero';
import Layout from 'components/Layout';
import RichText from 'components/RichText';
import Metadata from 'components/Metadata';
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
    return (
        <Layout theme="INDIGO" preview={preview} jobsAvailable={jobsAvailable}>
            <Metadata
                title={content.metadataTitle}
                description={content.metadataDescription}
                slug="torchbox-academy"
                image={content.metadataSocialMediaImage}
            />

            <Hero image={content.heroImage}>
                <RichText theme="INDIGO" content={content.heroDescription} />
            </Hero>
            <h1>Torchbox Academy</h1>
            <p>
                <strong>{content.heroSubtitle}</strong>
            </p>
            <RichText theme="INDIGO" content={content.heroDescription} />
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
