import instance from "@/axiosConfig";
import { UserPayload } from "types/responses";
import { CreateUserDto, Instructor } from "./types";
import { UserMetadata } from "types/entities";

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
      url: "/auth/login",
      method: "POST",
      data: { username, password },
    });
  }
  async getAllInstructor() {
    return instance.get<any, Instructor[]>("/user/instructor");
  }
  async getAllStudents() {
    return instance.get<any, UserMetadata[]>("/user");
  }

  async assignSubject(instructor_id: string, subject_id: string, price: number) {
    const assignInstructorDto = { instructor_id, subject_id, price };
    console.log("assignInstructorDto: ", assignInstructorDto);
    instance.post("/user/instructor/assignment", assignInstructorDto);
  }
}
export const userService = new UserService();
