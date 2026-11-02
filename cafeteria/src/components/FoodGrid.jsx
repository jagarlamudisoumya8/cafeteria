import idli from "../assets/images/idli.jpg";
import dosa from "../assets/images/dosa.jpg";
import puri from "../assets/images/puri.jpg";
import upma from "../assets/images/upma.jpg";

import paneer from "../assets/images/paneer.jpg";
import dal from "../assets/images/dal.jpg";
import mixveg from "../assets/images/mixveg.jpg";
import KajuCurry from "../assets/images/KajuCurry.jpg";
import PannerShahiKurma from "../assets/images/PannerShahiKurma.jpg";

import cbm from "../assets/images/cbm.jpg";
import MuttonCurry from "../assets/images/MuttonCurry.jpg";
import FishFry from "../assets/images/FishFry.jpg";
import EggCurry from "../assets/images/EggCurry.jpg";
import PrawnCurry from "../assets/images/PrawnCurry.jpg";

import biryani from "../assets/images/biryani.jpg";
import lemonrice from "../assets/images/lemonrice.jpg";

import tea from "../assets/images/tea.jpg";
import coffee from "../assets/images/coffee.jpg";

import burger from "../assets/images/burger.jpg";
import pizza from "../assets/images/pizza.jpg";
import fries from "../assets/images/fries.jpg";
import coke from "../assets/images/coke.jpg";




import samosa from "../assets/images/samosa.jpg";
import vegPuff from "../assets/images/vegpuff.jpg";
import vegSandwich from "../assets/images/vegsandwich.jpg";

import chickenPuff from "../assets/images/chickenpuff.jpg";
import nuggets from "../assets/images/nuggets.jpg";
import chickenSandwich from "../assets/images/chickensandwich.jpg";
import chickenRoll from "../assets/images/chickenroll.jpg";

import oreoShake from "../assets/images/oreoshake.jpg";
import chocolateShake from "../assets/images/chocolateshake.jpg";
import strawberryShake from "../assets/images/strawberryshake.jpg";
import vanillaShake from "../assets/images/vanillashake.jpg";

import margherita from "../assets/images/margherita.jpg";
import vegSupreme from "../assets/images/vegsupreme.jpg";
import chickenPizza from "../assets/images/chickenpizza.jpg";
import cheeseBurst from "../assets/images/cheeseBurst.jpg";

import whitePasta from "../assets/images/whitepasta.jpg";
import redPasta from "../assets/images/redpasta.jpg";
import alfredo from "../assets/images/alfredo.jpg";
import chickenPasta from "../assets/images/chickenpasta.jpg";

import sprite from "../assets/images/sprite.jpg";
import fanta from "../assets/images/fanta.jpg";
import water from "../assets/images/water.jpg";

const menus = {
  "MHP Restarunt": {
    Tiffins: [
      { name: "Idli", price: 30, image: idli },
      { name: "Dosa", price: 40, image: dosa },
      { name: "Puri", price: 35, image: puri },
      { name: "Upma", price: 40, image: upma },

    ],
    "Veg Curries": [
      { name: "Paneer Butter Masala", price: 180, image: paneer },
      { name: "Mix Veg curry", price: 150, image: mixveg },
      { name: "Dal", price: 100, image: dal },
      { name: "Kaju Kari", price: 225, image: KajuCurry },
      { name: "Panner Shahi kurma", price: 225, image: PannerShahiKurma },
    ],
    "Non-Veg Curries": [
      { name: "Chicken Butter Masala", price: 270, image: cbm },
      { name: "Mutton Curry", price: 290, image: MuttonCurry },
      { name: "Fish Fry", price: 260, image: FishFry },
      { name: "Egg Curry", price: 125, image: EggCurry },
      { name: "Prawn Curry", price: 225, image: PrawnCurry },
    ],
    Rice: [
      { name: "Biryani", price: 290, image: biryani },
      { name: "Lemon Rice", price: 90, image: lemonrice },
    ],

    "Veg Snacks": [
    { name: "Samosa", price: 40, image: samosa },
    { name: "Veg Puff", price: 30, image: vegPuff },
    { name: "French Fries", price: 90, image: fries },
    { name: "Veg Sandwich", price: 50, image: vegSandwich }
  ],
  "Non-Veg Snacks": [
    { name: "Chicken Puff", price: 50, image: chickenPuff },
    { name: "Chicken Nuggets", price: 90, image: nuggets },
    { name: "Chicken Sandwich", price: 80, image: chickenSandwich },
    { name: "Chicken Roll", price: 85, image: chickenRoll }
  ],

  Shakes: [
    { name: "Oreo Shake", price: 90, image: oreoShake },
    { name: "Chocolate Shake", price: 100, image: chocolateShake },
    { name: "Strawberry Shake", price: 95, image: strawberryShake },
    { name: "Vanilla Shake", price: 80, image: vanillaShake }
  ],

  Pizzas: [
    { name: "Margherita Pizza", price: 120, image: margherita },
    { name: "Veg Supreme Pizza", price: 170, image: vegSupreme },
    { name: "Chicken Pizza", price: 190, image: chickenPizza },
    { name: "Cheese Burst Pizza", price: 210, image: cheeseBurst }
  ],
  
  Pastas: [
    { name: "White Sauce Pasta", price: 130, image: whitePasta },
    { name: "Red Sauce Pasta", price: 120, image: redPasta },
    { name: "Veg Alfredo Pasta", price: 150, image: alfredo },
    { name: "Chicken Pasta", price: 170, image: chickenPasta }
  ],
    Drinks: [
      { name: "Tea", price: 20, image: tea },
      { name: "Coffee", price: 30, image: coffee },
      { name: "Coke", price: 40, image: coke },
      { name: "Sprite", price: 40, image: sprite },
      { name: "Fanta", price: 40, image: fanta },
      { name: "Water Bottle", price: 20, image: water }

    ],
  },

  "U Block canteen": {
    Tiffins: [
      { name: "Idli", price: 30, image: idli },
      { name: "Puri", price: 35, image: puri },
    ],
    "Veg Curries": [
      { name: "Paneer Curry", price: 90, image: paneer },
    ],
    Rice: [
      { name: "Veg Biryani", price: 95, image: biryani },
    ],
    Drinks: [
      { name: "Burger", price: 70, image: burger },
      { name: "Pizza", price: 120, image: pizza },
      { name: "French Fries", price: 90, image: fries },
      { name: "Coke", price: 40, image: coke },
    ],
  },


"A Block Canteen": {
  "Veg Snacks": [
    { name: "Samosa", price: 40, image: samosa },
    { name: "Veg Puff", price: 30, image: vegPuff },
    { name: "French Fries", price: 90, image: fries },
    { name: "Veg Sandwich", price: 50, image: vegSandwich }
  ],

  "Non-Veg Snacks": [
    { name: "Chicken Puff", price: 50 , image: chickenPuff },
    { name: "Chicken Nuggets", price: 90, image: nuggets },
    { name: "Chicken Sandwich", price: 80, image: chickenSandwich },
    { name: "Chicken Roll", price: 85, image: chickenRoll }
  ],

  Shakes: [
    { name: "Oreo Shake", price: 90, image: oreoShake },
    { name: "Chocolate Shake", price: 100, image: chocolateShake },
    { name: "Strawberry Shake", price: 95, image: strawberryShake },
    { name: "Vanilla Shake", price: 80, image: vanillaShake }
  ],

  Pizzas: [
    { name: "Margherita Pizza", price: 120, image: margherita },
    { name: "Veg Supreme Pizza", price: 170, image: vegSupreme },
    { name: "Chicken Pizza", price: 190, image: chickenPizza },
    { name: "Cheese Burst Pizza", price: 210, image: cheeseBurst }
  ],

  Pastas: [
    { name: "White Sauce Pasta", price: 130, image: whitePasta },
    { name: "Red Sauce Pasta", price: 120, image: redPasta },
    { name: "Veg Alfredo Pasta", price: 150, image: alfredo },
    { name: "Chicken Pasta", price: 170, image: chickenPasta }
  ],

  Drinks: [
    { name: "Coke", price: 40, image: coke },
    { name: "Sprite", price: 40, image: sprite },
    { name: "Fanta", price: 40, image: fanta },
    { name: "Water Bottle", price: 20, image: water }
  ]
},


  "H Block 3rd Floor canteen": {
  "Veg Snacks": [
    { name: "Samosa", price: 40, image: samosa },
    { name: "Veg Puff", price: 30, image: vegPuff },
    { name: "French Fries", price: 90, image: fries },
    { name: "Veg Sandwich", price: 50, image: vegSandwich }
  ],

  "Non-Veg Snacks": [
    { name: "Chicken Puff", price: 50 , image: chickenPuff },
    { name: "Chicken Nuggets", price: 90, image: nuggets },
    { name: "Chicken Sandwich", price: 80, image: chickenSandwich },
    { name: "Chicken Roll", price: 85, image: chickenRoll }
  ],

  Shakes: [
    { name: "Oreo Shake", price: 90, image: oreoShake },
    { name: "Chocolate Shake", price: 100, image: chocolateShake },
    { name: "Strawberry Shake", price: 95, image: strawberryShake },
    { name: "Vanilla Shake", price: 80, image: vanillaShake }
  ],

  Pizzas: [
    { name: "Margherita Pizza", price: 120, image: margherita },
    { name: "Veg Supreme Pizza", price: 170, image: vegSupreme },
    { name: "Chicken Pizza", price: 190, image: chickenPizza },
    { name: "Cheese Burst Pizza", price: 210, image: cheeseBurst }
  ],

  Pastas: [
    { name: "White Sauce Pasta", price: 130, image: whitePasta },
    { name: "Red Sauce Pasta", price: 120, image: redPasta },
    { name: "Veg Alfredo Pasta", price: 150, image: alfredo },
    { name: "Chicken Pasta", price: 170, image: chickenPasta }
  ],

  Drinks: [
    { name: "Coke", price: 40, image: coke },
    { name: "Sprite", price: 40, image: sprite },
    { name: "Fanta", price: 40, image: fanta },
    { name: "Water Bottle", price: 20, image: water }
  ]
},

  "N Block canteen": {
  "Veg Snacks": [
    { name: "Samosa", price: 40, image: samosa },
    { name: "Veg Puff", price: 30, image: vegPuff },
    { name: "French Fries", price: 90, image: fries },
    { name: "Veg Sandwich", price: 50, image: vegSandwich }
  ],

  "Non-Veg Snacks": [
    { name: "Chicken Puff", price: 50 , image: chickenPuff },
    { name: "Chicken Nuggets", price: 90, image: nuggets },
    { name: "Chicken Sandwich", price: 80, image: chickenSandwich },
    { name: "Chicken Roll", price: 85, image: chickenRoll }
  ],

  Shakes: [
    { name: "Oreo Shake", price: 90, image: oreoShake },
    { name: "Chocolate Shake", price: 100, image: chocolateShake },
    { name: "Strawberry Shake", price: 95, image: strawberryShake },
    { name: "Vanilla Shake", price: 80, image: vanillaShake }
  ],

  Pizzas: [
    { name: "Margherita Pizza", price: 120, image: margherita },
    { name: "Veg Supreme Pizza", price: 170, image: vegSupreme },
    { name: "Chicken Pizza", price: 190, image: chickenPizza },
    { name: "Cheese Burst Pizza", price: 210, image: cheeseBurst }
  ],

  Pastas: [
    { name: "White Sauce Pasta", price: 130, image: whitePasta },
    { name: "Red Sauce Pasta", price: 120, image: redPasta },
    { name: "Veg Alfredo Pasta", price: 150, image: alfredo },
    { name: "Chicken Pasta", price: 170, image: chickenPasta }
  ],

  Drinks: [
    { name: "Coke", price: 40, image: coke },
    { name: "Sprite", price: 40, image: sprite },
    { name: "Fanta", price: 40, image: fanta },
    { name: "Water Bottle", price: 20, image: water }
  ]
}


};

export default function FoodGrid({
  canteen,
  category,
  cart,
  addItem,
  removeItem,
}) {
  const foods = menus[canteen]?.[category] || [];

  return (
    <div className="grid">
      {foods.map((food) => {
        const qty = cart.filter(
          (item) =>
            item.name === food.name &&
            item.canteen === canteen
        ).length;

        return (
          <div className="food" key={food.name}>
            <img
              src={food.image}
              alt={food.name}
              className="food-img"
            />

            <div className="food-content">
              <h3>{food.name}</h3>

              <div className="price-row">
                <span className="price">
                  ₹{food.price}
                </span>

                <span className="qty">
                  Qty {qty}
                </span>
              </div>

              <div className="btns">
                <button
                  className="add"
                  onClick={() =>
                    addItem({ ...food, canteen })
                  }
                >
                  Add
                </button>

                <button
                  className="remove"
                  disabled={qty === 0}
                  onClick={() =>
                    removeItem(food.name, canteen)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
