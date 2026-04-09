import { Controller, Post, Body, Get, Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * TODO ADV AUTH: 4.2 - Logout endpoint
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Request() req: any) {
    // const userId = req.user.sub ?? req.user.userId;
    // return this.authService.logout(userId);
    return { message: 'Logout path' };
  }

  /**
   * TODO ADV AUTH: 3.5 - Refresh endpoint
   * TODO: Add @UseGuards(RefreshAuthGuard) here
   */
  @Public() 
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Request() req: any) {
    // const userId = req.user.sub;
    // const rt = req.user.refreshToken;
    // return this.authService.refreshTokens(userId, rt);
    return { message: 'Refresh path' };
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
