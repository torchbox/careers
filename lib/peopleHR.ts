import xml2js from "xml2js";

//Todo: refactor the JobPost so it fails gracefully with missing data: how to do this?
//Todo: refactor the JobPost so it uses strings instead of string[]
export interface JobPost {
    title: string[];
    description: string[];
    link?: string[] | null;
    JobURL?: string[] | null;
    vacancyname?: string[] | null;
    vacancydescription?: string[] | null;
    department?: string[] | null;
    jobtitle?: string[] | null;
    salaryrange?: string[] | null;
    city?: string[] | null;
    company?: string[] | null;
    reference?: string[] | null;
}

async function fetchPeopleHRFeed() {
    return fetch(`${process.env.PEOPLEHR_RSS_FEED_URL}`).then((response) =>
        response.text()
    );
}

async function parseXml(xmlString: string) {
    return await new Promise((resolve, reject) =>
        xml2js.parseString(xmlString, (err: Error, jsonData: any) => {
            if (err) {
                reject(err);
            }
            resolve(jsonData);
        })
    );
}

function processHTML(description: string) {
    //Remove any zero width spaces (causes a blank new line in some <p> tags)
    description = description.replace(/\u200B/g, "");

    //Replace strong emphasis tags with bold italic text. //Gmail formatting?
    description = description.replace(
        /<strong><[^\<]+<em>([^\<]+)<\/em><\/font><\/strong>/gm,
        `<b class="bold-italic-rich-text"><i>$1</i></b>`
    );

    //Replace bold italic styling with bold italic text.
    description = description.replace(
        /<[^\<]+font-weight: 700; font-style: italic;[^\>]*>([^\<]+)\<\/font>/gm,
        `<b class="bold-italic-rich-text"><i>$1</i></b>`
    );

    //Replace bold font decelerations with bold text.
    description = description.replace(
        /\<[^\<]+font-weight: 700;[^\>]+\>([^\<]+)<\/font>/gm,
        `<b class="bold-rich-text">$1</b>`
    );

    //Replace any italic font decelerations with italic text.
    description = description.replace(
        /\<[^\<]+font-style: italic;[^\>]+\>([^\<]+)<\/font>/gm,
        `<i class="italic-rich-text">$1</i>`
    );

    //Remove all <br>'s, as paragraph styling will create breaks in text.
    description = description.replace(/\<br[^\>]*\>/gm, "");

    //Remove all font tags and any styling of text.
    description = description.replace(/style="[^"]+"/gm, "");
    description = description.replace(/\<font[^\>]+\>/gm, "");
    description = description.replace(/\<\/font\>/gm, "");

    //Remove role=presentation and aria-level=1 from list items
    description = description.replace(/\s*role="presentation"\s*/gm, "");
    description = description.replace(/\s*aria-level="1"\s*/gm, "");

    //Remove excess attributes from paragraph tags
    description = description.replace(/\s*dir="ltr"\s*/gm, "");
    description = description.replace(/\s*_rdeditor_exists="1"\s*/gm, "");

    //Remove any empty paragraph tags (these shouldn't cause whitespace anyway, but just in case)
    description = description.replace(/\<p[ ]*\>[ ]*\<\/p\>/gm, "");
    //In the first job posting there are two levels of empty tags to remove.
    description = description.replace(/\<p[ ]*\>[ ]*\<\/p\>/gm, "");

    return description;
}

function convertTitleToSlug(title: string) {
    title = title.toLowerCase();
    title = title.replace(/[^a-zA-Z0-9]+/g, "-");
    return title;
}

async function getHRData() {
    const entries = await fetchPeopleHRFeed();
    return await parseXml(entries);
}

export async function getAllJobSlugs() {
    let feedData: any = await getHRData();
    let jobPostings: JobPost[] = feedData.rss.channel[0].item;

    //Todo: refactor as a array.map
    let slugs: string[] = [];
    for (let i = 0; i < jobPostings.length; i++) {
        slugs.push(convertTitleToSlug(jobPostings[i].title[0]));
    }

    return slugs;
}

export async function getAllJobs() {
    let feedData: any = await getHRData();
    let jobPostings: JobPost[] = feedData.rss.channel[0].item;

    return jobPostings;
}

export async function getJobData(slug: string) {
    let feedData: any = await getHRData();
    let jobPostings: JobPost[] = feedData.rss.channel[0].item;

    //Todo: this default post needs reconsideration.
    //This is not a good fallback to use with ISR, many spoof pages could be cached pointlessly.
    let jobPosting: JobPost = {
        title: ["Error"],
        description: ["This job was unable to be found."],
    };

    //Todo: better way to retrieve the job from the list than generating each slug?
    for (let i = 0; i < jobPostings.length; i++) {
        let jobSlug = convertTitleToSlug(jobPostings[i].title[0]);

        if (jobSlug === slug) {
            jobPosting = jobPostings[i];
            jobPosting.description[0] = processHTML(jobPosting.description[0]);
        }
    }

    return jobPosting;
}
