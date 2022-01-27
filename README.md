This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```bash
fnm use
```

It's recommended you use `fnm` as this is faster than nvm. If you haven't installed fnm yet, you can use `nvm use` here instead.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

N.B. Remember to run `npm install` every time you switch development branches. This triggers a refresh of Prettier, so if you have the Prettier VSCode extension installed, it will correctly format files on save.

Before committing changes, run

``
npm run format
npm run lint

```

So your code passes CI.

## Pulling data from Contentful

Copy `env.local.example` and create an `.env.local` file in the root of the project directory.

Log in to Contentful and from Settings > API Keys populate `.env.local` with the Space ID and Content Delivery access token.

Restart the development server.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
```
