import instance from "@/axiosConfig";
import { UserPayload } from "types/responses";
import { CreateUserDto } from "./types";
import { UserMetadata } from "types/entities";

export class UserService {
  async registerStudent(createUser: CreateUserDto) {
    return instance.post<CreateUserDto, any>("/user/register-student", createUser);
  }

  async registerInstructor(createUser: CreateUserDto) {
    return instance.post<CreateUserDto, any>("/user/register-instructor", createUser);
  }

  async activeStudent(user_id: string, username: string, password: string) {
    return instance.put<CreateUserDto, any>("/user/active/student", {
      user_id,
      username,
      password,
    });
  }

  async activeInstructor(user_id: string, username: string, password: string) {
    return instance.put<CreateUserDto, any>("/user/active/instructor", {
      user_id,
      username,
      password,
    });
  }

  async signIn(username, password) {
    type U = UserPayload;
    return instance<U, U>({
      url: "/auth/login",
      method: "POST",
      data: { username, password },
    });
  }

  async getAllInstructor() {
    return instance.get<any, UserMetadata[]>("/user/instructor");
  }

  async getAllStudents() {
    return instance.get<any, UserMetadata[]>("/user/student");
  }

  async assignSubject(instructor_id: string, subject_id: string, price: number) {
    const assignInstructorDto = { instructor_id, subject_id, price };
    instance.post("/user/instructor/assignment", assignInstructorDto);
  }
}
export const userService = new UserService();
