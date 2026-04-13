import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dtos/auth.dto';
import { Tokens } from '../types/auth.types';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<Tokens>;
    signin(dto: AuthDto): Promise<Tokens>;
    logout(userId: number): Promise<boolean>;
    refreshTokens(userId: number, refreshToken: string): Promise<Tokens>;
}
