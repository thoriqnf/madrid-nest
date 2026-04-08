import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // TODO Auth: 1.3 - Implement User Registration
    // 1. Check if user already exists
    // 2. Hash the password using bcrypt
    // 3. Create the user in Prisma
    // 4. Generate and return a JWT access_token
    return { access_token: 'TODO' };
  }

  async login(dto: LoginDto) {
    // TODO Auth: 1.4 - Implement User Login
    // 1. Find user by email
    // 2. Compare password with bcrypt
    // 3. Generate and return a JWT access_token
    return { access_token: 'TODO' };
  }
}
