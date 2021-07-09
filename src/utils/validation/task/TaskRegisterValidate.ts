import { TaskRegisterRequest } from "../../../presentation/request/task/TaskRegisterRequest";

interface TaskRegisterValidate {
    validate(request: TaskRegisterRequest): void;
}

export { TaskRegisterValidate };
