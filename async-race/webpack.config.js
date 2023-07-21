const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 4000,
    }
};

const mapDevtool = (isDev) => !isDev ? {} : {devtool: 'inline-source-map'};
const eslintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({ extensions: ['ts']})];

module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    ...mapDevtool(develop),
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        assetModuleFilename: 'assets/[hash][ext]',
    },
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|mp3|wav)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                type: 'asset/source',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'RSS CSS Selectors',
            favicon: './public/fav.png'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CopyPlugin({
            patterns: [
                { from: './public', to: './assets' }
            ]
        }),
        ...eslintPlugin(develop),
    ],
    ...devServer(develop),
});