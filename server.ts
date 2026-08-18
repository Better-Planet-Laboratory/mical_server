import mongoose = require('mongoose');
import { config } from './config/env';
import { app } from './config/restify';
import { logger } from './utils/logger';

// use native ES6 promises instead of mongoose promise library
mongoose.Promise = global.Promise;

// connect to mongodb
const options: mongoose.ConnectOptions = {
  user: config.dbUser,
  pass: config.dbPass,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  ...config.connOpts,
};
const db = mongoose.connect(config.db, options);

// print mongoose logs in dev and test env
if (config.debug) {
  mongoose.set('debug', true);
}

mongoose.connection.on('error', (err: any) => {
  logger.error(`Mongo connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  logger.warn('Mongo connection lost, driver will attempt to reconnect');
});
mongoose.connection.on('reconnected', () => {
  logger.info('Mongo connection restored');
});

db.then(() => {
  logger.info(`Connected to database: ${config.db}`);
  app.listen(config.port, '0.0.0.0', () => {
    logger.info(`${config.name} is running at ${app.url}`);
  });
}, (err: any) => {
  console.log(
    `Unable to connect to database: ${err}, url ${config.db}, opts:
    ${JSON.stringify(options, null , '\t')}`
  );
});

export { app, db };
