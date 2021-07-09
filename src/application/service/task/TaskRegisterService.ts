import { Task } from "../../../domain/task/Task";
import { TaskRepository } from "../../../domain/task/TaskRepository";
import { TaskRegisterRequest } from "../../../presentation/request/task/TaskRegisterRequest";
import { TaskResource } from "../../../presentation/resource/TaskResource";
import { TaskStatusResource } from "../../../presentation/resource/TaskStatusResource";
import { TaskRegisterResponse } from "../../../presentation/response/task/TaskRegisterResponse";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";

class TaskRegisterService {
    constructor(
        private _logger: ApplicationLogger,
        private _taskRepository: TaskRepository) {}

    public async execute(request: TaskRegisterRequest): Promise<TaskRegisterResponse> {
        this._logger.debug("TaskRegisterService#execute");
        const existTask = await this._taskRepository.findByTaskName(request.taskName, request.userId);
        if (existTask) throw new Error("タスク名が存在します。");

        const taskId = await this._taskRepository.generateTaskId();
        const task = Task.create(taskId, request.taskName, request.userId);
        const result = await this._taskRepository.register(task);
        if (result === 0) throw new Error("タスク登録に失敗しました。");

        const resource = this._convert(task);
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
