import { createLogger, format, transports, Logger } from "winston";

// Singleton Logger
class LoggerSingleton {
  private static instance: Logger;

  private constructor() {}

  public static getLogger(): Logger {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = createLogger({
        level: "info",
        format: format.combine(
          format.colorize(),
          format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
          }),
          format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
          }),
        ),
        transports: [
          new transports.Console({
            level: "debug",
          }),
        ],
      });
    }

    return LoggerSingleton.instance;
  }
}

export default LoggerSingleton;
