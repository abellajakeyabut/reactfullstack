const env = process.env;
export const nodeEnv = env.NODE_ENV || 'dev';
export const configuration = {
  port: env.PORT || 8080,
  host: '0.0.0.0',
  mongodUri: 'mongodb://localhost:27017/MERN',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  },
};
export const mongodbUri = 'mongodb';
