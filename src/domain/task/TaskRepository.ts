import { Task } from "./Task";

interface TaskRepository {
    register(task: Task): Promise<number>;
    findByTaskName(taskName: string, userId: string): Promise<Task | null>;
    count(taskName: string, taskStatusId: string, userId: string): Promise<number>;
    search(taskName: string, taskStatusId: string, userId: string, limit: number, offset: number): Promise<Array<Task>>;
    generateTaskId(): Promise<string>;
}

export { TaskRepository };
