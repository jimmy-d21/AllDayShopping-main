export const calculateRatings = (ratings) => {
  if (!ratings || ratings.length === 0) {
    return 0;
  }

  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  const average = total / ratings.length;
  const percentage = average * 10;

  return percentage;
};
