import { AndroidConfig, withAndroidManifest } from '@expo/config-plugins';

const withAndroidQueries = (config: any) => {
  return withAndroidManifest(config, (config: any) => {
    config.modResults.manifest.queries = [
      {
        intent: [
          {
            action: [{ $: { 'android:name': 'android.intent.action.SENDTO' } }],
            data: [{ $: { 'android:scheme': 'mailto' } }],
          },
          {
            action: [{ $: { 'android:name': 'android.intent.action.DIAL' } }],
          },
        ],
      },
    ];

    return config;
  });
};

export default withAndroidQueries;