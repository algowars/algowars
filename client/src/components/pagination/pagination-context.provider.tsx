import { createContext, ReactNode, useContext, useState } from "react";

type PaginationProviderProps = {
  children?: ReactNode;
  sizeOptions?: { size: number; label: string }[];
};

type PaginationProviderState = {
  page: number;
  size: number;
  timestamp: Date;
  sizeOptions: { size: number; label: string }[];
  changePage: (newPage: number) => void;
  changeSize: (newSize: number) => void;
};

const initialState: PaginationProviderState = {
  page: 1,
  size: 25,
  timestamp: new Date(),
  changePage: () => null,
  changeSize: () => null,
  sizeOptions: [],
};

const PaginationContext = createContext<PaginationProviderState>(initialState);

export const PaginationProvider = ({
  children,
  sizeOptions = [
    {
      size: 20,
      label: "20 / page",
    },
    {
      size: 50,
      label: "50 / page",
    },
    {
      size: 100,
      label: "100 / page",
    },
  ],
  ...props
}: PaginationProviderProps) => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const changeSize = (newSize: number) => {
    setSize(newSize);
  };

  const value = {
    page,
    size,
    timestamp,
    changePage,
    changeSize,
    sizeOptions,
  };

  return (
    <PaginationContext.Provider {...props} value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);

  if (context === undefined) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }

  return context;
};
