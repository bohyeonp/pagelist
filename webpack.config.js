module.exports = {
    module: {
        rules: [
            ...
                {
                    test: /\.(eot|md|svg|ttf|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                },

        ],

    }
}

