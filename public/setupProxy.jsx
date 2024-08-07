const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://192.168.1.10',
      secure: false, // Disable SSL verification for development
      changeOrigin: true,
    })
  );
};
