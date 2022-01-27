// Following the code from the Contentful Vercel demonstration library
// https://github.com/vercel/next.js/blob/41f87abdf7be4519e7d928bbed4dec314fcd7851/examples/cms-contentful/lib/api.js#L46

async function fetchGraphQL(query = "", preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_API_URL}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    preview
                        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                        : process.env.CONTENTFUL_ACCESS_TOKEN
                }`,
            },
            body: JSON.stringify({ query }),
        }
    ).then((response) => response.json());
}

export async function getLandingPage(preview: boolean) {
    const landingPageContent = await fetchGraphQL(
        `{
            landingPageCollection(limit: 1, preview: ` +
            preview +
            `) {
            items {
                title
                metadataDescription
                metadataSocialImage {
                    description
                    url
                    width
                    height
                }
                heroImage {
                    description
                    url
                    width
                    height
                }
                heroTagline {
                    json
                }
                missionTitle
                missionDescription {
                    json
                }
                itemsCollection {
                    items {
                    __typename
                    ... on ProfileImages {
                        imagesCollection(limit: 8) {
                        items {
                            image {
                            title
                            description
                            contentType
                            fileName
                            size
                            url
                            width
                            height
                            }
                            description
                        }
                        }
                    }
                    ... on Benefits {
                        benefitsTitle
                        benefitsIntro
                        benefitsListCollection(limit: 8) {
                        items {
                            benefitName
                            benefitSnippet
                        }
                        }
                    }
                    }
                }
                workForYouDescription {
                    json
                }
                workForYouImage {
                    description
                    url
                    width
                    height
                }
                lifeAsATorchboxer {
                    json
                }
                ctaTitle
                ctaDescription {
                    json
                }
                }
            }
        }
        `,
        preview
    );

    return landingPageContent.data.landingPageCollection.items[0];
}
