import { TaskRegisterService } from "../../../application/service/task/TaskRegisterService";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";
import { TaskRegisterValidate } from "../../../utils/validation/task/TaskRegisterValidate";
import { TaskRegisterRequest } from "../../request/task/TaskRegisterRequest";
import { TaskRegisterResponse } from "../../response/task/TaskRegisterResponse";

class TaskRegisterController {
    constructor(
        private _logger: ApplicationLogger,
        private _validate: TaskRegisterValidate,
        private _service: TaskRegisterService) {}

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
