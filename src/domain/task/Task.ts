import { TaskStatus } from "./TaskStatus";

class Task {
    private _taskId: string;
    private _taskName: string;
    private _taskStatus: TaskStatus;
    private _userId: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    private constructor(taskId: string, taskName: string, taskStatus: TaskStatus, userId: string, createdAt: Date, updatedAt: Date) {
        this._taskId = taskId;
        this._taskName = taskName;
        this._taskStatus = taskStatus;
        this._userId = userId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    public static create(taskId: string, taskName: string, userId: string): Task {
        const taskStatus = TaskStatus.createNewTask();
        const now = new Date();
        return new Task(taskId, taskName, taskStatus, userId, now, now);
    }

    public static recreate(taskId: string, taskName: string, taskStatus: TaskStatus, userId: string, createdAt: Date, updatedAt: Date): Task {
        return new Task(taskId, taskName, taskStatus, userId, createdAt, updatedAt);
    }

    public get taskId(): string {
        return this._taskId;
    }

    public get taskName(): string {
        return this._taskName;
    }

    public get taskStatus(): TaskStatus {
        return this._taskStatus;
    }

    public get userId(): string {
        return this._userId;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }
}

export { Task };
