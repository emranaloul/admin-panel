import { Employee, ListItem, PostEmployeePayload, User } from 'types';
import { ApiService } from './APIService';

class Employees extends ApiService {
  private path: string;
  constructor() {
    super();
    this.path = '/auth';
  }
  private dynamicPath(internal: string) {
    return `employees/${internal}.json`;
  }
  public async getUsers() {
    return await this.get<ListItem<User>>(`${this.path}/usersForAdmin`);
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
