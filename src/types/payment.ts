export type PaymentRecord = {
  _id?: string;
  id?: string;
  sessionId: string;
  status: string;
  payment_status: string;
  customer_email?: string;
  customer_details?: {
    name?: string;
    email?: string;
  };
  userId?: string;
  payment_date?: string | Date;
  payment_intent?: string;
  amount_total?: number;
  currency?: string;
};
