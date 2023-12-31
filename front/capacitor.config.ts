import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'android;cellar.beers',
  appName: 'cave-a-bieres',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
