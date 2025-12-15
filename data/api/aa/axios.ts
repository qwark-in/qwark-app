import axios from 'axios';

axios.interceptors.request.use((config) => {
  if (
    process.env.EXPO_PUBLIC_DEV_CAMS_UAT_FIP_ID &&
    config.method?.toLowerCase() === 'post' &&
    config.data &&
    typeof config.data === 'object' &&
    'fip_id' in config.data
  ) {
    config.data.fip_id = process.env.EXPO_PUBLIC_DEV_CAMS_UAT_FIP_ID;
  }

  if (
    process.env.EXPO_PUBLIC_DEV_CAMS_UAT_FIP_ID &&
    config.method?.toLowerCase() === 'post' &&
    config.data &&
    typeof config.data === 'object' &&
    'fip_ids' in config.data
  ) {
    config.data.fip_ids = config.data.fip_ids.map(
      (_: any) => process.env.EXPO_PUBLIC_DEV_CAMS_UAT_FIP_ID
    );
  }

  return config;
});

export default axios;
