// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ name: "John Doe" });
}

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

export async function getAllTestimonials(preview: boolean) {
    const entries = await fetchGraphQL(
        `{
            testimonialCollection {
              items {
                title
                quote
                quotee {
                  name
                  role
                }
              }
            }
          }
        `,
        preview
    );
    return entries.data.testimonialCollection.items;
}
