function ErrorOnWarningsPlugin() {};

ErrorOnWarningsPlugin.prototype.apply = (compiler) => {
  compiler.hooks.shouldEmit.tap('ErrorOnWarningsPlugin', (compilation) => {
    let result;
    if (compilation.warnings && compilation.warnings.length) {
      compilation.errors.push("Error: Warnings are not allowed.");
      result = false;
    }

    if (compilation.children) {
      compilation.children.forEach((child) => {
        if (child.warnings && child.warnings.length) {
          compilation.errors.push(
            `Error in child compiler${
              child.name ? ` ${child.name}` : ' '
            }: Warnings are not allowed.`
          );
          result = false;
        }
      });
    }
    return result;
  });
};

module.exports = ErrorOnWarningsPlugin;
