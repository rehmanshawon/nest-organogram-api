// src/employees/employees.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  // @Get('position/:positionId')
  // @UseGuards(JwtAuthGuard)
  // async findByPositionId(
  //   @Param('positionId') positionId: string,
  // ): Promise<Employee[]> {
  //   return this.employeesService.findByPositionId(parseInt(positionId, 10));
  // }

  @Get('position/:positionId')
  @UseGuards(JwtAuthGuard)
  async findByPositionId(
    @Param('positionId') positionId: string,
  ): Promise<Employee[]> {
    return this.employeesService.findEmployeesUnderPosition(
      parseInt(positionId, 10),
    );
  }

  @Get('manager/:managerId')
  @UseGuards(JwtAuthGuard)
  async findByManagerId(
    @Param('managerId') managerId: string,
  ): Promise<Employee[]> {
    return this.employeesService.findByManagerId(parseInt(managerId, 10));
  }
}
