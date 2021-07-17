import { TaskRegisterInput } from "./TaskRegisterInput";
import { TaskRegisterOutput } from "./TaskRegisterOutput";

interface TaskRegisterUseCase {
    handle(input: TaskRegisterInput): Promise<TaskRegisterOutput>;
}

export { TaskRegisterUseCase };
