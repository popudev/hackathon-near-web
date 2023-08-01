import httpRequest from "../../../utils/httpRequest";
import { CreateMajor, Major } from "./types";

export class MajorService {
  async getAll() {
    return httpRequest.get<Major[], Major[]>("/major");
  }
  async create(createMajor: CreateMajor) {
    return httpRequest.post("/major", createMajor);
  }
}
const majorService = new MajorService();
export default majorService;
