/* eslint-disable react/no-invalid-html-attribute */
import Head from 'next/head';
import { ImageTypes } from 'types/Base';

type MetadataProps = {
    title: string;
    description: string;
    image: ImageTypes;
    slug: string;
};

export const Metadata = ({
    title = 'Torchbox Careers',
    description = "Are you a talented digital designer, UX consultant, Django engineer, search specialist or digital marketer? Then check out our jobs - we'd love to hear from you! Oxford, Bristol or remote.",
    image,
    slug = '',
}: MetadataProps) => (
    <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="generator" content="Next.js, Vercel, PeopleHR" />
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta
            property="og:url"
            content={`https://torchbox.com/careers/${slug}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image.url} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
            property="twitter:url"
            content={`https://torchbox.com/careers/${slug}`}
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image.url} />
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/careers/apple-touch-icon.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/careers/favicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/careers/favicon-16x16.png"
        />
        <link rel="manifest" href="/careers/site.webmanifest" />
        <link
            rel="mask-icon"
            href="/careers/safari-pinned-tab.svg"
            color="#5bbad5"
        />
        <meta name="apple-mobile-web-app-title" content="Torchbox" />
        <meta name="application-name" content="Torchbox" />
        <meta name="msapplication-TileColor" content="#fd5765" />
        <meta name="theme-color" content="#ffffff" />
        <link
            rel="schema.dcterms"
            href="https://dublincore.org/specifications/dublin-core/dcmi-terms/"
        ></link>
        <meta name="dcterms.dateCopyrighted" content="2022" />
        <meta name="dcterms.rightsHolder" content="Torchbox Limited" />
    </Head>
);

export default Metadata;
