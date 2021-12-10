import xml2js from 'xml2js';

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

export function cleanUpHTML(description: string): string {
    //Remove any zero width spaces (causes a blank new line in some <p> tags)
    description = description.replace(/\u200B/g, '');

    //Remove all script tags, including their contents
    description = description.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        '',
    );

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

    //Remove all <br>'s, as paragraph styling will create breaks in text.
    description = description.replace(/\<br[^\>]*\>/gm, '');

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

export function convertTitleToSlug(title: string): string {
    title = title.toLowerCase();
    title = title.replace(/[^a-zA-Z0-9]+/g, '-');
    return title;
}

export function createJobPostFromJSON(json: any) {
    const slug: string = convertTitleToSlug(json.title[0]);

    //Todo: Add error catching and Sentry logging here!
    //Catch if any of the vital job post fields are missing.
    //Create a seperate function for this so it can be reused in create job summary.

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
}

export function createJobSummaryFromPost(post: JobPost): JobSummary {
    if (post.title === undefined) throw Error('title undefined.');
    if (post.vacancyDescription === undefined)
        throw Error('vacancyDescription undefined.');
    if (post.city === undefined) throw Error('city undefined.');
    if (post.department === undefined) throw Error('department undefined.');
    if (post.slug === undefined) throw Error('slug undefined.');

    return {
        title: post.title,
        description: post.vacancyDescription,
        city: post.city,
        department: post.department,
        slug: post.slug,
    };
}

function convertJSONToJobPosts(json: any): JobPost[] {
    const jobPostingsJSON = json.rss.channel[0].item;
    return jobPostingsJSON.map((jobPostJSON: any) =>
        createJobPostFromJSON(jobPostJSON),
    );

    //We could add error catching in converting the posts
    //If any errors occur, the post isn't created & we throw an error with Sentry?
    //I'd prefer to render the job, and not show the missing information.
    /*
    const jobPostings: JobPost[] = [];

    for (let i = 0; i < jobPostingsJSON.length; i++) {
        jobPostings.push(createJobPostFromJSON(jobPostingsJSON[i]));
    }

    return jobPostings;
    */
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

export async function getJobPost(slug: string): Promise<JobPost | undefined> {
    const jobPostings: JobPost[] = await getAllJobPostings();
    return jobPostings.find((post) => post.slug === slug);
}

export async function getAllJobSummaries() {
    const jobPostings: JobPost[] = await getAllJobPostings();
    return jobPostings.map((post) => createJobSummaryFromPost(post));
}
