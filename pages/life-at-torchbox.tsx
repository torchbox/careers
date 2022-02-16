import type { NextPage } from 'next';
import styles from 'styles/LifeAtTorchbox.module.scss';
import Layout from '../components/Layout';
import { getLifeAtTorchboxPage } from '../lib/api';
import { LifeAtTorchboxPage } from 'types/LifeAtTorchboxPage';
import Testimonial from 'components/Testimonial';

type LifeAtTorchboxPageProps = {
    preview: boolean;
    content: LifeAtTorchboxPage;
};

const LifeAtTorchboxPage: NextPage<LifeAtTorchboxPageProps> = ({
    preview,
    content,
}) => (
    <Layout theme="DARK" preview={preview} jobsAvailable={8}>
        <div className={styles.indigoBackground}>
            <h1>{content.metadataTitle}</h1>
            <p>{content.metadataDescription}</p>
            <Testimonial testimonial={content.itemsCollection.items[0]} />
        </div>
    </Layout>
);

export default LifeAtTorchboxPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getLifeAtTorchboxPage(preview)) ?? [];
    return {
        props: { preview, content },
    };
}
