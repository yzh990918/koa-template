const winston = require('winston')
require('winston-daily-rotate-file')

// 每日日志格式
const infoTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/%DATE%-info.log',
  datePattern:'YYYY-MM-DD-HH',
  level: 'info',
  // 开启压缩
  zippedArchive: true,
  maxSize: '20m',
  // 最大日志文件数或者最多保存日志天数
  maxFiles: '14d'
})

const logger = winston.createLogger({
  transports:[
    infoTransport
  ]
})

module.exports = logger
