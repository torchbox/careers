# Pa11y

Our integration with Pa11y automatically tests website accessibility according to Axe standards when you push to the remote repository. To prevent build errors from occurring in advance, run `npm run pa11y` locally to catch errors before you commit.

This integration will only test pages that are visible on the sitemap. By default, all new pages added to the repository should be included here automatically. **If you update the sitemap, this may break accessibility testing across the site.**

The tests depend on live content from Contentful – so the tests will only be as good as the test content is, and the test might pick up issues that are content issues rather than with a PR’s implementation.

Note that simultaneous requests for auditing pages (supported by pa11y's concurrency setting) aren't suitable for this project. A race condition occurs where a page is requested and built, while the simultaneous page request is rejected.

This is not a complete accessibility testing solution. Other automated testing tools have been more recently updated and highlight different issues, so perform manual accessibility testing for complex components and consider using accessibility auditing tools such as [axe DevTools](https://www.deque.com/axe/devtools/).

## Deactivated Rules

### "color-contrast"

This rule has been deactivated as many pseudo-elements are being used across the site. Although they may have suitable contrast levels, chrome can't test the color contrast ratio, so pa11y reports this as an error.

### "video-caption"

This rule has been deprecated in more recent accessibility audit standards, and as the video in question doesn't have audio, adding captions to it anyway doesn't make sense.
