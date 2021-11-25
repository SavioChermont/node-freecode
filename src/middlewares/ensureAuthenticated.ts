import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    email: string;
    iat: number;
    exp: number;
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) return response.status(401).end();

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "66bfce1c8ab50986f4d96a65796225c1") as IPayload

        request.user_id = sub;

        return next();
    } catch (error) {
        return response.status(401).end();
    }
}