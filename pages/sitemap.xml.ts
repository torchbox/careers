import { GetServerSideProps } from 'next';

function generateSiteMap() {
    const rootUrl = process.env.VERCEL_URL
        ? process.env.VERCEL_URL
        : 'http://localhost:3000';
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${rootUrl}</loc>
     </url>
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sitemap = generateSiteMap();

    context.res.setHeader('Content-Type', 'text/xml');
    context.res.write(sitemap);
    context.res.end();

    return {
        props: {},
    };
};

function SiteMap() {}
export default SiteMap;
