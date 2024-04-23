// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/employee.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Employee> {
    const employee = await this.employeesService.findOne(username);
    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, employee.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return employee;
  }

  async login(employee: Employee): Promise<{ accessToken: string }> {
    const payload = { username: employee.name, sub: employee.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
