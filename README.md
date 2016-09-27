# React-App-Sketch

[![build status](https://img.shields.io/travis/coryhouse/react-slingshot.svg?style=flat-square)](https://travis-ci.org/coryhouse/react-slingshot)
[![Dependency Status](https://david-dm.org/coryhouse/react-slingshot.svg?style=flat-square)](https://david-dm.org/coryhouse/react-slingshot)
[![Coverage Status](https://coveralls.io/repos/github/coryhouse/react-slingshot/badge.svg?branch=master)](https://coveralls.io/github/coryhouse/react-slingshot?branch=master)

Good starter scallfold, pure web app, build with React and Redux, ES6 anywhere. Single page app, push state friendly, deploy with docker.

| **Tech** | **Description** |**Learn More**|
|----------|-------|---|
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.    | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications) [React Gitbook](https://hulufei.gitbooks.io/react-tutorial/content) |
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging. Lean alternative to [Facebook's Flux](https://facebook.github.io/flux/docs/overview.html).| [Pluralsight Course](http://www.pluralsight.com/courses/react-redux-react-router-es6)  [Redux gitbook](http://cn.redux.js.org/index.html)  |
|  [React-Router](https://github.com/reactjs/react-router) | A complete routing library for React | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications)  [react-router gitbook](http://react-guide.github.io/react-router-cn)|
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.     | [ES6 REPL](https://babeljs.io/repl/), [ES6 vs ES5](http://es6-features.org), [ES6 Katas](http://es6katas.org), [Pluralsight course](https://www.pluralsight.com/courses/javascript-fundamentals-es6)    |
| [Webpack](http://webpack.github.io) | Bundles npm packages and our JS into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). | [Quick Webpack How-to](https://github.com/petehunt/webpack-howto) [Pluralsight Course](https://www.pluralsight.com/courses/webpack-fundamentals) [Webpack gitbook](http://zhaoda.net/webpack-handbook)|
| [Browsersync](https://www.browsersync.io/) | Lightweight development HTTP server that supports synchronized testing and debugging on multiple devices. | [Intro vid](https://www.youtube.com/watch?time_continue=1&v=heNWfzc7ufQ)|
| [Mocha](http://mochajs.org) | Automated tests with [Chai](http://chaijs.com/) for assertions and [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. | [Pluralsight Course](https://www.pluralsight.com/courses/testing-javascript) |
| [Isparta](https://github.com/douglasduteil/isparta) | Code coverage tool for ES6 code transpiled by Babel. | |
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. | |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more. | [Pluralsight Course](https://www.pluralsight.com/courses/better-css)|
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). | [IDE Plugins](http://editorconfig.org/#download) |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. | [Pluralsight course](https://www.pluralsight.com/courses/npm-build-tool-introduction), [Why not Gulp?](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n)  |

This is a Sketch for a real React App, it could be used for enterprise projects.


### Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
├── README.md                   # Quick start document
├── bin                         # scripts
│   ├── release.js              # script help to release
│   ├── service.js              # start the fake api service
│   └── start.js                # jump to the development
├── dist/                       # The folder for compiled output
├── config                      # configuration use node-config
│   └── default.json
├── package.json                # package definition
├── src                         # all source code written for this app
│   ├── 404.html                # 404 page
│   ├── 500.html                # 500 page
│   ├── actions                 # react actions
│   │   └── session.js
│   ├── constants.js            # const constants
│   ├── containers              # container components, connect to store
│   │   ├── index.js
│   │   ├── layout.jsx
│   │   └── login.jsx
│   ├── favicon.ico
│   ├── images                  # images
│   │   └── focus.gif
│   ├── index.html              # home html
│   ├── index.jsx               # entry file
│   ├── middlewares             # middlewares for react, redux & router
│   │   ├── apiError.js
│   │   └── wrapperHeader.js
│   ├── reducers                # react reducers
│   │   ├── index.js
│   │   └── session.js
│   ├── routes                  # routers
│   │   └── index.jsx
│   ├── store.js                # all states
│   └── styles                  # SASS
│       ├── flatkit.scss
│       └── main.scss
└── webpack.config.babel.js     # webpack config, including prod & dev
```



## Quick Start

#### 0. **Requirements**

* nodejs > 6.0
* npm > 3.5
* git

#### 1. **get the latest version**

```
git clone -o sketch -b master --single-branch \
      https://github.com/zzswang/react-app-sketch.git MyApp
cd MyApp

// connect to your own repository
git remote add origin your-app-repository
git push -u origin master
```

#### 2. **Install Node packages && Run the app**

run `npm install && npm start`

This will run the automated build process, start up a fake api server, and open the application in your default browser. When doing development with this kit, this command will continue watching files all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically.

#### 3. **Deploy the app**

**deploy with command line**

```
cp config/default.json config/production.json
// editing this file, and save
NODE_ENV=production npm run build
npm run deploy -- machine:/path/to/deploy/
```

**Note**: If you want to put the app in a sub path, like http://you.domain/texas/, plz modify the baseUrl in the config/production.json.


**deploy with docker**

```
// it will build an image defined in your package.json
npm run docker

// export you image to somewhere else, run it
docker run -d -p 80:80 your_image
```

#### 4. **Update from sketch**
It is impossible to make everything perfect with one time shot, we need to track up with the sketch improvements, make sure up-to-date.
run `git fetch sketch master`, and do the merge work `git merge sketch/master`


## Reference
- [react-boilerplate](https://github.com/mxstbr/react-boilerplate)
- [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)
- [react-redux-jwt-auth-example](https://github.com/joshgeller/react-redux-jwt-auth-example)
- [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)
- [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)
- [react-slingshot](https://github.com/coryhouse/react-slingshot)
- [react-starter-kit](https://github.com/kriasoft/react-starter-kit)
- [react-static-boilerplate](https://github.com/kriasoft/react-static-boilerplate)
