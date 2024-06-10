import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth0 } from "@auth0/auth0-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AccountService } from "../../services/account.service";
import { CreateAccountDto } from "../../dtos/create-account.dto";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().max(50, {
    message: "Username must be at most 50 characters.",
  }),
});

const AccountSetupForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const {
    mutate: createAccount,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-account"],
    mutationFn: async (createAccountDto: CreateAccountDto) => {
      const accessToken = await getAccessTokenSilently();

      const accountId = await AccountService.getInstance().create(
        accessToken,
        createAccountDto
      );

      if (accountId) {
        navigate("/dashboard");
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createAccount(values);
  };

  useEffect(() => {
    if (error?.message) {
      toast.error("Error Setting up account", {
        description: error.message,
      });
    }
  }, [error?.message]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Loading" : "Setup Account"}
        </Button>
      </form>
    </Form>
  );
};

export default AccountSetupForm;
