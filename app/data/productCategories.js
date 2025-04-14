import { productsData } from "./productsData";

const grouped = productsData.reduce((acc, product) => {
  const category = product.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(product);
  return acc;
}, {});

export const categorizedProducts = Object.entries(grouped).map(([category, items]) => ({
  category,
  products: items
}));
