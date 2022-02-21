import { GetServerSideProps } from 'next';
import { getAllJobSlugs } from './api/jobs/slugs';

function generateSiteMap(jobSlugs: string[] | null) {
    let baseUrl = 'http://localhost:3000';
    if (process.env.VERCEL_ENV) {
        baseUrl = {
            production: 'https://torchbox.com/careers',
            preview: process.env.VERCEL_URL,
            development: 'http://localhost:3000',
        }[process.env.VERCEL_ENV] as string;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
      </url>
      <url>
        <loc>${baseUrl + '/life-at-torchbox/'}</loc>
      </url>
      <url>
        <loc>${baseUrl + '/jobs/'}</loc>
      </url>
      ${
          jobSlugs &&
          jobSlugs.map(
              (slug: string) => `
              <url>
                <loc>${baseUrl + slug}</loc>
              </url>
            `,
          )
      }
    </urlset>
  `;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const jobSlugs = await getAllJobSlugs();
    const sitemap = generateSiteMap(jobSlugs);

    context.res.setHeader('Content-Type', 'text/xml');
    context.res.write(sitemap);
    context.res.end();

    return {
        props: {},
    };
};

function SiteMap() {}
export default SiteMap;
