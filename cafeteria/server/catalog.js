const tiffins = [
  ["Idli", 30],
  ["Dosa", 40],
  ["Puri", 35],
  ["Upma", 40],
];

const snacks = [
  ["Samosa", 40],
  ["Veg Puff", 30],
  ["French Fries", 90],
  ["Veg Sandwich", 50],
  ["Chicken Puff", 50],
  ["Chicken Nuggets", 90],
  ["Chicken Sandwich", 80],
  ["Chicken Roll", 85],
];

const shakes = [
  ["Oreo Shake", 90],
  ["Chocolate Shake", 100],
  ["Strawberry Shake", 95],
  ["Vanilla Shake", 80],
];

const pizzas = [
  ["Margherita Pizza", 120],
  ["Veg Supreme Pizza", 170],
  ["Chicken Pizza", 190],
  ["Cheese Burst Pizza", 210],
];

const pastas = [
  ["White Sauce Pasta", 130],
  ["Red Sauce Pasta", 120],
  ["Veg Alfredo Pasta", 150],
  ["Chicken Pasta", 170],
];

const drinks = [
  ["Coke", 40],
  ["Sprite", 40],
  ["Fanta", 40],
  ["Water Bottle", 20],
];

const restaurantMenu = [
  ...tiffins,
  ["Paneer Butter Masala", 180],
  ["Mix Veg curry", 150],
  ["Dal", 100],
  ["Kaju Kari", 225],
  ["Panner Shahi kurma", 225],
  ["Chicken Butter Masala", 270],
  ["Mutton Curry", 290],
  ["Fish Fry", 260],
  ["Egg Curry", 125],
  ["Prawn Curry", 225],
  ["Biryani", 290],
  ["Lemon Rice", 90],
  ...snacks,
  ...shakes,
  ...pizzas,
  ...pastas,
  ["Tea", 20],
  ["Coffee", 30],
  ...drinks,
];

const blockCanteenMenu = [
  ...snacks,
  ...shakes,
  ...pizzas,
  ...pastas,
  ...drinks,
];

const menuByCanteen = new Map();

function addMenu(canteen, items) {
  for (const [name, price] of items) {
    menuByCanteen.set(`${canteen}\0${name}`, { name, price, canteen });
  }
}

addMenu("MHP Restarunt", restaurantMenu);
addMenu("U Block canteen", [
  ["Idli", 30],
  ["Puri", 35],
  ["Paneer Curry", 90],
  ["Veg Biryani", 95],
  ["Burger", 70],
  ["Pizza", 120],
  ["French Fries", 90],
  ["Coke", 40],
]);
addMenu("A Block Canteen", blockCanteenMenu);
addMenu("H Block 3rd Floor canteen", blockCanteenMenu);
addMenu("N Block canteen", blockCanteenMenu);

export function findMenuItem(canteen, name) {
  return menuByCanteen.get(`${canteen}\0${name}`);
}
