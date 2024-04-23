// src/employees/employee.model.spec.ts
import { Employee } from './employee.model';

describe('Employee Model', () => {
  it('should create an employee instance', () => {
    const employee = new Employee();
    expect(employee).toBeDefined();
  });

  it('should have properties id, username, and password', () => {
    const employee = new Employee();
    expect(employee.id).toBeDefined();
    expect(employee.name).toBeDefined();
    expect(employee.password).toBeDefined();
  });
});
