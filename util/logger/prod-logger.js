/* eslint-disable no-shadow */
const { format, createLogger, transports } = require('winston');

const {
  timestamp, combine, errors, json,
} = format;

const buildProdLogger = () => createLogger({
  level: 'debug',
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'errors.log',
    }),
  ],
});

module.exports = buildProdLogger;
