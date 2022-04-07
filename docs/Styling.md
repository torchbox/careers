# Styling

This website uses three themes:

- LIGHT: a white background and grey text
- INDIGO: a white background and dark indigo text
- DARK: a dark indigo background and white text

To specify styles that follow a pages theme, use the following syntax:

```scss
.container {
  background-color: var(--color--white);

  // Sets dark theme styles
  :global .themeDark :local & {
    background-color: var(--color--white);
  }
}
```

The classes `.themeLight`, `.themeIndigo` and `.themeDark` can be used to specify your theming. Make sure that a parent container has one of these classes assigned to it in their `className` function, otherwise the theme won't display.

_:global escapes CSS module's automatic class renaming system, then :local returns us to the scope of the component, & adds the current working class to our definition._
