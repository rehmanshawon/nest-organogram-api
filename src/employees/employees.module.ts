// src/employees/employees.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
