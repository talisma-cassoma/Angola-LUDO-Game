module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Mudança crucial para o Expo Go funcionar
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '$assets': './src/assets',
            '$constants': './src/constants',
            '$components': './src/components',
            '$helpers': './src/helpers',
            '$screens': './src/screens',
            '$redux': './src/redux',
            '$hooks': './src/hooks',
            '$navigation': './src/navigation',
          },
        },
      ],
      // O plugin do Reanimated DEVE ser sempre o último da lista de plugins
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  };
};
