module.exports = targets => {
  targets.of("@magento/venia-ui").routes.tap(routes => {
    routes.push({
      name: "Blog",
      pattern: "/blog/",
      path: require.resolve("../components/Blog/blog.js")
    });
    return routes;
  });
};