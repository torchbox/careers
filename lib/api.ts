//To be refactored when design is confirmed.
//See https://github.com/vercel/next.js/blob/41f87abdf7be4519e7d928bbed4dec314fcd7851/examples/cms-contentful/lib/api.js#L46

async function fetchGraphQL(query = "", preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
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

//Returns all content for index.ts
export async function getLandingPage(preview: boolean) {
    const landingPageContent = await fetchGraphQL(
        `{
            landingPage(id: "6PGx0sqpIVLFP3lzgtTSp1", preview: ` +
            preview +
            `) {
              title
              metadataDescription
              heroImage {
                description
                url
                width
                height
              }
            }
          }
        `,
        preview
    );
    return landingPageContent.data.landingPage;
}
