import { Animal } from "./animal.model";

export interface LoginRequest {
    adopterEmail: string;
    adopterPassword: string;
}

export interface RegisterRequest {
    adopterFullName: string,
    adopterBirthDate: string,
    adopterCPF: string,
    adopterEmail: string,
    adopterPassword: string,
    adopterPhone: string,
    adopterAddress: string,
    typeHouse: string,
    hasGarden: boolean
}

export interface AdopterResponse {
    adopterId: string,
    adopterFullName: string,
    adopterBirthDate: string,
    adopterCPF: string,
    adopterEmail: string,
    adopterPhone: string,
    adopterAddress: string,
    typeHouse: string,
    hasGarden: boolean,
    adoptedAnimals: Animal[], 
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    tokenType: string,
    expiresIn: string
}

export interface JwtPayload{
    adopterId: string,
    sub: string,
    exp: number,
    iat: number
    scope: string[],
}