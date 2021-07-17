class LogInResponse {
    constructor(private _token: string) {}

    public get token(): string {
        return this._token;
    }
}

export { LogInResponse };
