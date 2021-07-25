import { inject, injectable } from "inversify";
import { TaskRegisterService } from "../../../application/service/task/TaskRegisterService";
import { TYPES } from "../../../container/types";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";
import { TaskRegisterValidate } from "../../../utils/validation/task/TaskRegisterValidate";
import { TaskRegisterRequest } from "../../request/task/TaskRegisterRequest";
import { TaskRegisterResponse } from "../../response/task/TaskRegisterResponse";

@injectable()
class TaskRegisterController {
    constructor(
        @inject(TYPES.ApplicationLogger) private _logger: ApplicationLogger,
        @inject(TYPES.TaskRegisterValidate) private _validate: TaskRegisterValidate,
        @inject(TYPES.TaskRegisterService) private _service: TaskRegisterService) {}

    public async api(request: TaskRegisterRequest): Promise<TaskRegisterResponse> {
        this._logger.debug("TaskRegisterController#api");
        // 1. リクエストバリデーション
        this._validate.validate(request);

        // 2. サービス実行
        const response = await this._service.execute(request);
        return response;
    }
}

export { TaskRegisterController };
