module.exports = {
  sourceMaps: true,
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-react',
      ],
    },
    module: {
      presets: [
        '@babel/preset-modules',
        '@babel/preset-react',
      ],
    },
    commonjs: {
      presets: [
        '@babel/preset-modules',
        '@babel/preset-react',
      ],
    },
  },
};
