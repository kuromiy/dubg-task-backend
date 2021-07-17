import { TaskRegisterRequest } from "../../../presentation/request/task/TaskRegisterRequest";
import { ApplicationLogger } from "../../logger/ApplicationLogger";
import { TaskRegisterValidate } from "./TaskRegisterValidate";
import Ajv, { JSONSchemaType } from "ajv";

const TaskRegisterValidateSchema: JSONSchemaType<TaskRegisterRequest> = {
    type: "object",
    properties: {
        taskName: {
            type: "string",
        },
        userId: {
            type: "string",
        }
    },
    required: [
        "taskName", "userId"
    ],
    additionalProperties: false
};

class TaskRegisterValidateByAjv implements TaskRegisterValidate {
    constructor(
        private _logger: ApplicationLogger,
        private _ajv: Ajv) {}

    public validate(request: TaskRegisterRequest): void {
        this._logger.debug("TaskRegisterValidateByAjv#validate");
        const validated = this._ajv.compile(TaskRegisterValidateSchema);
        const valid = validated(request);
        if (!valid) console.log(validated.errors);
    }
}

export { TaskRegisterValidateByAjv };
