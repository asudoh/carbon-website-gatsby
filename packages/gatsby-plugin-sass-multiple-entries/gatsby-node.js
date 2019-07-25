'use strict';

const deduper = require('postcss-discard-duplicates');

exports.onCreateWebpackConfig = (
  { actions, stage, loaders },
  { cssLoaderOptions = {}, postCssPlugins, sassOptions }
) => {
  const { setWebpackConfig } = actions;
  const useSourceMap = stage === 'develop';

  const sassMultipleInstancesLoader = {
    loader: require.resolve('./multiple-instances-loader'),
    options: {
      instances: sassOptions.map(sassOptionItem => ({
        loader: 'sass-loader',
        options: {
          sourceMap: useSourceMap,
          ...sassOptionItem,
        },
      })),
    },
  };

  const configRule = {
    test: /\.scss$/,
    use: stage.includes('html')
      ? [loaders.null()]
      : [
          loaders.miniCssExtract(),
          loaders.css({ ...cssLoaderOptions, importLoaders: 2 }),
          loaders.postcss({
            plugins: [deduper(), ...postCssPlugins],
          }),
          sassMultipleInstancesLoader,
        ],
  };

  const stagesToApplyConfigRule = new Set([
    'develop',
    'build-javascript',
    'build-html',
    'develop-html',
  ]);

  setWebpackConfig({
    module: {
      rules: !stagesToApplyConfigRule.has(stage) ? [] : [configRule],
    },
  });
};
