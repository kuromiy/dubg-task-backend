import Ajv from "ajv";
import { Container, interfaces } from "inversify";
import { getLogger, Logger } from "log4js";
import { UserMemorySource } from "../application/datasource/UserMemorySource";
import { LogInService } from "../application/service/auth/LogInService";
import { LogInController } from "../presentation/controller/auth/LogInController";
import { TokenUtils } from "../utils/token/TokenUtils";
import { TokenUtilsByJwt } from "../utils/token/TokenUtilsByJwt";
import { ApplicationLogger } from "../utils/logger/ApplicationLogger";
import { ApplicationLoggerByLog4js } from "../utils/logger/ApplicationLoggerByLog4js";
import { LogInValidate } from "../utils/validation/auth/LogInValidate";
import { LogInValidateByAjv } from "../utils/validation/auth/LogInValidateByAjv";
import { TaskRegisterValidate } from "../utils/validation/task/TaskRegisterValidate";
import { TaskRegisterValidateByAjv } from "../utils/validation/task/TaskRegisterValidateByAjv";
import { TaskMemorySource } from "../application/datasource/TaskMemorySource";
import { TaskRegisterService } from "../application/service/task/TaskRegisterService";
import { TaskRegisterController } from "../presentation/controller/task/TaskRegisterController";
import { TaskSearchService } from "../application/service/task/TaskSearchService";
import { TaskSearchController } from "../presentation/controller/task/TaskSearchController";
import { TaskSearchValidateByAjv } from "../utils/validation/task/TaskSearchValidateByAjv";
import { TaskSearchValidate } from "../utils/validation/task/TaskSearchValidate";
import { TaskRegisterUseCase } from "../../usecase/task/register/TaskRegisterUseCase";
import { TaskRegisterAction } from "../../usecase/task/register/TaskRegisterAction";
import { TaskRepository } from "../../domain/task/TaskRepository";
import { UserRepository } from "../../domain/user/UserRepository";
import { TaskSearchUseCase } from "../../usecase/task/search/TaskSearchUseCase";
import { TaskSearchAction } from "../../usecase/task/search/TaskSearchAction";

const container = new Container();

// Vendor
container
    .bind<Ajv>("Ajv")
    .toDynamicValue((context: interfaces.Context) => {
        return new Ajv();
    });
container
    .bind<Logger>("Logger")
    .toDynamicValue((context: interfaces.Context) => {
        const logger = getLogger();
        logger.level = "debug";
        return logger;
    });

// Utils
container
    .bind<ApplicationLogger>("ApplicationLogger")
    .toDynamicValue((context: interfaces.Context) => {
        return new ApplicationLoggerByLog4js(context.container.get("Logger"));
    });
container
    .bind<TokenUtils>("TokenUtils")
    .toDynamicValue((context: interfaces.Context) => {
        return new TokenUtilsByJwt();
    });

// Validate
container
    .bind<LogInValidate>("LogInValidate")
    .toDynamicValue((context: interfaces.Context) => {
        return new LogInValidateByAjv(
            context.container.get("ApplicationLogger"),
            context.container.get("Ajv"));
    });
container
    .bind<TaskRegisterValidate>("TaskRegisterValidate")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskRegisterValidateByAjv(
            context.container.get("ApplicationLogger"),
            context.container.get("Ajv"));
    });
container
    .bind<TaskSearchValidate>("TaskSearchValidate")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskSearchValidateByAjv(
            context.container.get("ApplicationLogger"),
            context.container.get("Ajv"));
    });

// Repository
container
    .bind<UserRepository>("UserRepository")
    .toDynamicValue((context: interfaces.Context) => {
        return new UserMemorySource(context.container.get("ApplicationLogger"));
    });
container
    .bind<TaskRepository>("TaskRepository")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskMemorySource(context.container.get("ApplicationLogger"));
    });

// UseCase
container
    .bind<TaskRegisterUseCase>("TaskRegisterUseCase")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskRegisterAction(
            context.container.get("UserRepository"),
            context.container.get("TaskRepository"));
    });
container
    .bind<TaskSearchUseCase>("TaskSearchUseCase")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskSearchAction(
            context.container.get("UserRepository"),
            context.container.get("TaskRepository"));
    });

// Service
container
    .bind<LogInService>("LogInService")
    .toDynamicValue((context: interfaces.Context) => {
        return new LogInService(
            context.container.get("ApplicationLogger"),
            context.container.get("UserRepository"),
            context.container.get("TokenUtils"));
    });
container
    .bind<TaskRegisterService>("TaskRegisterService")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskRegisterService(
            context.container.get("ApplicationLogger"),
            context.container.get("TaskRegisterUseCase"));
    });
container
    .bind<TaskSearchService>("TaskSearchService")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskSearchService(
            context.container.get("ApplicationLogger"),
            context.container.get("TaskSearchUseCase"));
    });

// Controller
container
    .bind<LogInController>("LogInController")
    .toDynamicValue((context: interfaces.Context) => {
        return new LogInController(
            context.container.get("ApplicationLogger"),
            context.container.get("LogInValidate"),
            context.container.get("LogInService"));
    });
container
    .bind<TaskRegisterController>("TaskRegisterController")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskRegisterController(
            context.container.get("ApplicationLogger"),
            context.container.get("TaskRegisterValidate"),
            context.container.get("TaskRegisterService"));
    });
container
    .bind<TaskSearchController>("TaskSearchController")
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskSearchController(
            context.container.get("ApplicationLogger"),
            context.container.get("TaskSearchValidate"),
            context.container.get("TaskSearchService"));
    });

export { container };
