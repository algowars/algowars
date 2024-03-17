import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { CreateAccountDto } from "@/features/account/dtos/create-account.dto";
import { accountService } from "@/features/account/services/account.service";
import Layout from "@/layout/layout";
import { setAccount } from "@/slices/account-slice";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupPage = () => {
  const [createAccount, setCreateAccount] = useState<CreateAccountDto>({
    username: "",
  });

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeCreateAccount = <K extends keyof CreateAccountDto>(
    key: K,
    value: CreateAccountDto[K]
  ) => {
    setCreateAccount((curr) => ({ ...curr, [key]: value }));
  };

  const {
    mutate: saveAccount,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["account", createAccount],
    mutationFn: async (): Promise<void> => {
      if (!createAccount.username) {
        throw Error("A username is required");
      }
      const accessToken = await getAccessTokenSilently();

      const createdAccount = await accountService.create(
        accessToken,
        createAccount
      );
      if (createAccount) {
        dispatch(setAccount(createdAccount));

        navigate(`/profile/${createAccount.username}`);
      }
    },
  });

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    saveAccount();
  };

  return (
    <Layout
      className="h-screen flex flex-col"
      mainClassName="py-6 justify-center items-center"
    >
      <Card className="p-5 max-w-lg mx-auto">
        <form className="flex flex-col gap-5" onSubmit={(e) => submitForm(e)}>
          <ErrorAlert error={error} />
          <div className="flex flex-col gap-0 items-center">
            <h2 className="text-lg font-semibold">Algowars</h2>
            <p className="text-muted-foreground">
              Finish setting up your account
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username"
              value={createAccount.username}
              onChange={(e) => changeCreateAccount("username", e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isPending || !createAccount.username}>
            {isPending ? "Loading" : "Setup Account"}
          </Button>
        </form>
      </Card>
    </Layout>
  );
};

export default SetupPage;
