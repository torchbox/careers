# Careers site - RETIRED

> [!WARNING]
> This repo was previously used for the careers section of the torchbox.com repo, and is now retired. You probably want https://github.com/torchbox/torchbox.com.

The old REAME content is preserved below for reference.

<pre>
*
*
*
*
*
*
*
*
*
*
</pre>

# Historical documentation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Staging and Deployment

This site is live at [https://torchbox.com/careers](https://torchbox.com/careers).

Preview sites are automatically deployed by Vercel every time you push to a remote branch on this GitHub repository. A full list of deployments can be [found here](https://github.com/torchbox/careers/deployments) or on Vercel, don't forget to add `/careers` to the end of the deployment URL or you will only see a 404 page.

## Pull the source code

```bash
git clone git@github.com:torchbox/careers.git
cd careers
```

## Requirements

### Node.js

We recommend using a Node version manager such as [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) (fnm being a faster version written using Go), to ensure you're running the correct version of Node matching the `.nvmrc` file.

### Local environment variables / secrets

This is a headless site which requires communicating with a graphql endpoint provided by **Contentful** as well as an RSS feed providing job listings via **PeopleHR**.

You will need to create and populate an `.env.local` file to access these endpoints, create a template by running `cp .env.local.example .env.local`.
Log into Torchbox's password manager to find the tokens for PeopleHR, and request access to Contentful from Miles Taylor, Lisa Ballam or James Hancock. With access to Contentful, you can login and find the appropriate env variables in Settings > API Keys.

You can also make use of the GraphQL API explorer to help with writing graphql queries - this can be accessed through `https://graphql.contentful.com/content/v1/spaces/{ SPACE ID }/explore?access_token={ ACCESS TOKEN }`.

## Getting started

Install a node version manager as part of the requirements section and follow the steps below.

Steps:

1. Navigate to the project's root directory
2. Run `fnm use` or `nvm use` to select the correct node environment.
3. Run `npm install` to install the projects dependencies.
4. Run `npm run dev` to start the development server at `http://localhost:3000/`.
5. Navigate to [`http://localhost:3000/careers`](http://localhost:3000/careers).

You can run `npm run build && npm run start` to compile an optimized bundle and then run the application on Node.js in production mode.

Most of these scripts are built on top of Next.js's CLI, for more information see: https://nextjs.org/docs/api-reference/cli.

## Local Development

Before pushing changes, you can run the following commands to check if your code passes CI.

```
npm run format
npm run lint
npm run pa11y
```

If you have VSCode installed, the Prettier and Stylelint extensions combined with [VSCode's auto formatting on save](https://blog.yogeshchavan.dev/automatically-format-code-on-file-save-in-visual-studio-code-using-prettier) will catch most of the linting errors for you.

## Further Documentation

View the [`/docs`](https://github.com/torchbox/careers/tree/main/docs) folder for more notes. Recommended reading includes the React, Styling and Images docs to understand best practices for working on this project, while the Pa11y and PeopleHR pages contain more in-depth technical information and are better used as references.
