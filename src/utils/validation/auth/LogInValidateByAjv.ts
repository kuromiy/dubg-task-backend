import { LogInRequest } from "../../../presentation/request/auth/LogInRequest";
import { LogInValidate } from "./LogInValidate";
import Ajv, { JSONSchemaType } from "ajv";
import { ApplicationLogger } from "../../logger/ApplicationLogger";

const LogInValidateSchema: JSONSchemaType<LogInRequest> = {
    type: "object",
    properties: {
        userMail: {
            type: "string",
        },
        userPassword: {
            type: "string",
        }
    },
    required: [
        "userMail", "userPassword"
    ],
    additionalProperties: false
};

class LogInValidateByAjv implements LogInValidate {
    constructor(
        private _logger: ApplicationLogger,
        private _ajv: Ajv) {}

    public validate(request: LogInRequest): void {
        this._logger.debug("LOgInValidateByAjv#validate");
        const validated = this._ajv.compile(LogInValidateSchema);
        const valid = validated(request);
        if (!valid) console.log(validated.errors);
    }
}

export { LogInValidateByAjv };
