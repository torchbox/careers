import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { getTorchboxAcademyPage } from '../lib/api';
import { TorchboxAcademy } from 'types/pages/TorchboxAcademy';
import RichText from 'components/RichText/RichText';
import Image from 'components/Image';
import GraduateCarousel from 'components/TorchboxAcademy/GraduateCarousel';

type TorchboxAcademyPageProps = {
    preview: boolean;
    content: TorchboxAcademy;
};

const TorchboxAcademyPage: NextPage<TorchboxAcademyPageProps> = ({
    preview,
    content,
}) => {
    const graduateTestimonialCollection = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'GraduateTestimonials',
    );

    const graduateTestimonials =
        graduateTestimonialCollection.testimonialsCollection.items;

    return (
        <Layout theme="INDIGO" preview={preview} jobsAvailable={8}>
            <h1>Torchbox Academy</h1>
            <GraduateCarousel
                title={content.meetOurGraduatesTitle}
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
