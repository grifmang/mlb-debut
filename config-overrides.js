module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "path": require.resolve("path-browserify")
    };
    return config;
  };
  