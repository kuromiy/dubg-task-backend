import { User } from "./User";

interface UserRepository {
    findByUserMail(userMail: string): Promise<User | null>;
}

export { UserRepository };
