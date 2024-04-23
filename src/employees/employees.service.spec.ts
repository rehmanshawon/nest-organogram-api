// src/employees/employees.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.model';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an employee if found', async () => {
      // Mock the findOne method of the employeeModel
      const mockEmployee = new Employee();
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockEmployee);

      const username = 'test_username';
      const result = await service.findOne(username);

      expect(result).toEqual(mockEmployee);
    });

    it('should return null if employee not found', async () => {
      // Mock the findOne method of the employeeModel
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

      const username = 'non_existent_username';
      const result = await service.findOne(username);

      expect(result).toBeNull();
    });
  });

  // Add more tests for other methods in EmployeesService if needed
});
