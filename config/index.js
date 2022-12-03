import * as dotenv from 'dotenv';
dotenv.config();

export const dev = {
  app: {
    serverPort: process.env.SERVER_PORT,
  },
  db: {},
};
