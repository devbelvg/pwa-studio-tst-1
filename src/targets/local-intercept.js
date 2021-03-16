module.exports = targets => {
  targets.of("@magento/venia-ui").routes.tap(routes => {
    routes.push({
      name: "Blog",
      pattern: "/blog.html",
      path: require.resolve("../components/Blog/blog.js")
    });
    routes.push({
      name: "PostPage",
      pattern: "/blog/:url_key?",
      path: require.resolve("../components/Blog/postPage.js")
  });
    routes.push({
      name: "Cart",
      pattern: "/cart",
      path: require.resolve("../components/CartPage/cartPage.js")
  });
    return routes;
  });
};