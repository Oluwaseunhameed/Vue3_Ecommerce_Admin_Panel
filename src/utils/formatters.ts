import { format } from "date-fns";

export const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export const formatDate = (date: Date) => format(date, "MMM dd, yyyy");
