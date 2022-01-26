This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Pulling data from Contentful

Copy `env.local.example` and create an `.env.local` file in the root of the project directory.

Log in to Contentful and from Settings > API Keys populate `.env.local` with the Space ID and Content Delivery access token.

Restart the development server.

## Pulling data from PeopleHR

Update the .env.local using the RSS feed URL, as found on the password manager.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Common Errors

### Next: Commmand not found

When running `npm run dev` or similar.

```bash
> careers@ dev /Users/jameshancock/Documents/GitHub/careers
> next dev

sh: next: command not found
npm ERR! code ELIFECYCLE
npm ERR! syscall spawn
npm ERR! file sh
npm ERR! errno ENOENT
npm ERR! careers@ dev: `next dev`
npm ERR! spawn ENOENT
npm ERR!
npm ERR! Failed at the careers@ dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/jameshancock/.npm/_logs/2021-12-20T10_42_27_318Z-debug.log
```

**Solution:** Make sure you are running the right node version with 'nvm use' or 'fnm use', then delete the `node_modules` folder and run `npm install` to reinstall Next.js correctly.
