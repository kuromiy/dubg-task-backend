import { User } from "../../domain/user/User";
import { UserRepository } from "../../domain/user/UserRepository";
import { ApplicationLogger } from "../../utils/logger/ApplicationLogger";

class UserMemorySource implements UserRepository {
    private _users: Array<User>;

    constructor(private _logger: ApplicationLogger) {
        this._users = new Array<User>();

        const initUser = User.recreate("TEST001", "Yamada Taro", "hoge@example.com", "test001");
        this._users.push(initUser);
    }

    public async findByUserMail(userMail: string): Promise<User | null> {
        this._logger.debug("UserMemorySource#findByUserMail");
        const user = this._users.find(value => value.userMail === userMail);
        return user ? user : null;
    }
}

export { UserMemorySource };
