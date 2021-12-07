import type { NextApiResponse } from "next";

function generateSiteMap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the URLs we know already-->
     <url>
       <loc><!--URL Here--></loc>
     </url>
     <url>
       <loc><!--URL Here--></loc>
     </url>
   </urlset>
 `;
}

/* 
    ${posts
    .map(({ id }) => {
        return `
    <url>
        <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
    </url>
    `
*/

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
    // We make an API call to gather the URLs for our site
    //const request = await fetch(EXTERNAL_DATA_URL)
    //const posts = await request.json()

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap();

    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

function SiteMap() {
    //This page is generated entirely by getServerSideProps
}

export default SiteMap;
