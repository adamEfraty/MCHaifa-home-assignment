export interface RegisterDto{
    username: string;
    instrument: string;
    password: string;
    role: string
}

export interface LoginDto{
    username: string;
    password: string;
    role: string
}