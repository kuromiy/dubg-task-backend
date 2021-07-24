import { User } from "../../../domain/user/User";
import { UserRepository } from "../../../domain/user/UserRepository";
import { PrismaClient } from "@prisma/client";
import { ApplicationLogger } from "../../utils/logger/ApplicationLogger";

class UserDataSource implements UserRepository {
    constructor(
        private _prisma: PrismaClient,
        private _logger: ApplicationLogger) {}

    public async findByUserId(userId: string): Promise<User | null> {
        const foundUser = await this._prisma.users.findFirst({
            where: {
                user_id: userId
            },
        });
        if (!foundUser) return null;

        const user = User.recreate(foundUser.user_id, foundUser.user_name, foundUser.user_mail, foundUser.user_password);
        return user;
    }

    public async findByUserMail(userMail: string): Promise<User | null> {
        const foundUser = await this._prisma.users.findFirst({
            where: {
                user_mail: userMail,
            }
        });
        if (!foundUser) return null;

        const user = User.recreate(foundUser.user_id, foundUser.user_name, foundUser.user_mail, foundUser.user_password);
        return user;
    }
}

export { UserDataSource };
