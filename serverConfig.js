const env = process.env;
export const nodeEnv = env.NODE_ENV || 'dev';
export const configuration = {
  port: env.PORT || 8080,
};
