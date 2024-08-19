import jwt from "jsonwebtoken";

export function createToken(payload: string): string {
    return jwt.sign({data: payload}, process.env.JWT_SECRET as string, {expiresIn: 60 * 60});
}