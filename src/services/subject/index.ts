import instance from "@/axiosConfig";
import { CreateSubject, Subject } from "./type";

export class SubjectService {
  async getAll() {
    return instance.get<Subject[], Subject[]>("/subject");
  }

  async getByUserId(user_id: string) {
    return instance.get<Subject[], Subject[]>("/subject/user/" + user_id);
  }

  async create(createSubject: CreateSubject) {
    return instance.post<CreateSubject, Subject>("/subject", createSubject);
  }
}
const subjectService = new SubjectService();
export default subjectService;
