import * as dotenv from 'dotenv';
dotenv.config();

export const dev = {
  app: {
    serverPort: process.env.SERVER_PORT,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    smtpUsername: process.env.SMTP_SERVER_USERNAME,
    smtpPassword: process.env.SMTP_SERVER_PASSWORD,
  },
  db: {},
};
