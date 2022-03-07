import Head from 'next/head';
import type { JobPost } from 'lib/peopleHR';

export const SchemaGenerator = ({ job }: { job: JobPost }) => {
    let splittingString = ' - ';
    if (job.salaryRange.includes(' to ')) {
        splittingString = ' to ';
    }

    const minSalary = job.salaryRange.split(splittingString)[0];
    const maxSalary = job.salaryRange.split(splittingString)[1];
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
        "employerOverview": "Torchbox is the agency partner for socially progressive organisations with ambitious digital ideas. Services include UX Design, Website Development, Custom Web Apps, PPC & SEO, Google Analytics, Wagtail Development and Social Media Marketing.",
        "incentiveCompensation": "Torchbox is an employee owned company, with proceeds from profits awarded to employees twice a year. Performance related bonuses are also awarded.",
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
            },
            {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Remote",
                    "addressLocality": "Working from home",
                    "addressCountry": "Worldwide"
                }
            }
        ],
        "jobLocationType" : "TELECOMMUTE"
    }`;

    return (
        <Head>
            <script type="application/ld+json">{schema}</script>
        </Head>
    );
};
