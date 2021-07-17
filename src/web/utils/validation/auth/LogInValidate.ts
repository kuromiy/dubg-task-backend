import { LogInRequest } from "../../../presentation/request/auth/LogInRequest";

interface LogInValidate {
    validate(request: LogInRequest): void;
}

export { LogInValidate };
