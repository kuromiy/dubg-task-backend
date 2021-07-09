import { Task } from "./Task";

interface TaskRepository {
    register(task: Task): Promise<number>;
    findByTaskName(taskName: string, userId: string): Promise<Task | null>;
    generateTaskId(): Promise<string>;
}

export { TaskRepository };
