// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/employee.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly employeesService: EmployeesService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key', // Replace with your actual secret key
    });
  }

  async validate(payload: JwtPayload): Promise<Employee> {
    const employee = await this.employeesService.findOne(payload.username);
    if (!employee) {
      throw new UnauthorizedException('Unauthorized');
    }
    return employee;
  }
}
