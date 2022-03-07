import Head from 'next/head';
import type { JobPost } from 'lib/peopleHR';

export const SchemaGenerator = ({ job }: { job: JobPost }) => {
    const minSalary = job.salaryRange.split(' - ')[0];
    const maxSalary = job.salaryRange.split(' - ')[1];
    const datePosted = new Date().toISOString();

    const schema = `
    {
        "@context": "http://schema.org",
        "@type": "JobPosting",
        "estimatedSalary": {
            "@type": "MonetaryAmount",
            "currency": "GBP",
            "value": {
                "@type": "QuantitativeValue",
                "minValue": "${minSalary}",
                "maxValue": "${maxSalary}",
                "unitText": "YEAR"
            }
        },
        "datePosted": "${datePosted}",
        "description": "${job.vacancyDescription}",
        "title": "${job.title}",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Torchbox Limited"
        },
        "jobLocation": [
            {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Southill Barn",
                    "addressLocality": "Charlbury",
                    "postalCode": "OX7 3EW",
                    "addressCountry": "UK"
                }
            },
            {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "15 Colston Street",
                    "addressLocality": "Bristol",
                    "postalCode": "BS1 5AP",
                    "addressCountry": "UK"
                }
            }
            {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Remote",
                    "addressLocality": "Working from home",
                    "addressCountry": "Worldwide"
                }
            }
        },
    }`;

    return (
        <Head>
            <script type="application/ld+json">{schema}</script>
        </Head>
    );
};
