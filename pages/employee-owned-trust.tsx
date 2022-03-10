import type { NextPage } from 'next';
import Layout from '../components/Layout';
import styles from 'styles/EmployeeOwnedTrust.module.scss';
import VoiceOfChange from 'components/EmployeeOwnedTrust/VoiceOfChange';
import { getEmployeeOwnedTrustPage } from '../lib/api';
import { EmployeeOwnedTrustPage } from 'types/pages/EmployeeOwnedTrust';
import RichText from 'components/RichText';
import Benefits from 'components/Benefits';
import { getNumberOfActiveRoles } from './api/_peopleHR';
import Metadata from 'components/Metadata';

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
    const benefits =
        content.itemsCollection.items[0].benefitsListCollection.items.map(
            (item: any) => item.benefitName,
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
                title="Real benefits in touch with real life"
                benefits={benefits}
            />

            <VoiceOfChange title="Be the voice of change">
                <p>
                    Our work has a shared purpose, but we wanted a way to share
                    our opinions, commit to initiatives that matter to us, and
                    work towards common goals across all aspects of Torchbox.
                </p>
                <p>
                    Our Voice Groups help shape our future priorities and
                    actions – from climate action to wellbeing and diversity –
                    each group has the authority to decide on new actions and
                    priorities and has access to a fund that they can decide on
                    how to use. Check out what we’ve achieved so far.
                </p>
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
