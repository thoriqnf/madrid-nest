import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * TODO ADV AUTH: 2.3 - Password Hashing Highlight
   * Reverted to plain text for demo starter
   */
  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // TODO ADV AUTH: 2.3 - Implement Hashing here
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: dto.password, // Plain text for now
      },
    });

    // TODO ADV AUTH: 3.3 - Return dual tokens instead of just one
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    
    return {
      access_token: token,
    };
  }

  /**
   * Login logic 
   */
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO ADV AUTH: 2.3 - Implement Bcrypt comparison here
    const isPasswordValid = dto.password === user.password; 

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO ADV AUTH: 3.3 - Return dual tokens 
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  /**
   * TODO ADV AUTH: 4.1 - Logout logic
   */
  async logout(userId: number) {
    // TODO: Clear refreshing token from DB
    return {
      message: 'Logged out (Placeholder)',
    };
  }

  /**
   * TODO ADV AUTH: 3.4 - Refresh Token logic
   */
  async refreshTokens(userId: number, rt: string) {
    // TODO: Implement token rotation logic
    throw new ForbiddenException('Not Implemented');
  }

  /**
   * TODO ADV AUTH: 3.3 - Token generation helpers
   */
  async getTokens(userId: number, email: string, role: string) {
    // TODO: Implement dual token generation
    return {
      access_token: '',
      refresh_token: '',
    };
  }

  /**
   * Utility: Store hashed refresh token in DB
   */
  async updateRefreshToken(userId: number, rt: string) {
    // TODO: Implement RT storage 
  }
}
