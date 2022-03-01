import useMedia from 'react-use/lib/useMedia';

/**
 * Hooks to get a list of currently active breakpoints
 *
 * Example usage:
 *
 * const screen = useMedia();
 *
 * if (screen.includes('medium')) {
 *   // Equivalent to (min-width: 599px)
 * }
 *
 * if (!screen.includes('medium')) {
 *   // Equivalent to (max-width: 599px)
 * }
 */
export const useScreen = () => {
    const medium = useMedia('(min-width: 599px)');
    const large = useMedia('(min-width: 1023px)');
    const menuBreak = useMedia('(min-width: 1255px)');
    const heroBreak = useMedia('(min-width: 1350px)');
    const siteWidth = useMedia('(min-width: 1441px)');

    const screens = [];

    if (siteWidth) {
        screens.push('site-width');
    }
    if (heroBreak) {
        screens.push('hero-break');
    }
    if (menuBreak) {
        screens.push('menu-break');
    }
    if (large) {
        screens.push('large');
    }
    if (medium) {
        screens.push('medium');
    }
    return screens;
};
