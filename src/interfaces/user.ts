export interface User {
    email: string;
    id: string;
    password: string;
    name: string;
    birthday: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Dados públicos do usuário, seguros para trafegar ao cliente e
 * persistir no localStorage. NUNCA inclui senha/hash.
 */
export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

/** Payload padrão de autenticação retornado por Login e Signup. */
export interface AuthPayload {
    token: string;
    user: AuthUser;
}