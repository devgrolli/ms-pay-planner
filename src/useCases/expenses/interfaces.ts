
export interface IInstallmentExpenses {
  qtyInstallments: number;
  hasInput: boolean;
  inputValue?: string | null;
}
  
export interface IExpense {
  customerId: string;
  localName: string;
  date: string;
  category: string;
  typePayments: string;
  priceTotal: string;
  installments: IInstallmentExpenses | null;
}
  
export enum PaymentType {
  PIX = 'pix',
  MONEY = 'money',
  CREDIT_CARD = 'creditCard',
  DEBIT_CARD = 'debitCard',
  LOAN = 'financiamento',
}

export const nameCollection = "Expenses";