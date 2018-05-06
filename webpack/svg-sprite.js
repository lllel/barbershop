const path = require('path');
const SvgStore = require('webpack-svgstore-plugin');

module.exports = function () {
  return {
    plugins: [
      new SvgStore(
        path.resolve(__dirname, './source/img/*.svg'),
        path.resolve(__dirname, './build/img/'),
        {
          filename: 'sprite-svg.svg',
          prefix: 'icon-',
          svgoOptions: {
            removeTitle: true
          }
        }
      )
    ]
  };
};
