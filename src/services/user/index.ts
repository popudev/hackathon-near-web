import instance from "@/axiosConfig";
import { CreateUserDto } from "./types";

export class UserService {
  async registerStudent(createUser: CreateUserDto) {
    return instance.post<CreateUserDto, any>("/user/register-student", createUser);
  }

  async registerInstructor(createUser: CreateUserDto) {
    return instance.post<CreateUserDto, any>("/user/register-instructor", createUser);
  }
}
export const userService = new UserService();
