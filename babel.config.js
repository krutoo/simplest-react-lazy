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
    build: {
      presets: [
        '@babel/preset-modules',
        '@babel/preset-react',
      ],
    },
  },
};
