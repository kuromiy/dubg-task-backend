import Ajv from "ajv";
import { Container, interfaces } from "inversify";
import { getLogger, Logger } from "log4js";
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
import { PrismaClient } from "@prisma/client";
import { UserDataSource } from "../application/datasource/UserDataSource";
import { TaskDataSource } from "../application/datasource/TaskDataSource";
import { TYPES } from "./types";

const container = new Container();


// Vendor
container
    .bind<Ajv>(TYPES.Ajv)
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
container
    .bind<PrismaClient>(TYPES.PrismaClient)
    .toDynamicValue((context: interfaces.Context) => {
        return new PrismaClient({log: ["query"]});
    });

// Utils
container
    .bind<ApplicationLogger>(TYPES.ApplicationLogger)
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
            context.container.get<ApplicationLogger>(TYPES.ApplicationLogger),
            context.container.get<Ajv>(TYPES.Ajv));
    });
container
    .bind<TaskRegisterValidate>(TYPES.TaskRegisterValidate)
    .to(TaskRegisterValidateByAjv);
container
    .bind<TaskSearchValidate>(TYPES.TaskSearchValidate)
    .to(TaskSearchValidateByAjv);

// Repository
container
    .bind<UserRepository>(TYPES.UserRepository)
    .to(UserDataSource);
container
    .bind<TaskRepository>(TYPES.TaskRepository)
    .to(TaskDataSource);

// UseCase
container
    .bind<TaskRegisterUseCase>(TYPES.TaskRegisterUseCase)
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskRegisterAction(
            context.container.get<UserRepository>(TYPES.UserRepository),
            context.container.get<TaskRepository>(TYPES.TaskRepository));
    });
container
    .bind<TaskSearchUseCase>(TYPES.TaskSearchUseCase)
    .toDynamicValue((context: interfaces.Context) => {
        return new TaskSearchAction(
            context.container.get<UserRepository>(TYPES.UserRepository),
            context.container.get<TaskRepository>(TYPES.TaskRepository));
    });

// Service
container
    .bind<LogInService>("LogInService")
    .toDynamicValue((context: interfaces.Context) => {
        return new LogInService(
            context.container.get<ApplicationLogger>(TYPES.ApplicationLogger),
            context.container.get<UserRepository>(TYPES.UserRepository),
            context.container.get<TokenUtils>("TokenUtils"));
    });
container
    .bind<TaskRegisterService>(TYPES.TaskRegisterService)
    .to(TaskRegisterService);
container
    .bind<TaskSearchService>(TYPES.TaskSearchService)
    .to(TaskSearchService);

// Controller
container
    .bind<LogInController>("LogInController")
    .toDynamicValue((context: interfaces.Context) => {
        return new LogInController(
            context.container.get<ApplicationLogger>(TYPES.ApplicationLogger),
            context.container.get<LogInValidate>("LogInValidate"),
            context.container.get<LogInService>("LogInService"));
    });
container
    .bind<TaskRegisterController>(TYPES.TaskRegisterController)
    .to(TaskRegisterController);
container
    .bind<TaskSearchController>(TYPES.TaskSearchController)
    .to(TaskSearchController);

export { container };
