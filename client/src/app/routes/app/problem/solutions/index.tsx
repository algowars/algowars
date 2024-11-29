import { useAccountStore } from "@/features/account/account-store.provider";
import { useGetProblemSolutionsBySlug } from "@/features/problem/api/get-problem-solutions-by-slug";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProblemSolutions = () => {
  const { isAuthenticated: isAuthAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const { isAuthenticated } = useAccountStore();

  let accessToken = "";

  const { slug } = useParams();

  useEffect(() => {
    if (isAuthenticated && isAuthAuthenticated) {
      (async () => {
        accessToken = await getAccessTokenSilently();
      })();
    }
  }, [isAuthAuthenticated, isAuthAuthenticated, getAccessTokenSilently]);

  useGetProblemSolutionsBySlug({
    slug: slug ?? "",
    accessToken,
  });

  if (!slug) {
    return null;
  }

  return <div></div>;
};
