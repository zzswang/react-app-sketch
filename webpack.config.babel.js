import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from 'config';
import project from './package.json';


const isVerbose = false;
const GLOBALS = {
    __DEV__: process.env.NODE_ENV === 'production',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
};

export const devConfig = {
    debug: true,
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src'
    ],

    // devtool: 'source-map',        //更详细的调试信息，但是慢
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'scripts/main.js',
        publicPath: 'http://localhost:3000/',
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new HtmlWebpackPlugin({template: './src/index.html', version: project.version, ...config.app}),
        new HtmlWebpackPlugin({filename: '404.html', template: './src/404.html', inject: false}),
        new HtmlWebpackPlugin({filename: '500.html', template: './src/500.html', inject: false}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    stats: {
        colors: true,
        reasons: true,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose,
        profile: true,
        displayModules: true
    },
    eslint: {
        configFile: ".eslintrc"
    },
    module: {
        preLoaders: [
            { test: /\.js|jsx$/, loader: "eslint", include: [ path.resolve(__dirname, "src") ], exclude: "/node_modules/" }
        ],
        loaders: [
            {test: /\.js|jsx$/, include: path.join(__dirname, 'src'), loaders: ['babel'], exclude: [ /joi-browser/, /node_modules/ ]},
            {test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10240&name=images/[name].[ext]'},
            {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
            {test: /(\.css|\.scss)$/, loader: 'style!css?sourceMap!sass?sourceMap'},
            {test: /\.csv$/, loader: 'dsv'}, //will load all .csv files with dsv-loader by default
            {test: /\.md$/, loader: "html!markdown"}
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./node_modules")]
    },
    resolve: {
        packageAlias: 'browser',
        extensions: ['', '.js', '.jsx'],
        root: path.join(__dirname, 'src'),
    }
}

export const prodConfig = {
    entry: ['./src'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'scripts/main.js',
        publicPath: path.join('/', process.env.BASE_URL || '', '/'),
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin("styles/main.css", {allChunks: true}),
        new HtmlWebpackPlugin({template: './src/index.html', version: project.version, ...config.app}),
        new HtmlWebpackPlugin({filename: '404.html', template: './src/404.html', inject: false}),
        new HtmlWebpackPlugin({filename: '500.html', template: './src/500.html', inject: false}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: isVerbose}})
    ],
    module: {
        loaders: [
            {test: /\.js|jsx$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /(\.css|\.scss)$/, loader: ExtractTextPlugin.extract(['css', 'sass'])},
            {test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10240&name=images/[name].[ext]'},
            {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?name=fonts/[name].[ext]'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=fonts/[name].[ext]'},
            {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'},
            {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'},
            {test: /\.csv$/, loader: 'dsv'}, //will load all .csv files with dsv-loader by default
            {test: /\.md$/, loader: "html!markdown"}
        ]
    },
    sassLoader: devConfig.sassLoader,
    resolve: devConfig.resolve,
}

export default prodConfig;
