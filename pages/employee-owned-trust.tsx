import type { NextPage } from 'next';
import Layout from '../components/Layout';
import styles from 'styles/EmployeeOwnedTrust.module.scss';
import { getEmployeeOwnedTrustPage } from '../lib/api';
import { EmployeeOwnedTrustPage } from 'types/pages/EmployeeOwnedTrust';
import RichText from 'components/RichText/RichText';
import Benefits from 'components/Benefits';

const Title = () => (
    <h1 className={styles.title}>
        We&apos;re 100% <br aria-hidden />
        <span className={styles.accent}>employee-owned</span>
    </h1>
);

type EmployeeOwnedTrustPageProps = {
    preview: boolean;
    content: EmployeeOwnedTrustPage;
};

const EmployeeOwnedTrustPage: NextPage<EmployeeOwnedTrustPageProps> = ({
    preview,
    content,
}) => {
    const benefits =
        content.itemsCollection.items[0].benefitsListCollection.items.map(
            (item: any) => item.benefitName,
        );

    return (
        <Layout theme="LIGHT" preview={preview} jobsAvailable={8}>
            <div className={styles.textContent}>
                <Title />
                <p className={styles.subtitle}>{content.subtitle}</p>
                <RichText theme="LIGHT" content={content.content} />
            </div>
            <Benefits
                title="Real benefits in touch with real life"
                benefits={benefits}
            />
        </Layout>
    );
};

export default EmployeeOwnedTrustPage;

export async function getStaticProps({ preview = false }) {
    const content = (await getEmployeeOwnedTrustPage(preview)) ?? [];
    return {
        props: { preview, content },
    };
}
