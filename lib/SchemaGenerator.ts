//WIP: Based on the outline at https://jsonld.com/job-posting/

export default function generateJobPostingSchema(jobPosting: any) {
    return `
    <script type = "application/ld+json" > {
        "@context": "http://schema.org",
        "@type": "JobPosting",
        "estimatedSalary": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": {
                "@type": "QuantitativeValue",
                "minValue": "None",
                "maxValue": "None",
                "unitText": "YEAR"
            }
        },
        "datePosted": "2019-09-24T00:00:00",
        "description": "You have creative and original ideas about how to efficiently integrate a platform that can provide grassroots campaign with Wordpress. You understand everything Wordpress, html, how to create membership login and logout, and how to do custom coding.",
        "title": "Wordpress Developer",
        "validThrough": "2019-10-24T00:00:00",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "The Love Story"
        },
        "identifier": {
            "@type": "PropertyValue",
            "name": "The Love Story",
            "value": "1569590910216317883"
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
        },
         "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "value": 40.00,
          "unitText": "HOUR"
        }
      }
    
    } </script>
    `;
}
