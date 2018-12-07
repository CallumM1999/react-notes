const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const PurifyCSSPlugin = require('purifycss-webpack');
// const glob = require('glob-all');

// const debug = process.env.NODE_ENV !== "production";

module.exports = env => {
    const CSSExtract = new ExtractTextPlugin('styles.css');

    const isProduction = env === 'production';
    
    return {
        mode: 'development',
        entry: [
            path.join(__dirname, "src/app.js")
        ],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
            publicPath: '/dist/'
        },

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
            // new PurifyCSSPlugin({
            //     paths: glob.sync(path.join(__dirname, 'src/components/*.js'))
            // }),
            new webpack.DefinePlugin({
                API_BASE_URL: isProduction ? JSON.stringify('https://agile-mountain-99443.herokuapp.com') : JSON.stringify('http://localhost:3000'),
            }),
            
        ],
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist',
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