import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { JobPost, convertJSONToJobPosts } from 'lib/peopleHR';

// Code based on the following tutorial
// https://medium.com/@boris.poehland.business/next-js-api-routes-how-to-read-files-from-directory-compatible-with-vercel-5fb5837694b9

// One hour, measured in milliseconds
const CACHE_TTL = 60 * 60 * 1000;
const CACHE_FOLDER = 'cachedData';
const CACHE_FILENAME = 'peopleHRcache.json';

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

function writeToCache(
    cacheFilePath: string,
    fileData: { lastUpdated: number; jobs: any },
) {
    try {
        // Check if cache folder exists before writing
        const cacheFileFolder = path.resolve(process.cwd(), CACHE_FOLDER);
        if (!existsSync(cacheFileFolder)) {
            mkdirSync(cacheFileFolder);
        }

        writeFileSync(cacheFilePath, JSON.stringify(fileData));
    } catch (error) {
        console.error('Error writing to the PeopleHR cache file: ', error);
    }
}

/**
 * Pulls the PeopleHR RSS feed data from the cache,
 * or fetches it from the feed if the cache has expired
 * @returns JSON of the RSS feed
 */
async function getJobPostingData() {
    const cacheFilePath = path.resolve(
        process.cwd(),
        CACHE_FOLDER,
        CACHE_FILENAME,
    );

    if (existsSync(cacheFilePath)) {
        let cache = {} as any;

        try {
            cache = JSON.parse(readFileSync(cacheFilePath, 'utf8'));
        } catch (error) {
            console.error(
                'Error reading and parsing the PeopleHR cache file: ',
                error,
            );
            cache.lastUpdated = 0; // Force a rewrite to the cache if the cache has become corrupted
        }

        if (cache.lastUpdated + CACHE_TTL < Date.now()) {
            // The cache has timed out, fetch new data from PeopleHR

            const peopleHRJobPostings = await fetchPeopleHRFeed();

            // If the server responds OK, update according to the feed contents
            const fileData = {
                lastUpdated: Date.now(),
                jobs: peopleHRJobPostings,
            };

            writeToCache(cacheFilePath, fileData);

            return peopleHRJobPostings;
        }

        // The cache has not timed out yet, return the cached JSON
        return cache.jobs;
    }

    // If the cache file doesn't exist, create one
    const peopleHRJobPostings = await fetchPeopleHRFeed();

    // Create a new file and set the cache
    const fileData = {
        lastUpdated: Date.now(),
        jobs: peopleHRJobPostings,
    };

    writeToCache(cacheFilePath, fileData);

    return peopleHRJobPostings;
}

export async function getAllJobPostings(): Promise<JobPost[]> {
    const jobPostingData = await getJobPostingData();
    return convertJSONToJobPosts(jobPostingData);
}

export async function getNumberOfActiveRoles(): Promise<number> {
    const allJobPosts = await getAllJobPostings();
    if (!allJobPosts || !allJobPosts.length) {
        return 0;
    }
    return allJobPosts?.length;
}
