// src/employees/employee.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Employee extends Model<Employee> {
  @Column
  name: string;

  @Column
  password: string;

  @Column
  positionId: number;

  @Column
  positionName: string;

  @Column
  managerId: number;
}
