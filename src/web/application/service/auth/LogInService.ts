import { UserRepository } from "../../../../domain/user/UserRepository";
import { LogInRequest } from "../../../presentation/request/auth/LogInRequest";
import { LogInResponse } from "../../../presentation/response/auth/LogInResponse";
import { TokenUtils } from "../../../utils/token/TokenUtils";
import { ApplicationLogger } from "../../../utils/logger/ApplicationLogger";

class LogInService {
    constructor(
        private _logger: ApplicationLogger,
        private _userRepository: UserRepository,
        private _tokenUtils: TokenUtils) {}

    public async execute(request: LogInRequest): Promise<LogInResponse> {
        this._logger.debug("LogInService#execute");
        const existUser = await this._userRepository.findByUserMail(request.userMail);
        if (!existUser) throw new Error("ユーザーが存在しません。");
        if (!existUser.equalsUserPassword(request.userPassword)) throw new Error("パスワードが異なります。");

        const token = await this._tokenUtils.sign(existUser.userId);

        const response = new LogInResponse(token);
        return response;
    }
}

export { LogInService };
