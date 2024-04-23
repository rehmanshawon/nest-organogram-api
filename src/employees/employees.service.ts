// src/employees/employees.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Employee } from './employee.model';
import { Op } from 'sequelize';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,
    private readonly cacheManager: Cache,
    private readonly loggingService: LoggingService,
  ) {}

  async findOne(username: string): Promise<Employee | undefined> {
    return this.employeeModel.findOne({ where: { name: username } });
  }
  async create(employee: Partial<Employee>): Promise<Employee> {
    return this.employeeModel.create(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.findAll();
  }

  async findByPositionId(positionId: number): Promise<Employee[]> {
    return this.employeeModel.findAll({
      where: { positionId },
    });
  }

  // this is the more optimized version of the same service written above
  async findEmployeesUnderPosition(positionId: number): Promise<Employee[]> {
    try {
      const cacheKey = `employees_under_position_${positionId}`;
      const cachedData = (await this.cacheManager.get(cacheKey)) as Employee[];

      if (cachedData) {
        return cachedData;
      }

      const employees = await this.employeeModel.findAll({
        where: {
          positionId: {
            [Op.gte]: positionId,
          },
        },
      });

      await this.cacheManager.set(cacheKey, employees, 3600); // Cache data for 1 hour

      return employees;
    } catch (error) {
      this.loggingService.error(
        'Error occurred while fetching employees',
        error.stack,
      );
      throw error;
    }
  }

  async findByManagerId(managerId: number): Promise<Employee[]> {
    return this.employeeModel.findAll({
      where: { managerId },
    });
  }
}
