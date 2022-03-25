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

const clients = `
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
}`;

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
                    url(transform: {
                      width: 1400,
                      height: 1000
                    })
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
                                    url(transform: {
                                      width: 800,
                                      height: 800
                                    })
                                    width
                                    height
                                  }
                                  description
                                }
                              }
                            }

                            ${benefits}

                            ${clients}

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
                    url(transform: {
                      width: 2000,
                      height: 1200
                    })
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
                    url(transform: {
                        width: 1000,
                        height: 1000
                    })
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
                mainContentTitleFirstLine
                mainContentTitleSecondLine
                mainContentTitleThirdLine
                mainContent {
                    json
                }
                atWorkTitle
                atPlayTitle
                atWorkDescription {
                    json
                  }
                atPlayDescription {
                    json
                }
                workLocations {
                    locationListCollection(limit: 4){
                        items {
                            locationName
                        }
                    }
                }
                itemsCollection(limit: 2) {
                    items {
                      __typename
                      ${testimonial}
                      ... on TorchboxValuesCarousel {
                        valuesCollection(limit: 6) {
                          items {
                            valueName
                            valueSnippet
                            valueImage {
                              url(transform: {
                                width: 1000,
                                height: 1000
                              })
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
                  valueCarouselIntroduction {
                    json
                  }
                  valuesDescription {
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

export async function getJobListingPage(preview: boolean) {
    const pageContent = await fetchGraphQL(
        `{
        jobListingPageCollection(limit: 1, preview: ` +
            preview +
            `) {
            items {
              ${pageMetadata}
              firstTitleLine
              secondTitleLine
              subtitle {
                json
              }
              ctaTitle
              ctaDescription {
                json
              }
            }
          }
        }`,
        preview,
    );
    return pageContent.data.jobListingPageCollection.items[0];
}

export async function getJobPage(preview: boolean) {
    const pageContent = await fetchGraphQL(
        `{
          jobPageCollection(limit: 1, preview: ` +
            preview +
            `) {
              items {
                ${pageMetadata}
                hiringPolicyTitle
                hiringPolicyDescription {
                  json
                }
                itemsCollection {
                  items {
                    __typename
                    ${benefits}
                    ${clients}
                  }
                }
              }
            }
          }`,
        preview,
    );
    return pageContent.data.jobPageCollection.items[0];
}

export async function getEmployeeOwnedTrustPage(preview: boolean) {
    const content = await fetchGraphQL(
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
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    width
                    height
                    description
                  }
                }
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
            itemsCollection(limit: 2) {
              items {
                __typename
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

    return content.data.eotPageCollection.items[0];
}

export async function getTorchboxAcademyPage(preview: boolean) {
    const content = await fetchGraphQL(
        `{
          torchboxAcademyPageCollection(limit: 1, preview: ` +
            preview +
            `) {
          items {
              ${pageMetadata}
              heroSubtitle
              heroDescription {
                json
              }
              heroImage {
                description
                url
                width
                height
              }
              quote
              quoteAuthor
              introductionTitle
              introductionContent {
                json
              }
              introductionPhoto {
                description
                url
                width
                height
              }
              mainSectionTitle
              mainSectionContent {
                json
              }
              academyDaysCollection(limit: 2) {
                items {
                  title
                  description {
                    json
                  }
                  applicationLink
                }
              }
              inclusiveSectionTitle
              inclusiveSectionContent {
                json
              }
              inclusiveSectionPhoto {
                description
                url
                width
                height
              }
              typicalDayTitle
              typicalDayFirstHeading
              typicalDayFirstContent {
                json
              }
              typicalDaySecondHeading
              typicalDaySecondContent {
                json
              }
              applicationProcessTitle
              applicationProcessDescription {
                json
              }
              applicationProcessStepOne {
                json
              }
              applicationProcessStepTwo {
                json
              }
              applicationProcessStepThree {
                json
              }
            }
          }
        }`,
        preview,
    );

    return content.data.torchboxAcademyPageCollection.items[0];
}
