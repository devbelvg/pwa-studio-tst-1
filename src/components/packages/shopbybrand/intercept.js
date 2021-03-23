module.exports = targets => {
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        flags[targets.name] = {esModules: true, cssModules: true};
    });
    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
          name: "ShopBrand",
          pattern: "/shop-by-brand/:brand?",
          path: require.resolve("./lib/components/ShopByBrand/home.js")
        });
        return routes;
      });
}