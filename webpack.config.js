var path = require('path');
var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV || 'development';

var devCfg = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css?$/,
            loader: 'style-loader!css-loader?modules',
            exclude: path.join(__dirname, 'node_modules')
        }, {
            test: /\.css?$/,
            loader: 'style-loader!css-loader',
            exclude: path.join(__dirname, 'src')
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules', 'src']
    }
};

var prodCfg = {
    //devtool: 'cheap-module-source-map',
    entry : [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.css?$/,
            loader: 'style-loader!css-loader?modules',
            exclude: path.join(__dirname, 'node_modules')
        }, {
            test: /\.css?$/,
            loader: 'style-loader!css-loader',
            exclude: path.join(__dirname, 'src')
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins : [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            warnings: false,
            drop_console: true,
            unsafe: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules', 'src']
    }
};

module.exports = NODE_ENV==='production' ? prodCfg : devCfg;

