const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      createProxyMiddleware('/kubet/A', { target: 'http://localhost:5000' })
    );
};