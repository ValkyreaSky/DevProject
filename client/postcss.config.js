module.exports = {
  // Webpack requires an identifier for external CSS imports to work.
  ident: 'postcss',
  plugins: [
    // Autoprefixer uses Browserslist which configuration
    // is located in .browserslistrc file.
    require('autoprefixer')({ /* eslint-disable-line */
      // Autoprefixer will add flexbox prefixes only for final and IE versions of specification.
      flexbox: 'no-2009',
    }),
    // This plugin tries to fix all of flexbug's issues.
    // Flexbug is list of flexbox issues and cross-browser workarounds for them.
    require('postcss-flexbugs-fixes'), /* eslint-disable-line */
  ],
};
