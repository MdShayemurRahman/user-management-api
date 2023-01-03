import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import cors from 'cors';

import { dev } from './config/index.js';
import authRoute from './routes/auth.js';
import { connectDB } from './config/db.js';
import userRoute from './routes/user.js';

const app = express();

const port = dev.app.serverPort;

app.listen(port, async () => {
  console.log(chalk.green(`Server is running at http://127.0.0.1:${port}`));
  await connectDB();
});

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', authRoute);
app.use('/api', userRoute);

// database connection
// schmea
// model
// store data

//  row/document - table/collection - model -  database
// user - schema - structure of the data
