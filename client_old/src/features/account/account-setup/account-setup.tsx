import { Card } from "@/components/ui/card";
import AccountSetupForm from "./account-setup-form/account-setup-form";

const AccountSetup = () => {
  return (
    <Card className="max-w-4xl p-5 h-fit flex flex-col gap-8">
      <div>
        <h2 className="font-semibold">Welcome to the Algowars Community</h2>
      </div>

      <AccountSetupForm />
    </Card>
  );
};

export default AccountSetup;
