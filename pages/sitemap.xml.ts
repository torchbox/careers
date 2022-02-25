import { GetServerSideProps } from 'next';
import fs from 'fs';
import { getAllJobSlugs } from './api/jobs/slugs';

const generateSiteMap = (jobSlugs: string[] | null) => {
    let baseUrl = 'http://localhost:3000';
    if (process.env.VERCEL_ENV) {
        baseUrl = {
            production: 'https://torchbox.com/careers',
            preview: process.env.VERCEL_URL,
            development: 'http://localhost:3000',
        }[process.env.VERCEL_ENV] as string;
    }

    const staticPages = fs
        .readdirSync(process.env.VERCEL_ENV ? './.next/server/pages' : 'pages')
        .filter((staticPage) => {
            // Filter out unwanted folders and pages
            return ![
                'api',
                'jobs',
                'index.tsx',
                '_app.tsx',
                '_error.js',
                '_error.js',
                '.DS_Store',
                'sitemap.xml.ts',
            ].includes(staticPage);
        })
        .map((staticPagePath) => {
            const path = `${baseUrl}/${staticPagePath}`.replace('.tsx', '');
            return path;
        });

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
      </url>
      ${staticPages
          .map(
              (url) => `
          <url>
            <loc>${url}</loc>
          </url>
        `,
          )
          .join('')}
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
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const jobSlugs = await getAllJobSlugs();
    const sitemap = generateSiteMap(jobSlugs);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

const Sitemap = () => {};
export default Sitemap;
