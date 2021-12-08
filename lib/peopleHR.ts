import xml2js from "xml2js";

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

    //Todo: This doesn't work for the first job post?
    description = description.replace(/\<hr\>/gm, "");

    return description;
}

export async function getJobDescriptions() {
    const entries = await fetchPeopleHRFeed();
    const entriesJSON: any = await parseXml(entries);

    let descriptions: string[] = [];
    for (let i = 0; i < 8; i++) {
        let rawHTML = entriesJSON.rss.channel[0].item[i].description[0];
        descriptions.push(processHTML(rawHTML));
    }
    return descriptions;
}

export async function getHRData() {
    const entries = await fetchPeopleHRFeed();
    return await parseXml(entries);
}
