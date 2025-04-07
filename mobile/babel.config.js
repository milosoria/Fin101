module.exports = function (api) {
  api.cache(true);
  const plugins = ['react-native-reanimated/plugin'];
  const presets = ['babel-preset-expo'];
  return {
    plugins,
    presets,
  };
};
