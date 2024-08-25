import { useAppSelector } from "@/store/use-app-selector";
import React, { ComponentType } from "react";
import { useNavigate } from "react-router-dom";

interface AccountExistsGuardProps {
  component: ComponentType;
}

export const AccountExistsGuard: React.FC<AccountExistsGuardProps> = ({
  component: Component,
}) => {
  const navigate = useNavigate();
  const { account } = useAppSelector((state) => state.account);

  if (account) {
    navigate("/");
  }

  return <Component />;
};
