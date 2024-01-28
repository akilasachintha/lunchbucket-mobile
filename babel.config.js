module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    "root": ["./src"],
                    alias: {
                        '@components': './src/components',
                        '@assets': './src/assets',
                        '@screens': './src/screens',
                        '@navigation': './src/navigation',
                        '@helpers': './src/helpers',
                        '@theme': './src/theme',
                        '@config': './src/config',
                        '@hooks': './src/hooks',
                        '@context': './src/context',
                        '@interfaces': './src/interfaces',
                        '@constants': './src/constants',
                    },
                },
            ],
        ],
    };
};