/* eslint-disable import/no-extraneous-dependencies, global-require */
const plugins = [
  require('postcss-import'),
  require('postcss-nested'),
  require('autoprefixer'),
  // require('tailwindcss'),
];

if (process.env.NODE_ENV === 'production') {
  // noinspection JSValidateTypes
  // plugins.push(
  //   require('@fullhuman/postcss-purgecss')({
  //     content: ['src/**/*.njk', 'src/**/*.md'],
  //     safelist: ['a'],
  //   }),
  // );
  plugins.push(
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  );
}

module.exports = { plugins };
