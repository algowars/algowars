import Loader from "@/components/loader/loader";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { submissionService } from "@/features/submission/services/submission.service";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProfileSubmissions = () => {
  const [page] = useState<number>(1);
  const [size] = useState<number>(15);
  const [timestamp] = useState<Date>(new Date());
  const { getAccessTokenSilently } = useAuth0();
  const { username } = useParams();
  const {
    data: submissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile-submissions"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();

      if (!username) {
        throw new Error("A username is required");
      }
      return submissionService.getUserSubmissions(
        accessToken,
        username,
        page,
        size,
        timestamp
      );
    },
  });
  return (
    <>
      <ErrorAlertFixed error={error} />
      <Card>
        <div className="py-3 pl-4 pr-3 border-b flex justify-between items-center">
          <h4 className="font-semibold">Recent Submissions</h4>
          <Link
            to="submissions"
            className={buttonVariants({ variant: "ghost" })}
          >
            Show More <ArrowRight size={16} />
          </Link>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className="flex flex-col">
            {submissions ? (
              submissions.results.map((submission, index) => (
                <li key={submission.id} className="p-5">
                  {index}
                </li>
              ))
            ) : (
              <li>
                <p className="font-semibold">No Submissions Found</p>
              </li>
            )}
          </ul>
        )}
      </Card>
    </>
  );
};

export default ProfileSubmissions;
