import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // appId: 'com.keus.bleApp',
  appId: 'com.serviceapp.app',
  // appName: 'Ops V2',
  appName: 'Keus ',
  webDir: 'build',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
