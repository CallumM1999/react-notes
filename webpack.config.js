const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const debug = process.env.NODE_ENV !== "production";


module.exports = env => {
    const CSSExtract = new ExtractTextPlugin('styles.css');

    const isProduction = env === 'production';

    // console.log('webpack', isProduction)
    
    return {
        mode: 'development',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
        },
        // watch: true,

        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        devtool:isProduction ? 'source-map' : 'inline-source-map',
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                API_BASE_URL: isProduction ? JSON.stringify('https://agile-mountain-99443.herokuapp.com') : JSON.stringify('http://localhost:3000'),
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/',
            // compress: true

        },
        optimization: {
            minimizer:isProduction ? [
                new UglifyJSPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: true
                        },
                    output: {
                        comments: false
                        }
                    },
                }),
            ] : []
        }
    }
};