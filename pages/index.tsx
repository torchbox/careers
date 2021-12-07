import type { NextPage } from "next";
import styles from "styles/Home.module.scss";
import { getLandingPage } from "../lib/api";
import Layout from "../components/Layout";
import Image from "next/image";

interface LandingPage {
    title: string;
    metadataDescription: string;
    heroImage: HeroImage;
}
interface HeroImage {
    description: string;
    url: string;
    width: number;
    height: number;
}

const LandingPage: NextPage<{
    preview: boolean;
    landingPageContent: LandingPage;
}> = ({ preview, landingPageContent }) => {
    return (
        <>
            <Layout preview={preview}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{landingPageContent.title}</h1>
                    <Image
                        src={landingPageContent.heroImage.url}
                        alt={landingPageContent.heroImage.description}
                        width={landingPageContent.heroImage.width}
                        height={landingPageContent.heroImage.height}
                    />
                    <p>{landingPageContent.metadataDescription}</p>
                </div>
            </Layout>
        </>
    );
};

export default LandingPage;

export async function getStaticProps({ preview = false }) {
    const landingPageContent = (await getLandingPage(preview)) ?? [];
    return {
        props: { preview, landingPageContent },
    };
}
