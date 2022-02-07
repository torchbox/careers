import { NextApiRequest, NextApiResponse } from 'next';
import { JobPost } from 'lib/peopleHR';
import { getAllJobPostings } from '../_peopleHR';

async function getJobPost(slug: string): Promise<JobPost | undefined | null> {
    const jobPostings: JobPost[] | null = await getAllJobPostings();
    if (jobPostings === null) return null;
    return jobPostings.find((post) => post.slug === slug);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.headers.authorization === process.env.PEOPLEHR_AUTH_TOKEN) {
        const { slug } = req.query;
        if (typeof slug === 'string') {
            const jobPost = await getJobPost(slug);
            if (!jobPost) {
                res.status(404).end('Job Post Not Found');
            } else {
                res.status(200).json(jobPost);
            }
        } else {
            res.status(400).end('Invalid request');
        }
    } else {
        res.status(403).end('Unauthorised request.');
    }
}
