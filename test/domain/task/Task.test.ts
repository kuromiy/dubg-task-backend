import { Task } from "../../../src/domain/task/Task";

describe("Task", () => {
    it ("Task#create", () => {
        const taskId   = "1";
        const taskName = "テスト";
        const userId   = "1";

        const task = Task.create(taskId, taskName, userId);

        expect(task.taskId).toBe(taskId);
        expect(task.taskName).toBe(taskName);
        expect(task.userId).toBe(userId);
    });
});