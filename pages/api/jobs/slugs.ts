import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPost } from 'lib/peopleHR';
import { getAllJobPostings } from 'pages/api/_peopleHR';
import urls from 'lib/urls';

/**
 * Used for generating pages in jobs/[slug].tsx
 * @returns an array of URL slugs for all the job posts.
 */
export async function getAllJobSlugs(): Promise<string[]> {
    const jobPostings: JobPost[] = await getAllJobPostings();
    return jobPostings.map((post) => `${urls.jobs}${post.slug}`);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.headers.authorization === process.env.PEOPLEHR_AUTH_TOKEN) {
        const slugs = await getAllJobSlugs();
        if (!slugs) {
            res.status(500).end('Internal server error.');
        } else {
            res.status(200).json(slugs);
        }
    } else {
        res.status(403).end('Unauthorised request.');
    }
}
