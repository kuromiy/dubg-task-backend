class User {
    private _userId: string;
    private _userName: string;
    private _userMail: string;
    private _userPassword: string;

    private constructor(userId: string, userName: string, userMail: string, userPassword: string) {
        this._userId = userId;
        this._userName = userName;
        this._userMail = userMail;
        this._userPassword = userPassword;
    }

    public static recreate(userId: string, userName: string, userMail: string, userPassword: string): User {
        return new User(userId, userName, userMail, userPassword);
    }

    public equalsUserPassword(userPassword: string): boolean {
        return this._userPassword === userPassword;
    }

    public get userId(): string {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get userMail(): string {
        return this._userMail;
    }

    public get userPassword(): string {
        return this._userPassword;
    }
}

export { User };
