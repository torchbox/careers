# Contentful

## Adding a new Richtext embed

Create a new content model object in Contentful, and update the RichText elements to support including this content as an embed. Don't publish your changes until the frontend has been updated.

Preview the API response of what this embed outputs by using the Contentful Preview API URL.

`https://graphql.contentful.com/content/v1/spaces/[space ID here]/explore?access_token=[preview API key here]`

For local development, you can enter preview mode via the FE api. Use the following URL:

`http://localhost:3000/careers/api/preview?secret=[preview API key here]&url=careers`

After you've added your new embed component in the `components` folder, continue by updating the following files.

### Update `lib/api.ts`

If the embed is added only in one place, then update that GraphQL query directly, or refactor to include the embed as a reuseable GraphQL snippet. The embed will be accessed in the linked entries of the GraphQL query.

```graphql
entries {
  block {
    __typename
    sys {
      id
    }
    ... on YourNewEmbedTypeName {
      embedValues
    }
  }
}
```

### Update `components/RichText.tsx`

Update the `[BLOCKS.EMBEDDED_ENTRY]` content with your new component.

```ts
if (entry.__typename === 'YourNewEmbedTypeName') {
  ...
}
```
