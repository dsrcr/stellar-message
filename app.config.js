import 'dotenv/config';

export default {
  expo: {
    name: 'stellar-message',
    owner: 'dsrcr',
    slug: 'stellar-message',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/logo.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/logo.png',
        backgroundColor: '#ffffff',
      },

      package: 'com.fw.stellarmessage',
    },
    web: {
      favicon: './assets/logo.png',
    },
    extra: {
      eas: {
        projectId: 'f1fc955c-95fa-47a2-858e-0dd04681d956',
      },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
