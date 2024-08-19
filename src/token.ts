import jwt, {JwtPayload} from "jsonwebtoken";

export function createToken(payload: string): string {
    return jwt.sign({payload: payload}, process.env.JWT_SECRET as string, {expiresIn: 60 * 60});
}

export function verifyToken(token: string): number {
    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        return parseInt(decoded.payload);
    } catch (error) {
        // Handle errors (e.g., token verification failed)
        console.error('Token verification failed:', error);
        throw new Error('Invalid token');
    }
}