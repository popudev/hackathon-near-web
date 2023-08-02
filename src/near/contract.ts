import { utils } from "near-api-js";
import { Wallet } from "./wallet";

export class Contract {
  contractId: string;
  wallet: Wallet;

  constructor(contractId: string, wallet: Wallet) {
    this.contractId = contractId;
    this.wallet = wallet;
  }

  async registerStudent(major_id: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "register_student_user",
      args: {
        major_id,
      },
      // deposit: utils.format.parseNearAmount("0.01"), // Deposit 0.01 NEAR
    });
  }

  async registerInstructor() {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "register_instructor_user",
      args: {},
      // deposit: utils.format.parseNearAmount("0.01"), // Deposit 0.01 NEAR
    });
  }
}
