import { LogInService } from "../../../application/service/auth/LogInService";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";
import { LogInValidate } from "../../../utils/validation/auth/LogInValidate";
import { LogInRequest } from "../../request/auth/LogInRequest";
import { LogInResponse } from "../../response/auth/LogInResponse";

class LogInController {
    constructor(
        private _logger: ApplicationLogger,
        private _validate: LogInValidate,
        private _service: LogInService) {}

    public async api(request: LogInRequest): Promise<LogInResponse> {
        this._logger.debug("LogInController#api");
        // 1. リクエストバリデーション
        this._validate.validate(request);

        // 2. サービス実行
        const response = await this._service.execute(request);
        return response;
    }
}

export { LogInController };
