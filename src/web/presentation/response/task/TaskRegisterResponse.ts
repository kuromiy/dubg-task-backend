import { TaskResource } from "../../resource/TaskResource";

class TaskRegisterResponse {
    constructor(private _taskResource: TaskResource) {}

    public get taskResource(): TaskResource {
        return this._taskResource;
    }
}

export { TaskRegisterResponse };
