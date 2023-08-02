import instance from "@/axiosConfig";
import { UserPayload } from "types/responses";
import { CreateUserDto, Instructor } from "./types";

export class UserService {
  async registerStudent(createUser: CreateUserDto) {
    return instance.post<CreateUserDto, any>("/user/register-student", createUser);
  }

  async registerInstructor(createUser: CreateUserDto) {
    return instance.post<CreateUserDto, any>("/user/register-instructor", createUser);
  }

  async signIn(username, password) {
    type U = UserPayload;
    return instance<U, U>({
      url: "/user/login",
      method: "POST",
      data: { username, password },
    });
  }
  async getAllInstructor() {
    return instance.get<any, Instructor[]>("/user/instructor");
  }
}
export const userService = new UserService();
