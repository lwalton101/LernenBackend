import jwt from "jsonwebtoken";

export function createToken(payload: string): string {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
}