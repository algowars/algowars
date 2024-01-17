export interface AccountModel {
  id: string | null;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  usePg: boolean;
}
