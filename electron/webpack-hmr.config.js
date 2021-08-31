const nodeExternals = require('webpack-node-externals')
const {resolve} = require('path')
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

/**
 * Options to bundle main and preload, and enable hmr in nest 
 * does not work in preload or main directly, if you change them, you need to restart the application
 * but works fine in controllers and providers
 * 
 * @see https://docs.nestjs.com/recipes/hot-reload
 */
module.exports = function (options, webpack) {
    return {
        ...options, //default options from nest
        entry: {
            main: ['webpack/hot/poll?100', options.entry], //add hmr to main
            preload: resolve(__dirname,'src/preload.ts'), //compile preload
        },
        output: {
            filename: '[name].js' //bundle the two entries:  preload.js and main.js
        },        
        externals: [
            nodeExternals({
                allowlist: ['webpack/hot/poll?100'], //add webpack hot reload to bundle
            }),
        ],
        plugins: [
            ...options.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
            // since we need to run electron, we use this plugin to 
            // clean hot relaod files before build
            // and run electron afterwards
            new WebpackShellPluginNext({
                onBuildStart:{
                    scripts: ['rimraf dist'],
                    blocking: true,
                    parallel: false
                  }, 
                onBuildEnd:{
                  scripts: ['electron dist/main.js'],
                  blocking: false,
                  parallel: true
                }
              })
        ],
    }
}
