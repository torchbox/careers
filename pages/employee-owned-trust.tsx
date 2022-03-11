import type { NextPage } from 'next';
import type { EmployeeOwnedTrustPage } from 'types/pages/EmployeeOwnedTrust';
import Layout from 'components/Layout';
import VoiceOfChange from 'components/EmployeeOwnedTrust/VoiceOfChange';
import Benefits from 'components/Benefits';
import RichText from 'components/RichText';
import Metadata from 'components/Metadata';
import { getEmployeeOwnedTrustPage } from 'lib/api';
import { getNumberOfActiveRoles } from './api/_peopleHR';
import styles from '../styles/pages/EmployeeOwnedTrust.module.scss';

const Title = () => (
    <h1 className={styles.title}>
        We&apos;re 100% <br aria-hidden />
        <span className={styles.accent}>employee-owned</span>
    </h1>
);

type EmployeeOwnedTrustPageProps = {
    preview: boolean;
    jobsAvailable: number;
    content: EmployeeOwnedTrustPage;
};

const EmployeeOwnedTrustPage: NextPage<EmployeeOwnedTrustPageProps> = ({
    preview,
    jobsAvailable,
    content,
}) => {
    const benefitCollection = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'Benefits',
    );

    const benefits = benefitCollection.benefitsListCollection.items.map(
        (item: any) => item.benefitName,
    );

    const voiceOfChangeCollection = content.itemsCollection.items.find(
        (obj: any) => obj.__typename === 'VoiceOfChange',
    );

    return (
        <Layout theme="LIGHT" preview={preview} jobsAvailable={jobsAvailable}>
            <Metadata
                title={content.metadataTitle}
                description={content.metadataDescription}
                slug="employee-owned-trust"
                image={content.metadataSocialMediaImage}
            />

            <div className={styles.textContent}>
                <Title />
                <p className={styles.subtitle}>{content.subtitle}</p>
                <RichText theme="LIGHT" content={content.content} />
            </div>

            <Benefits
                title={benefitCollection.benefitsTitle}
                benefits={benefits}
            />

            <VoiceOfChange title={voiceOfChangeCollection.title}>
                <RichText
                    theme={'LIGHT'}
                    content={voiceOfChangeCollection.content}
                />
            </VoiceOfChange>
        </Layout>
    );
};

export default EmployeeOwnedTrustPage;

export async function getStaticProps({ preview = false }) {
    const content = await getEmployeeOwnedTrustPage(preview);
    const jobsAvailable = await getNumberOfActiveRoles();
    return {
        props: { preview, jobsAvailable, content },
    };
}
