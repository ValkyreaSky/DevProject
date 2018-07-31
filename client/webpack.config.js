const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const VENDOR_LIBS = [
  'react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk', 'redux-form', 'jquery',
];

module.exports = (env, argv) => {
  // Webpack mode is set in the npm `build` script (trough --mode=development/production).
  // Production mode assign 'production' to the `process.env.NODE_ENV` variable and
  // development mode assign 'development' to the `process.env.NODE_ENV` variable.
  const isProduction = argv.mode === 'production';

  return ({
    // Root files of application (files from which the Webpack will start reading code).
    // Thanks to `babel-polyfill` new built-ins like `Promise`, `Array.from`,
    // `Object.assign` or `Array.prototype.includes` will be polyfilled..
    entry: {
      bundle: ['babel-polyfill', './src/index.jsx'],
      // All vendors (like `React`, `Redux`,) can go to separate bundle file because we update
      // it less often. User will need to download only smaller `bundle.js` while `vendors.js`
      // will be served from cache.
      vendors: VENDOR_LIBS,
    },
    output: {
      // Absolute path to directory where we want to save bundled files. The `path.resolve()`
      // resolves a sequence of path segments into an absolute path. `__dirname` is `Node.js`
      // variable which store current absolute path.
      path: path.resolve(__dirname, 'dist'),
      // `publicPath` specifies the base path for all the assets within application. Assignment
      // of `/` will generate e.g. `<script src="/assets/bundle.js">` instead of
      // `<script src="assets/bundle.js">`.
      publicPath: '/',
      // Name of output bundled file.
      filename: 'assets/js/[name].[hash:8].js',
      // Name of chunk files.
      chunkFilename: 'assets/js/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          // `oneOf` will traverse all following loaders until one will match the requirements.
          // When no loader matches it will fall to the `file-loader` at the end of the loader list.
          oneOf: [
            // `url-loader` works like `file-loader` except that it embeds assets smaller than
            // limit specified bytes (10 kilobytes in this case) as data URLs to avoid requests.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'assets/media/[name].[hash:8].[ext]',
              },
            },
            // `svg-sprite-loader` creates SVG sprite (one SVG containing all SVG icons) to avoid
            // requests. This won't work without `SpriteLoaderPlugin` in `plugins`.
            {
              test: /\.svg$/,
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'assets/media/sprite.[hash:8].svg',
              },
            },
            // Process JavaScript files with Babel.
            {
              test: /\.js|jsx$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  // This is a feature of `babel-loader` for Webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: isProduction,
                  // If this option is true, Babel will not include needless whitespace
                  // characters and line terminators.
                  compact: isProduction,
                },
              },
            },
            // Process CSS files with listed loaders. `style-loader` turns CSS into JS modules
            // and adds them to the HTML document by injecting <style> tags. `css-loader` knows
            // how to deal with CSS files, resolves paths in CSS and adds assets as dependencies.
            // `postcss-loader` applies `Autoprefixer` to CSS. In production, we use a plugin to
            // extract that CSS to a file, but in development `style-loader` enables hot editing
            // of CSS.
            {
              test: /\.s|css$/,
              exclude: /node_modules/,
              use: [
                // If we are in production mode MiniCssExtractPlugin grabs the result CSS and
                // puts it into separate file in build process instead of injecting <style> tags.
                // This won't work without `new MiniCssExtractPlugin()` in `plugins`.
                isProduction
                  ? {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // MiniCssExtractPlugin expects the build output to be flat (all files
                      // in one directory). However, our output is structured with `assets/*`
                      // folders. To have this structure working with relative paths, we have to
                      // use this custom option. Bu default paths in stylesheet will looks like
                      // `assets/media` so we have to add `../..` to get out from `css` folder.
                      publicPath: '../../',
                    },
                  }
                  : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    // This option configures how many loaders before css-loader should be applied
                    // to imported resources (1 => postcss-loader; 2 => postcss-loader,sass-loader).
                    importLoaders: 2,
                    minimize: isProduction,
                    sourceMap: true,
                  },
                },
                // PostCSS configuration is located in postcss.config.js file.
                'postcss-loader',
                // This loader uses node-sass to compile SASS code.
                {
                  loader: 'sass-loader',
                  options: {
                    // Content of this files will be available in every SASS file.
                    data: '@import "variables"; @import "mixins";',
                    includePaths: [
                      path.join(__dirname, 'src', 'styles'),
                    ],
                  },
                },
              ],
            },
            // When you import an asset, you get its (virtual) filename In production, they
            // would get copied to the `dist` folder. This loader doesn't use a `test` so
            // it will catch all modules that fall through the other loaders.
            {
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: 'file-loader',
              options: {
                name: 'assets/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      // Enable Hot Module Replacement.
      new webpack.HotModuleReplacementPlugin(),
      // Generates an `index.html` file with the injected scripts and styles.
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/templates/index.html',
        // <title>
        title: 'Devplace | Social network for developers',
        // <meta name="description">
        description: 'Create an account or log into Devplace. Connect with co-workers and other people you know. Create portfolio, share posts and get updates.',
        // <meta name="application-name">
        applicationName: 'Devplace',
        favicon: './src/assets/icons/favicon.png',
        minify: {
          removeComments: isProduction,
          collapseWhitespace: isProduction,
          removeRedundantAttributes: isProduction,
          useShortDoctype: isProduction,
          removeEmptyAttributes: isProduction,
          removeStyleLinkTypeAttributes: isProduction,
          keepClosingSlash: isProduction,
          minifyJS: isProduction,
          minifyCSS: isProduction,
          minifyURLs: isProduction,
        },
      }),
      // This won't work without `MiniCssExtractPlugin.loader` in `loaders`.
      new MiniCssExtractPlugin({
        filename: 'assets/css/styles.[contenthash:8].css',
      }),
      // Generate Service Worker (`service-worker.js` by default).
      new WorkboxWebpackPlugin.GenerateSW({
        // Ability to publish a new service worker and control a web page as soon as possible.
        // These options encourage the Service Workers to get in there fast and not allow
        // any straggling "old" SWs to hang around.
        clientsClaim: true,
        skipWaiting: true,
        // Name of cache.
        cacheId: 'Devplace',
        runtimeCaching: [
          {
            urlPattern: /.*/,
            handler: 'networkFirst',
          },
        ],
      }),
      // This won't work without `svg-sprite-loader` in `loaders`.
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
      // Generate `manifest.json` file.
      new WebpackPwaManifest({
        name: 'Devplace',
        short_name: 'Devplace',
        description: 'Social network for developers.',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        fingerprints: false,
        inject: true,
        ios: true,
        icons: [
          {
            src: path.resolve('src/assets/icons/icon-android.png'),
            destination: path.join('assets', 'icons', 'android'),
            sizes: [36, 48, 72, 96, 144, 192, 512],
          },
          {
            src: path.resolve('src/assets/icons/icon-ios.png'),
            destination: path.join('assets', 'icons', 'ios'),
            sizes: [57, 72, 144, 120, 144, 152, 167, 180],
            ios: true,
          },
        ],
      }),
    ],
    resolve: {
      // Extensions supported in imports.
      extensions: ['.js', '.jsx'],
      // Add `src` directory to avoid `../../../`.
      modules: [path.resolve(__dirname, 'src'), './node_modules'],
    },
    // This will generate fast sourcemaps in development mode and slow but with good results
    // in production mode. You can exclude the *.map files from the build during deployment.
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    // Webpack Dev Server configuration.
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      // Enable visiting page on other devices.
      host: '0.0.0.0',
      // index.html page will be served on every URL.
      historyApiFallback: true,
      // Enable gzip compression of generated files.
      compress: true,
      // Enable Hot Reloading server.
      hot: true,
      // Enable HTTPS.
      // https: true,
      // In console You usually want to see only warnings and errors with its details.
      stats: {
        all: false,
        warnings: true,
        errors: true,
        errorDetails: true,
      },
      proxy: {
        '/api/*': {
          target: 'http://localhost:5000',
        },
      },
    },
    // Enable optimization of our output files: bundle.js and vendors.js.
    // Webpack will remove packages listed in vendors entry point from bundle.js
    // and place them only in vendors.js.
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            // The name of the split chunk (same as entry point).
            name: 'vendors',
            chunks: 'initial',
            // Select only modules from /node_modules/ directory.
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
  });
};
