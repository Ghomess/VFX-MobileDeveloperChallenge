module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|react-native-chart-kit|@react-navigation|@react-navigation/bottom-tabs|@react-navigation/native|@react-navigation/native-stack|react-native-svg|react-native-vector-icons)/)',
  ],
};
