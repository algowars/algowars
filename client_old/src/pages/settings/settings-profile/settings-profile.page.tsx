import Loader from "@/components/loader/loader";
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
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { accountService } from "@/features/account/services/account.service";
import { ProfileInfo } from "@/features/profile/profile-info/profile-info.model";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const SettingsProfilePage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [hasChangedProfile, setHasChangedProfile] = useState(false);

  const {
    data: profileInfo,
    error,
    isPending,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();

      return accountService.getProfileInformation(accessToken);
    },
  });

  const profileSchema = z.object({
    username: z.string().max(50, {
      message: "Username must be at most 50 characters",
    }),
    bio: z.string().max(200, {
      message: "A bio can be at most 200 characters",
    }),
    websiteUrl: z.string().max(100, {
      message: "A website URL can be at most 100 characters",
    }),
    location: z.string().max(100, {
      message: "A location can be at most 100 characters",
    }),
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      bio: "",
      location: "",
      websiteUrl: "",
    },
  });

  const cancelChanges = (e: FormEvent) => {
    e.preventDefault();
    if (hasChangedProfile) {
      if (
        window.confirm(
          "Are you sure you want to cancel your changes? The changes won't be saved."
        )
      ) {
        form.reset();
      }
    } else {
      form.reset();
    }
  };

  const {
    mutate: updateProfile,
    isPending: isUpdatePending,
    error: updateError,
  } = useMutation({
    mutationKey: ["update-account"],
    mutationFn: async (values: ProfileInfo) => {
      const accessToken = await getAccessTokenSilently();

      if (hasChangedProfile) {
        await accountService.updateProfile(accessToken, values);
        setHasChangedProfile(false);
        toast("Profile has been updated");
      }

      return null;
    },
  });

  const watchedFormValues = form.watch();

  useEffect(() => {
    if (!profileInfo) return;

    const hasChanges =
      watchedFormValues.username !== profileInfo.username ||
      watchedFormValues.bio !== profileInfo.bio ||
      watchedFormValues.location !== profileInfo.location ||
      watchedFormValues.websiteUrl !== profileInfo.websiteUrl;

    setHasChangedProfile(hasChanges);
  }, [watchedFormValues, profileInfo]);

  useEffect(() => {
    if (profileInfo) {
      form.reset({
        username: profileInfo.username,
        bio: profileInfo.bio,
        location: profileInfo.location,
        websiteUrl: profileInfo.websiteUrl,
      });
    }
  }, [profileInfo, form.reset, form]);

  return (
    <div>
      <header>
        <ErrorAlert error={error} className="mb-3" />
        <ErrorAlertFixed error={updateError} showClose />
        <h4 className="text-lg font-medium tracking-light">Profile</h4>
        <p className="text-sm text-muted-foreground">
          This is how others will see your profile.
        </p>
      </header>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>
      {isPending ? (
        <Loader className="py-8" />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values: ProfileInfo) =>
              updateProfile(values)
            )}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name
                    or a pseudonym. You can only change this once every 30 days.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input placeholder="bio" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public bio. Other users can see this bio.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="location" {...field} />
                  </FormControl>
                  <FormDescription>
                    Others can see this location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Url</FormLabel>
                  <FormControl>
                    <Input placeholder="website URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Show of your personal portfolio website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 items-center">
              {hasChangedProfile ? (
                <Button variant="outline" onClick={cancelChanges}>
                  Cancel Changes
                </Button>
              ) : null}
              <Button
                type="submit"
                disabled={!hasChangedProfile || isUpdatePending}
              >
                {isUpdatePending ? "Loading Changes" : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SettingsProfilePage;
