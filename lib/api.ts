// Following the code from the Contentful Vercel demonstration library
// https://github.com/vercel/next.js/blob/41f87abdf7be4519e7d928bbed4dec314fcd7851/examples/cms-contentful/lib/api.js#L46

async function fetchGraphQL(query = "", preview = false) {
    console.log(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_API_URL}`
    );
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
                heroImage {
                    description
                    url
                    width
                    height
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
