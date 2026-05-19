const dateFromISO = (isoString: string): string => {
  if (!isoString) {
    throw new Error("Invalid ISO date string");
  }
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
export default dateFromISO;
