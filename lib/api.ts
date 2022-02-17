// Following the code from the Contentful Vercel demonstration library
// https://github.com/vercel/next.js/blob/41f87abdf7be4519e7d928bbed4dec314fcd7851/examples/cms-contentful/lib/api.js#L46

async function fetchGraphQL(query = '', preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_API_URL}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${
                    preview
                        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                        : process.env.CONTENTFUL_ACCESS_TOKEN
                }`,
            },
            body: JSON.stringify({ query }),
        },
    ).then((response) => response.json());
}

export async function getLandingPage(preview: boolean) {
    const landingPageContent = await fetchGraphQL(
        `{
            landingPageCollection(limit: 1, preview: ` +
            preview +
            `) {
            items {
                metadataTitle
                metadataDescription
                metadataSocialMediaImage {
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
                    ... on Clients {
                            clientsCollection(limit: 8){
                              items {
                                clientName
                                clientLogo {
                                  width
                                  height
                                  description
                                  url
                                }
                              }
                            }
                          }

                    ... on MusingsFromTheTeam {
                        blogPostsCollection(limit: 3){
                          items {
                            title
                            slug
                            date
                            author {
                              name
                              role
                              image {
                                url(transform: {
                                    width: 100,
                                    height: 100
                                })
                                width
                                height
                                description
                              }
                            }
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
        preview,
    );

    return landingPageContent.data.landingPageCollection.items[0];
}
