import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { getTorchboxAcademyPage } from '../lib/api';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import RichText from 'components/RichText';
import GraduateCarousel from 'components/TorchboxAcademy/GraduateCarousel';
import Academies from 'components/TorchboxAcademy/Academies';
import type { AcademyTypes, TestimonialTypes } from 'types/Base';

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
    content: TorchboxAcademy;
};

const TorchboxAcademyPage: NextPage<TorchboxAcademyPageProps> = ({
    preview,
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
        <Layout theme="INDIGO" preview={preview} jobsAvailable={8}>
            <h1>Torchbox Academy</h1>

            {academies && <Academies academies={academies} />}

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
