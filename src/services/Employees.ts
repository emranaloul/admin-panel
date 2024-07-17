import { Employee, PostEmployeePayload } from 'types';
import { ApiService } from './APIService';

class Employees extends ApiService {
  private path: string;
  constructor() {
    super();
    this.path = 'employees.json';
  }
  private dynamicPath(internal: string) {
    return `employees/${internal}.json`;
  }
  public async getEmployees(): Promise<Employee[] | undefined> {
    try {
      const result = await this.get<Record<string, PostEmployeePayload>>(this.path);
      if (result) {
        return Object.entries(result).map(([id, value]) => ({ id, ...value }));
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }
  public async addEmployee(data: PostEmployeePayload): Promise<any> {
    try {
      const result = await this.post(this.path, data);
      return result;
    } catch (error) {
      throw error;
    }
  }
  public async deleteEmployee(id: string) {
    try {
      await this.delete(this.dynamicPath(id));
    } catch (error) {
      throw error;
    }
  }
  public async updateEmployee(employee: Employee) {
    try {
      await this.put(this.dynamicPath(employee.id), employee);
    } catch (error) {
      throw error;
    }
  }
}

const employeesService = new Employees();
export default employeesService;
