import Ajv, { JSONSchemaType } from "ajv";
import { TaskSearchRequest } from "../../../presentation/request/task/TaskSearchRequest";
import { ApplicationLogger } from "../../logger/ApplicationLogger";
import { TaskSearchValidate } from "./TaskSearchValidate";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../container/types";

const TaskSearchValidateSchema: JSONSchemaType<TaskSearchRequest> = {
    type: "object",
    properties: {
        taskName: {
            type: "string",
        },
        taskStatusId: {
            type: "string",
        },
        userId: {
            type: "string",
        },
        offset: {
            type: "number",
        },
        limit: {
            type: "number",
        },
    },
    required: [
        "userId"
    ],
    additionalProperties: false
};

@injectable()
class TaskSearchValidateByAjv implements TaskSearchValidate {
    constructor(
        @inject(TYPES.ApplicationLogger) private _logger: ApplicationLogger,
        @inject(TYPES.Ajv) private _ajv: Ajv) {}

    public validate(request: TaskSearchRequest): void {
        this._logger.debug("TaskSearchValidateByAjv#validate");
        const validated = this._ajv.compile(TaskSearchValidateSchema);
        const valid = validated(request);
        if (!valid) console.log(validated.errors);
    }
}

export { TaskSearchValidateByAjv };
