interface TokenUtils {
    sign(userId: string): Promise<string>;
    verify(token: string): Promise<string>;
}

export { TokenUtils };
