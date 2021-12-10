# PeopleHR

## Processing the Feed

The peopleHR feed is fetched with `fetchPeopleHRFeed` then converted to JSON with `parseXml`. `convertJSONToJobPosts` then runs error catching and converts JSON to the Job types, which are returned by three core export functions;

`getAllJobSummaries()`
=> returns an array of job summaries.
_Used in jobs.tsx_

`getAllJobSlugs()`
=> returns an array of URL slugs for all the job posts.
`getJobPost(slug: string)`
=> returns a job post for a specific slug.
_Both used in /jobs/\[slug\].tsx_

## Cleaning the HTML

The job description from PeopleHR contains preprocessed generated HTML, which is often messy.

We process the HTML with `cleanUpHTML`, which substitutes any `<font>` or `style="font-weight: bold;"` definitions with appropriate HTML tags. Script tags are removed with a virtual DOM, HappyDOM. HappyDOM could fully replace the Regex use here, this waits on further development.

## Ensuring the Job Posts Are Complete

Information about a job post can be forgotten to be added. `jobPostingJSONIsValid` checks if all data is present in the job listing; if not, that job is not rendered to the website, while other jobs are, which is handled by `convertJSONToJobPosts`.

## Data Types

This project contains two custom type definitions for the data we process from the PeopleHR RSS feed.

### JobPost

All the non-duplicated data from the RSS feed, with the addition of a custom generated `slug` field. The slug has been generated based on the job title.

```ts
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
```

### JobSummary

A summary of all the job data for displaying a list of jobs on the `jobs.tsx` page. When large amounts of data are loaded whilst rendering, Vercel takes much longer to respond, hence the need for a job summary. The below `description` field is populated by the much shorter `vacancydescription`.

```ts
export interface JobSummary {
  title: string;
  description: string;
  department: string;
  city: string;
  slug: string;
}
```
