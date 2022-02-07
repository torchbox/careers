# PeopleHR

Next.js reads an RSS feed from PeopleHR to create a list of open jobs at Torchbox. The RSS feed contains job descriptions, which we use to create individual job listing pages with unique URLs, for example `/jobs/junior-developer/`. Further processing of the feed data creates a JobSchema that is embedded into each job page, allowing the postings to be displayed by job aggregators such as Google.

[Information provided by PeopleHR on their RSS feed](https://help.peoplehr.com/en/articles/2345581-ats-rss-feed).

## API Introduction

The peopleHR feed is fetched with `fetchPeopleHRFeed` as part of `_peopleHR.ts`, stored in the `pages/api/` folder. The underscore means that the file isn't exported as a serverless function, and when we host it on Vercel it can read and write the in-memory cache of the server. **N.B.** Files that are not in the /pages/api/ route cannot access the local file system if you are hosting on Vercel ([see docs for additional information on setting up file access](https://vercel.com/docs/runtimes#advanced-usage/technical-details/including-additional-files)).

## API Routes

### `/api/jobs/slugs`

Returns a list of slug urls of existing job posts. These slugs are used by the `getStaticPaths` of the job page to build all the currently active jobs.

### `/api/jobs/summaries`

Returns a list of job summaries, used in the jobs listing page.

### `/api/jobs/[slug]`

Takes a job slug as a parameter of the query URL, e.g. `/api/jobs/senior-developer` would return all the job information for the senior developer role. Use the `slug` api endpoint above to get a list of valid jobs to query.

## Developing the API

To test this API locally, use the command `npm run vercel` to run the vercel development environment. If you are prompted to sign in, choose the email sign in option, and then select the `Torchbox` account to work from. Link to the project with `Y`, and it will start the dev server locally.

## Processing the PeopleHR Data

The job description from PeopleHR contains preprocessed generated HTML, which is often messy. The `lib/peopleHR.ts` file processes the job posting data, with `processPeopleHRDescription` substituting any `<strong>` or `style="font-weight: bold;"` definitions with `<span>` tags and including appropriate class names. Script tags and similar are removed if they are not part of the tag allowlist.

Information about a job post can be forgotten to be added. `jobPostingJSONIsValid` checks if all data is present in the job listing; if not, that job is not rendered to the website. The other jobs will still be rendered, as handled by `convertJSONToJobPosts`.
