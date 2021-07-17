import { TaskResource } from "../../resource/TaskResource";

class TaskSearchResponse {
    constructor(private _count: number, private _taskResources: Array<TaskResource>) {}

    public get count(): number {
        return this._count;
    }

    public get taskResources(): Array<TaskResource> {
        return this._taskResources;
    }
}

export { TaskSearchResponse };
