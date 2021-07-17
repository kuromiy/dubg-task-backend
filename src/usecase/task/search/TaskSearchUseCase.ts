import { TaskSearchInput } from "./TaskSearchInput";
import { TaskSearchOutput } from "./TaskSearchOutput";

interface TaskSearchUseCase {
    handle(input: TaskSearchInput): Promise<TaskSearchOutput>;
}

export { TaskSearchUseCase };
