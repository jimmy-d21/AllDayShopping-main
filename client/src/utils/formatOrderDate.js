export const formatOrderDate = (timestamp) => {
  if (!timestamp) return "Unknown date";

  const date = new Date(timestamp);

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};
