import xml2js from 'xml2js';
import { Window } from 'happy-dom';

export interface JobPost {
    title: string;
    description: string;
    link: string;
    jobURL: string;
    vacancyDescription: string;
    department: string;
    salaryRange: string;
    city: string;
    slug: string;
}

export interface JobSummary {
    title: string;
    description: string;
    department: string;
    city: string;
    slug: string;
}

async function fetchPeopleHRFeed(): Promise<string> {
    return fetch(`${process.env.PEOPLEHR_RSS_FEED_URL}`).then((response) =>
        response.text(),
    );
}

async function parseXml(xmlString: string): Promise<any> {
    return await new Promise((resolve, reject) =>
        xml2js.parseString(xmlString, (err: Error, jsonData: any) => {
            if (err) {
                reject(err);
            }
            resolve(jsonData);
        }),
    );
}

/**
 * Completely removes HTML elements (and their children) from the text
 * @param text HTML to be processed
 * @param blocklist HTML tags to be removed
 * @returns
 */
function removeAllElementsInBlocklist(text: string, blocklist: string[]) {
    const window = new Window();
    const document = window.document;

    document.body.innerHTML = text;

    blocklist.forEach((tag) => {
        const elements = document.querySelectorAll(tag);
        elements.forEach((element) => {
            element.remove();
        });
    });

    return document.body.innerHTML;
}

/**
 * Formats HTML with a virtual DOM and Regex.
 * @param description A string of HTML markup
 * @returns A formatted HTML string
 */
export function cleanUpHTML(description: string): string {
    const blocklist = ['script', 'style', 'iframe', 'br'];
    //We can't remove the font tags this way as it will delete their child paragraphs.
    description = removeAllElementsInBlocklist(description, blocklist);

    //Remove any zero width spaces (causes a blank new line in some <p> tags)
    description = description.replace(/\u200B/g, '');

    //Replace strong emphasis tags with bold italic text.
    description = description.replace(
        /<strong><[^\<]+<em>([^\<]+)<\/em><\/font><\/strong>/gm,
        `<b class="bold-italic-rich-text"><i>$1</i></b>`,
    );

    //Replace bold italic styling with bold italic text.
    description = description.replace(
        /<[^\<]+font-weight: 700; font-style: italic;[^\>]*>([^\<]+)\<\/font>/gm,
        `<b class="bold-italic-rich-text"><i>$1</i></b>`,
    );

    //Replace bold font decelerations with bold text.
    description = description.replace(
        /\<[^\<]+font-weight: 700;[^\>]+\>([^\<]+)<\/font>/gm,
        `<b class="bold-rich-text">$1</b>`,
    );

    //Replace any italic font decelerations with italic text.
    description = description.replace(
        /\<[^\<]+font-style: italic;[^\>]+\>([^\<]+)<\/font>/gm,
        `<i class="italic-rich-text">$1</i>`,
    );

    //Remove all font tags and any styling of text.
    description = description.replace(/style="[^"]+"/gm, '');
    description = description.replace(/\<font[^\>]+\>/gm, '');
    description = description.replace(/\<\/font\>/gm, '');

    //Remove role=presentation and aria-level=1 from list items
    description = description.replace(/\s*role="presentation"\s*/gm, '');
    description = description.replace(/\s*aria-level="1"\s*/gm, '');

    //Remove excess attributes from paragraph tags
    description = description.replace(/\s*dir="ltr"\s*/gm, '');
    description = description.replace(/\s*_rdeditor_exists="1"\s*/gm, '');

    //Remove any empty paragraph tags (these shouldn't cause whitespace anyway, but just in case)
    description = description.replace(/\<p[ ]*\>[ ]*\<\/p\>/gm, '');
    //In the first job posting there are two levels of empty tags to remove.
    description = description.replace(/\<p[ ]*\>[ ]*\<\/p\>/gm, '');

    return description;
}

function invalidValue(value: any) {
    if (value === '') return true;
    if (!value) return true;
    return false;
}

function jobPostingJSONIsValid(json: any) {
    //To be refactored with neater code and Sentry warnings
    if (invalidValue(json.title[0])) return false; //throw Error('Job post title undefined.');
    if (invalidValue(json.description[0])) return false; //throw Error('Job post description undefined.');
    if (invalidValue(json.link[0])) return false; //throw Error('Job post link undefined.');
    if (invalidValue(json.JobURL[0])) return false; //throw Error('Job post JobURL (application URL) undefined.');
    if (invalidValue(json.vacancydescription[0])) return false; //throw Error('Job post vacancy description undefined.');
    if (invalidValue(json.city[0])) return false; //throw Error('Job post city undefined.');
    if (invalidValue(json.department[0])) return false; //throw Error('Job post department undefined.');
    if (invalidValue(json.salaryrange[0])) return false; //throw Error('Job post salary range undefined.');

    return true;
}

/**
 * convertTitleToSlug
 * @param title of the job posting
 * @returns a formatted slug
 */
export function convertTitleToSlug(title: string): string {
    title = title.toLowerCase();
    title = title.replace(/[^a-zA-Z0-9]+/g, '-');
    return title;
}

/**
 * Bridge between messy JSON and clearly typed data.
 * @param json the JSON for a single job post
 * @returns JobPost if valid, otherwise returns undefined
 */
export function createJobPostFromJSON(json: any) {
    const slug: string = convertTitleToSlug(json.title[0]);

    if (jobPostingJSONIsValid(json)) {
        const job: JobPost = {
            title: json.title[0],
            description: cleanUpHTML(json.description[0]),
            link: json.link[0],
            jobURL: json.JobURL[0],
            vacancyDescription: json.vacancydescription[0],
            department: json.department[0],
            salaryRange: json.salaryrange[0],
            city: json.city[0],
            slug: slug,
        };

        return job;
    } else {
        return undefined;
    }
}

export function createJobSummaryFromPost(post: JobPost): JobSummary {
    return {
        title: post.title,
        description: post.vacancyDescription,
        city: post.city,
        department: post.department,
        slug: post.slug,
    };
}

/**
 * Converts only valid job JSON into posts
 * @param json RSS feed JSON for all job posts
 * @returns Array of JobPost
 */
function convertJSONToJobPosts(json: any): JobPost[] {
    const jobPostingsJSON = json.rss.channel[0].item;

    let jobPosts: JobPost[] = [];

    for (let i = 0; i < jobPostingsJSON.length; i++) {
        let job: JobPost | undefined = createJobPostFromJSON(
            jobPostingsJSON[i],
        );
        if (job) {
            jobPosts.push(job);
        }
    }

    return jobPosts;
}

export async function getAllJobPostings(): Promise<JobPost[]> {
    const peopleHRJobPostingsXML = await fetchPeopleHRFeed();
    const peopleHRJobPostings: any = await parseXml(peopleHRJobPostingsXML);
    return convertJSONToJobPosts(peopleHRJobPostings);
}

export async function getAllJobSlugs(): Promise<(string | undefined)[]> {
    const jobPostings: JobPost[] = await getAllJobPostings();
    return jobPostings.map((post) => post.slug);
}

/**
 * Used for generating pages in jobs/[slug].tsx
 * @param slug - use valid slug from getAllJobSlugs
 * @returns JobPost that matches the slug
 */
export async function getJobPost(slug: string): Promise<JobPost | undefined> {
    const jobPostings: JobPost[] = await getAllJobPostings();
    return jobPostings.find((post) => post.slug === slug);
}

export async function getAllJobSummaries() {
    const jobPostings: JobPost[] = await getAllJobPostings();
    return jobPostings.map((post) => createJobSummaryFromPost(post));
}
