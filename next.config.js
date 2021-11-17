module.exports = {
    reactStrictMode: true,
    sassOptions: {
        // allow all scss files access to these files
        prependData: `@use "sass:math"; @import "variables.scss"; @import "functions.scss"; @import "mixins.scss"; @import "fonts.scss"; `,
    },
};
