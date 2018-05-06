module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          loader: 'babel-loader'
        },

        {
          test: /\.(jpe?g|png|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        },

        {
          test: /\.(woff|woff2)$/i,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      ]
    }
  };
};
