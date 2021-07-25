import { Task } from "../../../../domain/task/Task";
import { TaskSearchRequest } from "../../../presentation/request/task/TaskSearchRequest";
import { TaskResource } from "../../../presentation/resource/TaskResource";
import { TaskStatusResource } from "../../../presentation/resource/TaskStatusResource";
import { TaskSearchResponse } from "../../../presentation/response/task/TaskSearchResponse";
import { TaskSearchInput } from "../../../../usecase/task/search/TaskSearchInput";
import { TaskSearchUseCase } from "../../../../usecase/task/search/TaskSearchUseCase";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../container/types";

@injectable()
class TaskSearchService {
    constructor(
        @inject(TYPES.ApplicationLogger) private _logger: ApplicationLogger,
        @inject(TYPES.TaskSearchUseCase) private _taskSearchUseCase: TaskSearchUseCase) {}

    public async execute(request: TaskSearchRequest): Promise<TaskSearchResponse> {
        this._logger.debug("TaskSearchService#execute");
        const input = new TaskSearchInput(request.taskName, request.taskStatusId, request.userId, request.limit, request.offset);
        const output = await this._taskSearchUseCase.handle(input);

        const resources = this._convert(output.tasks);
        const response = new TaskSearchResponse(output.count, resources);
        return response;
    }

    private _convert(tasks: Array<Task>): Array<TaskResource> {
        const taskResources = tasks.map(task => {
            const taskStatusResource = new TaskStatusResource(task.taskStatus.taskStatusId, task.taskStatus.taskStatusName);
            const taskResource = new TaskResource(task.taskId, task.taskName, taskStatusResource, task.userId, task.createdAt, task.updatedAt);

            return taskResource;
        });

        return taskResources;
    }
}

export { TaskSearchService };
