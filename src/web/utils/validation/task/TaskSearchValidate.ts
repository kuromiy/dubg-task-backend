import { TaskSearchRequest } from "../../../presentation/request/task/TaskSearchRequest";

interface TaskSearchValidate {
    validate(request: TaskSearchRequest): void;
}

export { TaskSearchValidate };
