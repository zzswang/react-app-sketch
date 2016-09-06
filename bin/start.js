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
import fakeServer from './service';


// fake server
if (config.service.fake) {
  http.createServer(fakeServer).listen(fakeServer.get('port'), function(){
    console.log('Fake server listening on port ' + fakeServer.get('port'));
  });
}

const bundler = webpack(devConfig);
browserSync({
  server: bundler.outputPath,
  middleware: [
    historyApiFallback(),
    webpackDevMiddleware(bundler, {publicPath:'http://localhost:3000/', stats: devConfig.stats, noInfo: false}),
    webpackHotMiddleware(bundler),
    makeApiMiddleware(config.service.gateway),
  ],
  files: ['src/*.js', 'src/routes/*.js', 'src/*.html', 'src/data/**'],
});

function makeApiMiddleware(target, token) {
  var proxy = httpProxy.createProxyServer({
    target: target,
    changeOrigin: true,
  });

  // proxy.on('proxyReq', function(proxyReq, req, res, options) {
  //    proxyReq.setHeader('X-Auth-Token', token);
  // });

  proxy.on('error', function(ex) {
    console.log(ex);
  });

  var middleware = function(req, res, next) {
    try {
      if (req && req.url && req.url.match(/\/api\/|\/assets\/|\/data\/|\/avatars\//)) {
        proxy.web(req, res);
      } else {
        next();
      }
    } catch(ex) {
        console.log(ex);
    }
  };

  return middleware;
};