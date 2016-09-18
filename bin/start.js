import browserSync from 'browser-sync';
import http from 'http';
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import httpProxy from 'http-proxy';
import config from 'config';
import { devConfig } from '../webpack.config.babel.js';
import apiService from './service';


const bundler = webpack(devConfig);

browserSync({
  server: bundler.outputPath,
  middleware: [
    {route: config.service.api_regex, handle: apiService},
    historyApiFallback(),
    webpackDevMiddleware(bundler, {publicPath:'/', stats: devConfig.stats, noInfo: false}),
    webpackHotMiddleware(bundler),
  ],
  files: ['src/*', 'src/routes/*'],
});
