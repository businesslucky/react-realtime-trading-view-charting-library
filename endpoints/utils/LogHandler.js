const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('winston-daily-rotate-file');

// Init Logger service
let logger = createLogger({
  exitOnError: false,
  handleExceptions: true
});

// Set log path
let logPath = process.env.LOG_PATH ? process.env.LOG_PATH : './.log'
let logPrefixFile = process.env.LOG_PREFIX_FILE ? process.env.LOG_PREFIX_FILE + '_' : ''

// Log to Debug file
logger.add(new transports.DailyRotateFile({
  level: 'debug',
  dirname: logPath,
  filename: logPrefixFile + 'web_%DATE%.log',
  datePattern: 'YYYY_MM_DD',
  maxSize: '500m',
  format: combine(
    timestamp(),
    printf(info => {
      let message = formatMessage(info)
      if (info.object)
        message += '\n' + info.object
      return message
    })
  )
}));

// If we're not in production then log to the `console`
if (process.env.HTTPS !== 'true') {
  logger.add(new transports.Console({
    level: 'debug',
    format: combine(
      timestamp(),
      format.colorize({
        colors: {
          info: 'blue',
          debug: 'yellow',
          error: 'red'
        }
      }),
      printf(info => {
        let message = formatMessage(info)
        if (info.object)
          message += '\n' + info.object
        return message
      })
    )
  }));
}

/**
 * Global log function
 * @param {String}  File the file and function where it happened
 * @param {Message} Message the log message
 * @param {Object}  Object the object to be dumped
 */
global.log = function (file, message, object) {
  let logOption = { icon: '🔹', file, message }
  if (process.env.DEBUG == 'true' && object)
    logOption.object = JSON.stringify(object, null, '  ')
  logger.log('info', logOption);
  return true
}

/**
 * Global logError function
 * @param {String}  File the file and function where it happened
 * @param {Message} Message the log message
 * @param {Object}  Object the object to be dumped
 */
global.logError = function (file, message, object) {
  if (object && object.stack) {
    object = object.stack.toString()
  } else {
    object = JSON.stringify(object, null, '  ')
  }
  logger.log('error', { icon: '🧨', file, message, object });
  return true
}

/**
 * Global debug function
 * @param {String}  File the file and function where it happened
 * @param {Message} Message the log message
 * @param {Object}  Object the object to be dumped
 */
global.debug = function (file, message, object) {
  let logOption = { icon: '🐞', file, message }
  if (process.env.DEBUG == 'true' && object)
    logOption.object = JSON.stringify(object, null, '  ')
  logger.log('debug', logOption);
  return true
}

/**
 * Format log message
 * @param {Object} info
 */
let formatMessage = function (info) {
  let message = `[${info.file}] ${info.message}`
  message = `${info.icon}${info.level} ${info.timestamp} ${message}`
  return message
}

/**
 * Exception unhandledRejection handling
 */
process.on('unhandledRejection', (error) => {
  logError('utils/LogHandler.js', 'unhandledRejection', error);
})

/**
 * Exception uncaughtException handling
 */
process.on('uncaughtException', (error) => {
  logError('utils/LogHandler.js', 'uncaughtException', error);
})

/**
 * Exception warning handling
 */
process.on('warning', (error) => {
  logError('utils/LogHandler.js', 'warning', error);
});
