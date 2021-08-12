export const processCategory = (categoryItem) => {
  const categories = categoryItem?.match(/@[\w]+/g) || [];
  return categories.map((name) => ({
    where: { name },
    create: { name },
  }));
};
