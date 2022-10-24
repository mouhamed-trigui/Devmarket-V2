// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: [
                        '.js',
                        '.jsx',
                        '.ts',
                        '.tsx',
                        '.android.js',
                        '.android.tsx',
                        '.ios.js',
                        '.ios.tsx',
                    ],
                    alias: {
                        '@components': './src/components',
                        '@atomes': './src/app/components/atomes',
                        '@button': './src/app/components/atomes/button/general-button/Button.tsx',
                        '@screens': './src/screens',
                        '@stores': './src/stores',
                        '@utils': './src/utils',
                        '@services': './src/services',
                        '@assets': './assets',
                        '@constants': './src/constants',
                    },
                },
            ],
        ],
    };
};
