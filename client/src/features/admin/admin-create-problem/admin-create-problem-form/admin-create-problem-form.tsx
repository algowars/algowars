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
import { AdminCreateProblemLanguageSelect } from "../admin-create-problem-language-select/admin-create-problem-language-select";
import { AdminCreateProblemFormInitialCode } from "../admin-create-problem-form-initial-code/admin-create-problem-form-initial-code";
import { AdminCreateProblemFormSolution } from "../admin-create-problem-form-solution/admin-create-problem-form-solution";
import { AdminCreateProblemFormTest } from "../admin-create-problem-form-test/admin-create-problem-form-test";
import { useGetInitialProblemCreation } from "../api/get-initial-problem-creation";
import { useEffect, useState } from "react";

type AdminCreateProblemFormProps = {
  className?: string;
};

export const AdminCreateProblemForm = ({
  className,
}: AdminCreateProblemFormProps) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    fetchAccessToken();
  }, [getAccessTokenSilently]);

  const defaultLanguageId = 93;

  const initialProblemCreationQuery = useGetInitialProblemCreation({
    languageId: defaultLanguageId,
    accessToken,
  });

  const form = useForm<z.infer<typeof createProblemSchema>>({
    resolver: zodResolver(createProblemSchema),
    defaultValues: {
      title: "",
      slug: "",
      question: "",
      language: defaultLanguageId,
      initialCode: "",
      test: "",
      solution: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (initialProblemCreationQuery.data) {
      const { initialCode, testFile, initialSolution } =
        initialProblemCreationQuery.data;
      reset({
        initialCode: initialCode || "",
        test: testFile || "",
        solution: initialSolution || "",
      });
    }
  }, [initialProblemCreationQuery.data, reset]);

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
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <AdminCreateProblemLanguageSelect field={field} />
                <FormDescription>
                  JavaScript is the only allowed language at this time.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initialCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Code</FormLabel>
                <AdminCreateProblemFormInitialCode field={field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solution</FormLabel>
                <FormDescription>
                  Solution must match function declaration in the initial code.
                </FormDescription>
                <AdminCreateProblemFormSolution field={field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test File</FormLabel>
                <FormDescription>
                  Test must call the function declaration that matches in
                  initial code/solution. To see more on how uvu works:{" "}
                  <a
                    href="https://github.com/lukeed/uvu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-3"
                  >
                    uvu documentation
                  </a>
                </FormDescription>
                <AdminCreateProblemFormTest field={field} />
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
