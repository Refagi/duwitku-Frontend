export type AccountType = "CASH" | "BANK" | "EWALLET";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: string; // Prisma Decimal - selalu serialize sebagai string, BUKAN number
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountPayload {
  name: string;
  type: AccountType;
  balance?: number;
}

export interface UpdateAccountPayload {
  name?: string;
  type?: AccountType;
  balance?: number;
}