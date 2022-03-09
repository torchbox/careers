import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { getTorchboxAcademyPage } from '../lib/api';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import ReasonsToJoin from 'components/TorchboxAcademy/ReasonsToJoin';
import RichText from 'components/RichText';
import GraduateCarousel from 'components/TorchboxAcademy/GraduateCarousel';
import Academies from 'components/TorchboxAcademy/Academies';
import ApplicationDeadline from 'components/TorchboxAcademy/ApplicationDeadline';
import type { AcademyTypes, TestimonialTypes } from 'types/Base';
import { getNumberOfActiveRoles } from './api/_peopleHR';

type AcademyItemCollection = {
    __typename: string;
    academiesCollection: { items: AcademyTypes[] };
};

type TestimonialItemCollection = {
    __typename: string;
    academiesCollection: { items: TestimonialTypes[] };
};

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
    const graduateTestimonialCollection = content.itemsCollection.items.find(
        (obj: TestimonialItemCollection) =>
            obj.__typename === 'GraduateTestimonials',
    );

    const graduateTestimonials =
        graduateTestimonialCollection.testimonialsCollection.items;

    const academyCollectionItem = content.itemsCollection.items.find(
        (obj: AcademyItemCollection) => obj.__typename === 'Academies',
    );

    let academies = undefined;
    if (academyCollectionItem)
        academies = academyCollectionItem.academiesCollection.items;

    return (
        <Layout theme="INDIGO" preview={preview} jobsAvailable={jobsAvailable}>
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

            <GraduateCarousel
                titleFirstLine={content.meetOurGraduatesTitleFirstLine}
                titleSecondLine={content.meetOurGraduatesTitleSecondLine}
                graduates={graduateTestimonials}
            >
                <RichText
                    theme="LIGHT"
                    content={content.meetOurGraduatesIntroduction}
                />
            </GraduateCarousel>

            <ReasonsToJoin title={content.reasonsToJoinTitle}>
                <RichText
                    theme="LIGHT"
                    content={content.reasonsToJoinContent}
                />
            </ReasonsToJoin>
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
