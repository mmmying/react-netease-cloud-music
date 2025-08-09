const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    })
  );

  app.use(
    "/graphql",
    createProxyMiddleware({
      target: "http://localhost:4000/graphql",
      changeOrigin: true
    })
  );
};
