import xml2js from 'xml2js';
import { JobPost, convertJSONToJobPosts } from 'lib/peopleHR';

/**
 * Converts XML to JSON using xml2js
 * @param xml
 * @returns JSON object
 */
async function parseXML(xml: string): Promise<any> {
    return await new Promise((resolve) =>
        xml2js.parseString(xml, (err: Error, result: any) => {
            if (err) {
                throw err;
            }
            resolve(result);
        }),
    );
}

/**
 * Gets Torchbox's active job listings from the PeopleHR RSS Feed
 * @returns an XML string, or null if a server error occurs.
 */
async function fetchPeopleHRFeed(): Promise<string | null> {
    if (process.env.PEOPLEHR_RSS_FEED_URL) {
        return fetch(process.env.PEOPLEHR_RSS_FEED_URL).then(
            async (response) => {
                if (response.ok) return parseXML(await response.text());
                throw new Error(
                    'Error fetching PeopleHR feed: RSS Feed URL not responding',
                );
            },
        );
    }
    throw new Error(
        'Error fetching PeopleHR feed: PEOPLEHR_RSS_FEED_URL is not defined',
    );
}

export async function getAllJobPostings(): Promise<JobPost[]> {
    const jobPostingData = await fetchPeopleHRFeed();
    return convertJSONToJobPosts(jobPostingData);
}

export async function getNumberOfActiveRoles(): Promise<number> {
    const allJobPosts = await getAllJobPostings();
    if (!allJobPosts || !allJobPosts.length) {
        return 0;
    }
    return allJobPosts?.length;
}
