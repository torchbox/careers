const path = require('path');

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        // allow all scss files access to these files
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@use "sass:math"; @import "variables.scss"; @import "functions.scss"; @import "mixins.scss"; @import "fonts.scss"; `,
    },
    images: {
        domains: ['images.ctfassets.net', 'source.unsplash.com'],
    },
};
