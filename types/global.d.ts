namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        DB_HOST: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DATABASE: string;
        JWT_SECRET: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
    }
}