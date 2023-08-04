import instance from "@/axiosConfig";
import { Score } from "../major/types";

export class ScoreService {
  async getByUserId(user_id: string) {
    return instance.get<Score[], Score[]>("/score/user/" + user_id);
  }

  async getBySubjectId(subject_id: string) {
    return instance.get<Score[], Score[]>("/score/subject/" + subject_id);
  }
}
const scoreService = new ScoreService();
export default scoreService;
