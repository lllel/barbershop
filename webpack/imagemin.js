const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = function () {
  return {
    plugins: [
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        optipng: {
          optimizationLevel: 3
        },

        pngquant: {
          quality: '90',
          speed: 5,
        },

        jpegtran: {
          progressive: true
        },

        gifsicle: {
          optimizationLevel: 3,
        },

        svgo: {
          plugins: [{
            removeViewBox: false,
            removeEmptyAttrs: true,
          }],
        },

        plugins: [
          imageminMozjpeg({
            quality: 90,
            progressive: true,
          })
        ]
      })
    ]
  };
};
