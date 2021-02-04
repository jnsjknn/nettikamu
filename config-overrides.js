/* config-overrides.js */
const { override, adjustStyleLoaders } = require('customize-cra');
const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = override(
  adjustStyleLoaders(({ use: [, css] }) => {
    if (css.options.modules) {
      css.options.modules.getLocalIdent = (
        context,
        localIdentName,
        localName,
        options
      ) => {
        const hash = loaderUtils.getHashDigest(
          path.posix.relative(context.rootContext, context.resourcePath) +
            localName,
          'md5',
          'base64',
          6
        );
        const className = loaderUtils.interpolateName(
          context,
          '_' + hash,
          options
        );
        return className.replace('.module_', '_');
      };
    }
  })
);
