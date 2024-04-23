// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Employee } from '../employees/employee.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() employee: Employee): Promise<{ accessToken: string }> {
    const authenticatedEmployee = await this.authService.validateUser(
      employee.name,
      employee.password,
    );
    return this.authService.login(authenticatedEmployee);
  }
}
