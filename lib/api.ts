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

const pageMetadata = `
    metadataTitle
    metadataDescription
    metadataSocialMediaImage {
        description
        url
        width
        height
    }
`;

const benefits = `
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
`;

const testimonial = `
    ... on Testimonial {
        quote
        quotee {
            name
            role
            image {
                url
                description
                width
                height
            }
        }
    }
`;

export async function getLandingPage(preview: boolean) {
    const landingPageContent = await fetchGraphQL(
        `{
            landingPageCollection(limit: 1, preview: ` +
            preview +
            `) {
            items {
                ${pageMetadata}
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

                            ${benefits}

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

export async function getLifeAtTorchboxPage(preview: boolean) {
    const lifeAtTorchboxPageContent = await fetchGraphQL(
        `{
            lifeAtTorchboxPageCollection(limit: 1, preview: ` +
            preview +
            `) {
            items {
                ${pageMetadata}
                heroImage {
                    url
                    description
                    width
                    height
                  }
                heroVideo {
                    url
                    description
                }
                heroSubtitle
                heroDescription {
                    json
                }
                itemsCollection(limit: 2) {
                    items {
                      ${testimonial}
                      ... on TorchboxValuesCarousel {
                        valuesCollection(limit: 6) {
                          items {
                            valueName
                            valueSnippet
                            valueImage {
                              url
                              description
                              width
                              height
                            }
                          }
                        }
                      }
                    }
                  }
                  valueCarouselTitle
                  valueCarouselDescription {
                    json
                  }
                }
            }
        }
        `,
        preview,
    );

    return lifeAtTorchboxPageContent.data.lifeAtTorchboxPageCollection.items[0];
}

export async function getEmployeeOwnedTrustPage(preview: boolean) {
    const employeeOwnedTrustPageContent = await fetchGraphQL(
        `{
          eotPageCollection(limit: 1, preview: ` +
            preview +
            `) {
          items {
              ${pageMetadata}
              subtitle
              content {
                json
                links {
                  entries {
                    block {
                      __typename
                      sys {
                        id
                      }
                      ... on Quote {
                        quote
                        name
                        role
                      }
                    }
                  }
                }
              }
              itemsCollection(limit: 1) {
                  items {
                    ${benefits}
                    ... on VoiceOfChange {
                      title
                      content {
                        json
                      }
                    }
                  }
              }
              }
          }
      }
      `,
        preview,
    );

    return employeeOwnedTrustPageContent.data.eotPageCollection.items[0];
}
