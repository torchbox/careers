# Images

You can optimise images pulled from Contentful via the GraphQL API. [To do this, use image transforms](https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation/assets). This works best for images that aren't resized.

```graphql
image {
  url(transform: {
    width: 100,
    height: 100
  })
  description
}
```
