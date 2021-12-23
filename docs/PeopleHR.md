# PeopleHR

Next.js reads an RSS feed from PeopleHR to create a list of open jobs at Torchbox. The RSS feed contains job descriptions, which we use to create individual job listing pages with unique URLs, for example `/jobs/junior-developer/`. Further processing of the feed data creates a JobSchema that is embedded into each job page, allowing the postings to be displayed by job aggregators such as Google.

[Some generic information provided by PeopleHR on their RSS feed](https://help.peoplehr.com/en/articles/2345581-ats-rss-feed).

## Processing the Feed

The peopleHR feed is fetched with `fetchPeopleHRFeed` then converted to JSON with `parseXml`. `convertJSONToJobPosts` then runs error catching and converts JSON to the Job types, which are returned by three core export functions;

`getAllJobSummaries()` _Used in jobs.tsx_
`getAllJobSlugs()` _Used in /jobs/\[slug\].tsx_
`getJobPost(slug: string)`_Used in /jobs/\[slug\].tsx_

## Cleaning the HTML

The job description from PeopleHR contains preprocessed generated HTML, which is often messy.

We process the HTML in peopleHR.ts with `processPeopleHRDescription`, which substitutes any `<strong>` or `style="font-weight: bold;"` definitions with <span> tags that include the appropriate class names. Script tags and similar are removed if they are not part of the tag allowlist.

## Ensuring the Job Posts Are Complete

Information about a job post can be forgotten to be added. `jobPostingJSONIsValid` checks if all data is present in the job listing; if not, that job is not rendered to the website, while other jobs are, which is handled by `convertJSONToJobPosts`.

## Data Types

This project contains two custom type definitions for the data we process from the PeopleHR RSS feed, `JobPost` and `JobSummary`.
