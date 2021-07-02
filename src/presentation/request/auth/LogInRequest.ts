class LogInRequest {
    constructor(private _userMail: string, private _userPassword: string) {}

    public get userMail(): string {
        return this._userMail;
    }

    public get userPassword(): string {
        return this._userPassword;
    }
}

export { LogInRequest };
