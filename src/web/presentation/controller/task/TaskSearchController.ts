import { TaskSearchService } from "../../../application/service/task/TaskSearchService";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";
import { TaskSearchValidate } from "../../../utils/validation/task/TaskSearchValidate";
import { TaskSearchRequest } from "../../request/task/TaskSearchRequest";
import { TaskSearchResponse } from "../../response/task/TaskSearchResponse";

class TaskSearchController {
    constructor(
        private _logger: ApplicationLogger,
        private _validate: TaskSearchValidate,
        private _service: TaskSearchService) {}

    public async api(request: TaskSearchRequest): Promise<TaskSearchResponse> {
        this._logger.debug("TaskSearchController#api");
        // 1. リクエストバリデーション
        this._validate.validate(request);

        // 2. サービス実行
        const response = await this._service.execute(request);
        return response;
    }
}

export { TaskSearchController };
