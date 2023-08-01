import instance from "@/axiosConfig";
import { CreateMajor, Major } from "./types";

export class MajorService {
  async getAll() {
    return instance.get<Major[], Major[]>("/major");
  }
  async create(createMajor: CreateMajor) {
    return instance.post("/major", createMajor);
  }
}
const majorService = new MajorService();
export default majorService;
