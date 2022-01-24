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

To view the GraphQL API explorer, go to 
`https://graphql.contentful.com/content/v1/spaces/{ SPACE ID }/environments/staging/explore?access_token={ ACCESS TOKEN }`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Code Style Decisions

```ts
type LayoutProps = {
    preview: boolean;
    children: React.ReactNode;
};

export const Layout = ({ preview, children }: LayoutProps) => {
    return (
        <div>
            <Alert preview={preview} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
```

1. Use `type Variable = { ... }`, avoiding `Interface` for consistency across the codebase where possible.
2. Where components have more than one prop, define the prop types separately (e.g. `LayoutProps`)
3. Specify children in the props with `React.ReactNode` (avoid `React.FC` to imply children, we should define children explicitly)

```ts
import { LandingPage } from "types/LandingPage";

type LandingPageProps = {
    preview: boolean;
    landingPageContent: LandingPage;
};

const LandingPage: NextPage<LandingPageProps> = ({
    preview,
    landingPageContent,
}) => ( ... );
```

4. Define props for Next Pages using the above `NextPage` wrapper.
5. Define the types for complex data objects in a separate `types/` file.

```ts
export type LandingPage = {
    title: string;
    metadataDescription: string;
    heroImage: Image;
    workForYouDescription: any;
    workForYouImage: Image;
    lifeAsATorchboxer: any;
    ctaTitle: string;
    ctaDescription: any;
};
```

6. Where we pull complex unregulated JSON from the Contentful GraphQL Schema, use the `any` type.
7. Add reusable type definitions to `types/Base.ts`