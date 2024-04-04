const webpack = require('webpack');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isBundleAnalyze = false; // turn it too true only when you want to analyze your bundle, should be false by default

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                },
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'STABLE_FEATURE': JSON.stringify(true),
            'EXPERIMENTAL_FEATURE': JSON.stringify(false)
        }),
        // PARA ANALISAR
        ...isBundleAnalyze ? [new BundleAnalyzerPlugin()] : [],
        // PARA LIMPAR EXCESSO NO MOMENT 
        new MomentLocalesPlugin({
            localesToKeep: ['pt-br'],
        }),
    ],
};