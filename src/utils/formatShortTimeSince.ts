import { formatDistanceToNowStrict } from "date-fns";

export function formatShortTimeSince(dateString: string): string {
  const result = formatDistanceToNowStrict(new Date(dateString));
  const [value, unit] = result.split(" ");

  const shortUnit = unit.startsWith("second") ? "s"
    : unit.startsWith("minute") ? "m"
    : unit.startsWith("hour") ? "h"
    : unit.startsWith("day") ? "d"
    : unit.startsWith("month") ? "mo"
    : unit.startsWith("year") ? "y"
    : "";

  return `${value}${shortUnit}`;
}
