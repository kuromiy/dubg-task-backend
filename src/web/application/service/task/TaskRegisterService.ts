import { Task } from "../../../../domain/task/Task";
import { TaskRegisterRequest } from "../../../presentation/request/task/TaskRegisterRequest";
import { TaskResource } from "../../../presentation/resource/TaskResource";
import { TaskStatusResource } from "../../../presentation/resource/TaskStatusResource";
import { TaskRegisterResponse } from "../../../presentation/response/task/TaskRegisterResponse";
import { TaskRegisterInput } from "../../../../usecase/task/register/TaskRegisterInput";
import { TaskRegisterUseCase } from "../../../../usecase/task/register/TaskRegisterUseCase";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../container/types";

@injectable()
class TaskRegisterService {
    constructor(
        @inject(TYPES.ApplicationLogger) private _logger: ApplicationLogger,
        @inject(TYPES.TaskRegisterUseCase) private _taskRegisterUseCase: TaskRegisterUseCase) {}

    public async execute(request: TaskRegisterRequest): Promise<TaskRegisterResponse> {
        this._logger.debug("TaskRegisterService#execute");
        const input = new TaskRegisterInput(request.taskName, request.userId);
        const output = await this._taskRegisterUseCase.handle(input);

        const resource = this._convert(output.task);
        const response = new TaskRegisterResponse(resource);
        return response;
    }

    private _convert(task: Task): TaskResource {
        const taskStatusResource = new TaskStatusResource(task.taskStatus.taskStatusId, task.taskStatus.taskStatusName);
        const taskResource = new TaskResource(task.taskId, task.taskName, taskStatusResource, task.userId, task.createdAt, task.updatedAt);

        return taskResource;
    }
}

export { TaskRegisterService };
