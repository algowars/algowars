import { AccountStatus, useAccount } from "@/features/account/account.provider";
import React from "react";
import { LoginButton } from "../login-button";
import { SignupButton } from "../signup-button";
import { Link } from "@/components/ui/link";
import { routerConfig } from "@/app/router-config";
import { buttonVariants } from "@/components/ui/button";

interface AuthenticatedComponentProps {
  children?: React.ReactNode;
  partiallyAuthenticatedComponent?: React.ReactNode;
  notAuthenticatedComponent?: React.ReactNode;
}

const DefaultPartiallyAuthenticatedComponent = () => (
  <div className="flex flex-col gap-3">
    <p className="text-semibold">
      Please finish setting up your account to submit code.
    </p>
    <ul className="flex gap-5 items-center">
      <li>
        <Link
          to={routerConfig.accountSetup.path}
          className={buttonVariants({ variant: "outline" })}
        >
          Finish Setting Up Account
        </Link>
      </li>
    </ul>
  </div>
);

const DefaultNotAuthenticatedComponent = () => (
  <div className="flex flex-col gap-3">
    <p className="text-semibold">
      You need to log in or setup your account to submit code
    </p>
    <ul className="flex gap-5 items-center">
      <li>
        <LoginButton variant="default" className="w-28" />
      </li>
      <li>
        <SignupButton variant="secondary" className="w-28" />
      </li>
    </ul>
  </div>
);

const AuthenticatedComponent: React.FC<AuthenticatedComponentProps> = ({
  children,
  partiallyAuthenticatedComponent = <DefaultPartiallyAuthenticatedComponent />,
  notAuthenticatedComponent = <DefaultNotAuthenticatedComponent />,
}) => {
  const { status } = useAccount();

  if (status === AccountStatus.FullyAuthenticated) {
    return <>{children}</>;
  } else if (status === AccountStatus.PartiallyAuthenticated) {
    return <>{partiallyAuthenticatedComponent}</>;
  } else {
    return <>{notAuthenticatedComponent}</>;
  }
};

export default AuthenticatedComponent;
