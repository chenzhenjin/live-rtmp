const {
  override,
  addWebpackPlugin
} = require("customize-cra")

const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = override(
  addWebpackPlugin(new SentryCliPlugin({
    release: 'pro@1.0.1',
    include: 'build',
    urlPrefix: '~/live/',
    ignore: ['node_modules']
  }))
)