import { Task } from "../../../domain/task/Task";
import { TaskRepository } from "../../../domain/task/TaskRepository";
import { UserRepository } from "../../../domain/user/UserRepository";
import { TaskSearchInput } from "./TaskSearchInput";
import { TaskSearchOutput } from "./TaskSearchOutput";
import { TaskSearchUseCase } from "./TaskSearchUseCase";

class TaskSearchAction implements TaskSearchUseCase {
    constructor(
        private _userRepository: UserRepository,
        private _taskRepository: TaskRepository) {}

    public async handle(input: TaskSearchInput): Promise<TaskSearchOutput> {
        // 1. ユーザー存在確認
        const user = await this._userRepository.findByUserId(input.userId);
        if (!user) throw new Error("ユーザーが存在しません。");

        // 2. 検索数取得
        const count = await this._taskRepository.count(input.taskName, input.taskStatusId, input.userId);
        if (count === 0) return new TaskSearchOutput(count, new Array<Task>());

        // 3. 検索結果取得
        const tasks = await this._taskRepository.search(input.taskName, input.taskStatusId, input.userId, input.limit, input.offset);
        return new TaskSearchOutput(count, tasks);
    }
}

export { TaskSearchAction };
