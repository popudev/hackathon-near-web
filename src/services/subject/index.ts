import instance from "@/axiosConfig";
import { CreateSubject, Subject } from "./type";

export class SubjectService {
  async getAll() {
    return instance.get<Subject[], Subject[]>("/major");
  }
  async create(createSubject: CreateSubject) {
    return instance.post<CreateSubject, Subject>("/subject", createSubject);
  }
}
const subjectService = new SubjectService();
export default subjectService;
