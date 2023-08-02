import instance from "@/axiosConfig";
import { CreateUserDto } from "./types";
import { UserPayload } from "types/responses";

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
}
export const userService = new UserService();
