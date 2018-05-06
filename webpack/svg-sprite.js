const path = require('path');
const SvgStore = require('webpack-svgstore-plugin');

module.exports = function () {
  return {
    plugins: [
      new SvgStore(
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
