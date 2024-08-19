import bcrypt from 'bcrypt';

const saltRounds = 10;  // Cost factor

export async function hashPassword(plainTextPassword: string): Promise<string> {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the salt, and return it
        return await bcrypt.hash(plainTextPassword, salt);
    } catch (err) {
        throw new Error('Error hashing password: ' + err);
    }
}