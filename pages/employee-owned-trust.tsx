import type { NextPage } from 'next';
import Layout from '../components/Layout';
import styles from 'styles/EmployeeOwnedTrust.module.scss';
import VoiceOfChange from 'components/EmployeeOwnedTrust/VoiceOfChange';

const Title = () => (
    <h1 className={styles.title}>
        We&apos;re 100% <br aria-hidden />
        <span className={styles.accent}>employee-owned</span>
    </h1>
);

type EmployeeOwnedTrustPageProps = {
    preview: boolean;
};

const EmployeeOwnedTrustPage: NextPage<EmployeeOwnedTrustPageProps> = ({
    preview,
}) => {
    return (
        <Layout theme="LIGHT" preview={preview} jobsAvailable={8}>
            <div className={styles.textContent}>
                <Title />
                <p className={styles.subtitle}>
                    This page is hardcoded, #46 has the API setup.
                </p>
            </div>

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
    return {
        props: { preview },
    };
}
