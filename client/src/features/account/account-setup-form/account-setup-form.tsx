import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { openAccountSchema, useOpenAccount } from "../api/open-account";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Account } from "../models/account.model";
import { useAccount, AccountStatus } from "@/features/account/account.provider";

type AccountSetupFormProps = {
  className?: string;
};

export const AccountSetupForm = ({ className }: AccountSetupFormProps) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { status, changeAccount, user } = useAccount();

  const form = useForm<z.infer<typeof openAccountSchema>>({
    resolver: zodResolver(openAccountSchema),
    defaultValues: {
      username: "",
    },
  });

  const openAccountMutation = useOpenAccount({
    mutationConfig: {
      onSuccess: (data: Account) => {
        toast("Account Created");
        changeAccount(data);
        navigate("/");
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof openAccountSchema>) => {
    if (status === AccountStatus.PartiallyAuthenticated) {
      const accessToken = await getAccessTokenSilently();
      openAccountMutation.mutate({
        data: values,
        accessToken,
        picture: user?.picture,
      });
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col gap-5 border rounded w-[25rem] rounded-lg",
        className
      )}
    >
      <div className="flex flex-col gap-3 px-10 pt-10 items-center">
        <h1 className="text-3xl font-bold">Account Setup</h1>
        <p className="text-muted-foreground">
          Finish setting up your account for algowars
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-10 pb-10 space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="enter a name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={openAccountMutation.isPending}
          >
            {openAccountMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
