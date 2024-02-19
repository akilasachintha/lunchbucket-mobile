import axios from 'axios';

export const lunchBucketAPI = axios.create({baseURL: process.env.EXPO_PUBLIC_LUNCHBUCKET_API});
export const projectCode = process.env.EXPO_PUBLIC_PROJECT_CODE;
export const auth2API = axios.create({baseURL: process.env.EXPO_PUBLIC_AUTH2_API});
export const ENV_STRING = process.env.EXPO_PUBLIC_ENV + ' ENVIRONMENT';
export const ENV = process.env.EXPO_PUBLIC_ENV;
export const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION;

// export const EXPERT_API = axios.create({baseURL: process.env.EXPO_PUBLIC_EXPERT_API});

