/* eslint-disable no-shadow */
const { format, createLogger, transports } = require('winston');

const {
  timestamp, combine, label, printf, errors,
} = format;

const buildDevLogger = () => {
  const logFormat = printf(
    ({
      level, message, label, timestamp, stack,
    }) => `${timestamp} [${label}] ${level}: ${stack || message}`,
  );
  return createLogger({
    level: 'debug',
    format: combine(
      label({ label: 'Development Mode' }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat,
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'errors.log',
      }),
    ],
  });
};

module.exports = buildDevLogger;
