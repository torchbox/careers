// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPost, createJobSummaryFromPost } from 'lib/peopleHR';
import { getAllJobPostings } from 'pages/api/_peopleHR';

/**
 * Gets a condensed description and general information for each job.
 * @returns an array of job summaries.
 */
export async function getAllJobSummaries() {
    const jobPostings: JobPost[] = await getAllJobPostings();
    return jobPostings.map((post) => createJobSummaryFromPost(post));
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const summaries = await getAllJobSummaries();
    if (req.headers.authorization === process.env.PEOPLEHR_AUTH_TOKEN) {
        if (!summaries) {
            res.status(500).end('Internal server error.');
        } else {
            res.status(200).json(summaries);
        }
    } else {
        res.status(403).end('Unauthorised request.');
    }
}
