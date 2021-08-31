const {resolve} = require('path')

/**
 * Using webpack to bundler the main process and preload files
 * @see https://docs.nestjs.com/cli/monorepo
 */
module.exports = function(options) {
    return {
      ...options,
      entry: {
        preload: resolve(__dirname,'src/preload.ts'),
        main: {
          import:  options.entry,
        },
      },
      output: {
        filename: '[name].js'
      },
    };
  };
  