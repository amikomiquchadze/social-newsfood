import { format } from "date-fns";

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "MMM d, yyyy 'at' HH:mm");
};
