import { useState } from "react";
import { useAppSelector } from "./useAppSelector";

export const useAccountCheck = () => {
  const { account } = useAppSelector((state) => state.account);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const checkIfAccountExists = (action: () => void) => {
    if (account?.id) {
      action();
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { checkIfAccountExists, isModalOpen, closeModal };
};
