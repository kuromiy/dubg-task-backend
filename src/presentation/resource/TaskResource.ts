import { TaskStatusResource } from "./TaskStatusResource";

class TaskResource {
    constructor(
        public taskId: string,
        public taskName: string,
        public taskStatus: TaskStatusResource,
        public userId: string,
        public createdAt: Date,
        public updatedAt: Date) {}
}

export { TaskResource };
