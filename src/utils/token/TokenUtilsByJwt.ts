import { TokenUtils } from "./TokenUtils";
import JWT from "jsonwebtoken";

class TokenUtilsByJwt implements TokenUtils {
    private static _KEY = "secret";

    public async sign(userId: string): Promise<string> {
        const token = JWT.sign({userId: userId}, TokenUtilsByJwt._KEY);
        return token;
    }

    public async verify(token: string): Promise<string> {
        const decode = JWT.verify(token, TokenUtilsByJwt._KEY) as { userId: string };
        return decode.userId;
    }
}

export { TokenUtilsByJwt };
