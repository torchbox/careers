This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Staging and Deployment

This site is live at [https://torchbox.com/careers](https://torchbox.com/careers).

Preview sites are automatically deployed by Vercel every time you push to a remote branch on this GitHub repository. A full list of deployments can be [found here](https://github.com/torchbox/careers/deployments) or on Vercel, don't forget to add `/careers` to the end of the deployment URL or you will only see a 404 page.

## Pulling data from Contentful

Copy `env.local.example` and create an `.env.local` file in the root of the project directory.

Log in to Contentful and from Settings > API Keys populate `.env.local` with the Space ID and Content Delivery access token.

Restart the development server.

## Pulling data from PeopleHR

Update the `.env.local` using the RSS feed URL, as found on the password manager.

To view the GraphQL API explorer, go to

```
https://graphql.contentful.com/content/v1/spaces/{ SPACE ID }/environments/explore?access_token={ ACCESS TOKEN }
```

## Local Development

```bash
fnm use
```

It's recommended you use `fnm` as this is faster than nvm. If you haven't installed fnm yet, you can use `nvm use` here instead.

```bash
npm install
npm run dev
```

Open [http://localhost:3000/careers](http://localhost:3000/careers) with your browser to see the result.

Before committing changes, run

```
npm run format
npm run lint
npm run pa11y
```

So your code passes CI.

If you have VSCode installed, the Prettier and Stylelint extensions combined with [VSCode's auto formatting on save](https://blog.yogeshchavan.dev/automatically-format-code-on-file-save-in-visual-studio-code-using-prettier) will catch most of the linting errors for you.

## Further Documentation

View the [`/docs`](https://github.com/torchbox/careers/tree/main/docs) folder for more notes. I recommended reading the React, Styling and Images docs to understand best practices for working on this project, while the Pa11y and PeopleHR pages contain more in-depth technical information and are better used as references.
