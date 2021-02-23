const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withSass({
    useFileSystemPublicRoutes: false,
    webpack(config,  { isServer }) {
        if (!isServer) {
            config.node = {
              fs: 'empty',
              net: 'empty',
              tls: 'empty',
            }
          }
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });

        return config;
    }
}));