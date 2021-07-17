import { Task } from "../../../domain/task/Task";
import { TaskRepository } from "../../../domain/task/TaskRepository";
import { UserRepository } from "../../../domain/user/UserRepository";
import { TaskRegisterInput } from "./TaskRegisterInput";
import { TaskRegisterOutput } from "./TaskRegisterOutput";
import { TaskRegisterUseCase } from "./TaskRegisterUseCase";

class TaskRegisterAction implements TaskRegisterUseCase {
    constructor(
        private _userRepository: UserRepository,
        private _taskRepository: TaskRepository) {}

    public async handle(input: TaskRegisterInput): Promise<TaskRegisterOutput> {
        // 1. ユーザー存在確認
        const user = await this._userRepository.findByUserId(input.userId);
        if (!user) throw new Error("ユーザーが存在しません。");

        // 2. タスク名重複チェック
        const existTask = await this._taskRepository.findByTaskName(input.taskName, user.userId);
        if (existTask) throw new Error("同一タスク名が存在します。");

        // 3. タスクID生成
        const taskId = await this._taskRepository.generateTaskId();

        // 4. タスク作成
        const registerableTask = Task.create(taskId, input.taskName, input.userId);

        // 5. タスク登録
        const result = await this._taskRepository.register(registerableTask);
        if (result === 0) throw new Error("タスク登録処理に失敗しました。");

        return new TaskRegisterOutput(registerableTask);
    }
}

export { TaskRegisterAction };
