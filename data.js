// data.js - Willys High-Protein Human Foods (filtered)
const willysFood = [
  // Kvarg
  { name: "Naturell Kvarg 0.3%", price: 21.90, protein: 11, carbs: 3.4, fat: 0.3, volume: "500g", category: "dairy" },
  { name: "Vanilj Yoghurtkvarg 0.3%", price: 24.90, protein: 7, carbs: 14, fat: 0.3, volume: "500g", category: "dairy" },
  { name: "Vaniljsmak Kvarg 0.2%", price: 24.90, protein: 10, carbs: 3.5, fat: 0.2, volume: "500g", category: "dairy" },
  { name: "Hallonsmak Kvarg Utan Socker 0.2%", price: 24.90, protein: 10, carbs: 3.5, fat: 0.2, volume: "500g", category: "dairy" },
  { name: "Mango Passion Kvarg 0.2%", price: 24.90, protein: 10, carbs: 3.7, fat: 0.2, volume: "500g", category: "dairy" },

  // Kyckling
  { name: "Kyckling Bröstfilé Sverige", price: 85.90, protein: 21, carbs: 0.5, fat: 2, volume: "900g", category: "chicken" },
  { name: "Minutbitar Kyckling", price: 87.90, protein: 23, carbs: 0.5, fat: 2, volume: "550g", category: "chicken" },
  { name: "Kycklinginnerf Grillad Bbq Smak Sverige", price: 41.90, protein: 21, carbs: 4, fat: 4, volume: "200g", category: "chicken" },
  { name: "Kyckling Bröstfilé Grillkryddad", price: 99.90, protein: 20, carbs: 1.3, fat: 1.2, volume: "800g", category: "chicken" },
  { name: "Sallads Kyckling", price: 93.90, protein: 22, carbs: 1.5, fat: 4, volume: "500g", category: "chicken" },
  { name: "Kycklingfärs Sverige", price: 76.90, protein: 19, carbs: 0.5, fat: 7, volume: "750g", category: "chicken" },

  // Fisk / Lax
  { name: "Regnbågslax", price: 109.00, protein: 18.1, carbs: 0.4, fat: 3.46, volume: "4x125g", category: "fish" },
  { name: "Gravad Lax Skivad", price: 53.90, protein: 19, carbs: 3.1, fat: 8.7, volume: "150g", category: "fish" },
  { name: "Kallrökt Laxfilé", price: 69.90, protein: 19, carbs: 0.5, fat: 11, volume: "150g", category: "fish" },
  { name: "Varmrökt Lax Naturell Portionsbit", price: 49.90, protein: 22, carbs: 0.1, fat: 15, volume: "125g", category: "fish" },
  { name: "Laxfärs Fryst", price: 64.90, protein: 20, carbs: 0.7, fat: 14, volume: "450g", category: "fish" },
  { name: "Torskfilé Fryst", price: 89.90, protein: 17, carbs: 0, fat: 0.5, volume: "400g", category: "fish" },
  { name: "Torskfilé", price: 59.90, protein: 18, carbs: 0, fat: 0.5, volume: "400g", category: "fish" },
  { name: "Sejfelé", price: 49.90, protein: 20, carbs: 0, fat: 0.9, volume: "400g", category: "fish" },

  // Bröd (High-Protein Options)
  { name: "Mörkt Fröbröd med Protein", price: 29.90, protein: 15, carbs: 33, fat: 14, volume: "500g", category: "bread" },
  { name: "Fröbröd", price: 29.90, protein: 15, carbs: 17, fat: 20, volume: "400g", category: "bread" },
  { name: "Proteinbröd 5-skivor", price: 29.90, protein: 22, carbs: 13, fat: 12, volume: "250g", category: "bread" },
];

// Helper: Get price per 100g
function getPricePer100g(item) {
  const vol = parseFloat(item.volume);
  return (item.price / vol) * 100;
}

// Add protein per krona
willysFood.forEach(item => {
  const proteinPer100g = item.protein;
  const pricePer100g = getPricePer100g(item);
  item.proteinPerKrona = proteinPer100g / pricePer100g;
});