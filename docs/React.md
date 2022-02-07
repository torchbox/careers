# Code Style Decisions

This repository has been developed with TypeScript and React functional components. Here are the main code style decisions followed across the project while developing.

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
8. Use arrow functions instead of `function () {}` definitions where possible.
