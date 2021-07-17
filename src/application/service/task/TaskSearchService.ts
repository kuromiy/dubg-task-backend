import { Task } from "../../../domain/task/Task";
import { TaskRepository } from "../../../domain/task/TaskRepository";
import { TaskSearchRequest } from "../../../presentation/request/task/TaskSearchRequest";
import { TaskResource } from "../../../presentation/resource/TaskResource";
import { TaskStatusResource } from "../../../presentation/resource/TaskStatusResource";
import { TaskSearchResponse } from "../../../presentation/response/task/TaskSearchResponse";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";

class TaskSearchService {
    constructor(
        private _logger: ApplicationLogger,
        private _taskRepository: TaskRepository) {}

    public async execute(request: TaskSearchRequest): Promise<TaskSearchResponse> {
        this._logger.debug("TaskSearchService#execute");
        const count = await this._taskRepository.count(request.taskName, request.taskStatusId, request.userId);
        console.log(count);
        if (count === 0) return new TaskSearchResponse(count, new Array<TaskResource>());

        const tasks = await this._taskRepository.search(request.taskName, request.taskStatusId, request.userId, request.limit, request.offset);

        const resources = this._convert(tasks);
        const response = new TaskSearchResponse(count, resources);
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
