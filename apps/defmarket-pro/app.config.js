const myValue = 'Defmarket Pro';

export default {
  name: myValue,
  scheme: 'defmarket-pro',
  version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.0.0',
  //plugin: ['react-native-email-link'],
  android: {
    package: 'fr.hyperion.defmarket.pro',
  },
  ios: {
    bundleIdentifier: 'fr.hyperion.defmarket.pro',
  },
  // All values in extra will be passed to your app.
  extra: {
    fact: '',
    notification: {
      vapidPublicKey: 'key',
    },
  },
};
