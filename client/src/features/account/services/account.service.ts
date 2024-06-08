import { Api } from "@/api/api";
import { AxiosRequestConfig } from "axios";
import { CreateAccountDto } from "../dtos/create-account.dto";
import { Account } from "../account.model";

export class AccountService extends Api {
  private static instance: AccountService;

  constructor() {
    super();
  }

  public static getInstance(): AccountService {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }
    return AccountService.instance;
  }

  public create(
    accessToken: string,
    createAccountDto: CreateAccountDto
  ): Promise<string> {
    const config: AxiosRequestConfig = {
      url: "/api/v1/account",
      method: "POST",
      data: createAccountDto,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return this.callExternalApi<string>({ config });
  }

  public getBySub(accessToken: string): Promise<Account> {
    const config: AxiosRequestConfig = {
      url: "/api/v1/account/find/sub",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return this.callExternalApi<Account>({ config });
  }
}
