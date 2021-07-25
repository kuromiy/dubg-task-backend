import "reflect-metadata";
import { injectable } from "inversify";
import { Logger } from "log4js";
import { ApplicationLogger } from "./ApplicationLogger";

@injectable()
class ApplicationLoggerByLog4js implements ApplicationLogger {
    constructor(private _logger: Logger) {}

    public debug(message: string): void {
        this._logger.debug(message);
    }

    public info(message: string): void {
        this._logger.info(message);
    }

    public warn(message: string): void {
        this._logger.warn(message);
    }
    
    public error(message: string): void {
        this._logger.error(message);
    }
    
    public fatal(message: string): void {
        this._logger.fatal(message);
    }
}

export { ApplicationLoggerByLog4js };
