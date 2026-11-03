export const environment = {
  baseURL: process.env.BASE_URL ?? 'https://automationexercise.com',
  timeoutSeconds: Number(process.env.TEST_TIMEOUT_SECONDS ?? 30),
};
