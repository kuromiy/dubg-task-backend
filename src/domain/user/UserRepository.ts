import { User } from "./User";

interface UserRepository {
    findByUserId(userId: string): Promise<User | null>;
    findByUserMail(userMail: string): Promise<User | null>;
}

export { UserRepository };
