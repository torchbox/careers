import { GetServerSideProps } from 'next';

function generateSiteMap() {
    let baseUrl = 'http://localhost:3000';
    if (process.env.VERCEL_ENV) {
        baseUrl = {
            production: 'https://theblackhart.co.uk',
            preview: process.env.VERCEL_URL,
            development: 'http://localhost:3000',
        }[process.env.VERCEL_ENV] as string;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseUrl}</loc>
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
