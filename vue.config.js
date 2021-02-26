module.exports = {
    devServer: {
        proxy: {
            '/myapp': {
                target: 'http://localhost:8000/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    // '^/myapp': ''
                }
            }
        }
    }
}