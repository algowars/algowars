import { createContext, ReactNode, useContext, useState } from "react";

type PaginationProviderProps = {
  children?: ReactNode;
  sizeOptions?: { size: number; label: string }[];
  defaultSize?: number;
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
  size: 20,
  timestamp: new Date(),
  changePage: () => null,
  changeSize: () => null,
  sizeOptions: [
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
};

const PaginationProviderContext =
  createContext<PaginationProviderState>(initialState);

export const PaginationProvider = ({
  children,
  sizeOptions: defaultSizeOptions = [
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
  defaultSize,
  ...props
}: PaginationProviderProps) => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(defaultSize ?? 20);
  const [sizeOptions] =
    useState<{ size: number; label: string }[]>(defaultSizeOptions);
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

  console.log("VALUE: ", value);

  return (
    <PaginationProviderContext.Provider {...props} value={value}>
      {children}
    </PaginationProviderContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationProviderContext);

  if (context === undefined) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }

  return context;
};
