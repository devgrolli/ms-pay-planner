import { createLogger, format, transports } from "winston";
import { TransformableInfo } from "logform";

interface LogInfo extends TransformableInfo {
  timestamp: string;
  level: string;
  message: string;
}

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info: TransformableInfo) => {
      const { timestamp, level, message, config } = info;
      if (config in info) { // Check if config exists before accessing
        return `${timestamp} ${level}: ${message} : ${JSON.stringify(info.config)}`;
      } else {
        return `${timestamp} ${level}: ${message}`;
      }
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;