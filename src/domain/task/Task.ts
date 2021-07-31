import { TaskStatus } from "./TaskStatus";

class Task {
    private _taskId: number | null;
    private _taskName: string;
    private _taskStatus: TaskStatus;
    private _childTasks: Array<Task>;
    private _userId: string;
    private _createdAt: Date | null;
    private _updatedAt: Date | null;

    private constructor(taskId: number | null, taskName: string, taskStatus: TaskStatus, childTasks: Array<Task>, userId: string, createdAt: Date | null, updatedAt: Date | null) {
        this._taskId = taskId;
        this._taskName = taskName;
        this._taskStatus = taskStatus;
        this._childTasks = childTasks;
        this._userId = userId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    public static create(taskName: string, childTaskNames: Array<string>, userId: string): Task {
        const taskStatus = TaskStatus.createNewTask();
        const childTasks = childTaskNames.map(value => {
            return new Task(null, value, taskStatus, new Array<Task>(), userId, null, null);
        });
        return new Task(null, taskName, taskStatus, childTasks, userId, null, null);
    }

    public static recreate(taskId: number, taskName: string, taskStatus: TaskStatus, childTasks: Array<Task>, userId: string, createdAt: Date, updatedAt: Date): Task {
        return new Task(taskId, taskName, taskStatus, childTasks, userId, createdAt, updatedAt);
    }

    public get taskId(): number {
        if (!this._taskId) throw new Error("タスクIDが存在しません。");
        return this._taskId;
    }

    public get taskName(): string {
        return this._taskName;
    }

    public get taskStatus(): TaskStatus {
        return this._taskStatus;
    }

    public get childTasks(): Array<Task> {
        return this._childTasks;
    }

    public get userId(): string {
        return this._userId;
    }

    public get createdAt(): Date {
        if (!this._createdAt) throw new Error("登録日時が存在しません。");
        return this._createdAt;
    }

    public get updatedAt(): Date {
        if (!this._updatedAt) throw new Error("更新日時が存在しません。");
        return this._updatedAt;
    }
}

export { Task };
