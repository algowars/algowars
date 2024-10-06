import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createProblemSchema, useCreateProblem } from "../api/create-problem";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminCreateProblemFormTextEditor } from "../admin-create-problem-form-text-editor/admin-create-problem-form-text-editor";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

type AdminCreateProblemFormProps = {
  className?: string;
};

export const AdminCreateProblemForm = ({
  className,
}: AdminCreateProblemFormProps) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const form = useForm<z.infer<typeof createProblemSchema>>({
    resolver: zodResolver(createProblemSchema),
    defaultValues: {
      title: "",
      slug: "",
      question: "",
    },
  });

  const createProblemMutation = useCreateProblem({
    mutationConfig: {
      onSuccess: () => {
        toast("Problem Created");
        navigate("/");
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof createProblemSchema>) => {
    const accessToken = await getAccessTokenSilently();
    createProblemMutation.mutate({ data: values, accessToken });
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="slug" {...field} />
                </FormControl>
                <FormDescription>
                  Slug used in URL, must not use spaces and instead use hyphens
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <AdminCreateProblemFormTextEditor field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit">
            Create Problem
          </Button>
        </form>
      </Form>
    </div>
  );
};
