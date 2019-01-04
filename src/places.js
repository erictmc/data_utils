import {
  EAT_CATEGORY,
  SHOP_CATEGORY,
  DRINK_CATEGORY,
  OUT_AND_ABOUT_CATEGORY,
  COFFEE_AND_SNACKS_CATEGORY,
  OUTDOORS_CATEGORY
} from "./constants"

import outdoorLookup from "./category-lookups/outdoors.json"
import coffeeAndSnacksLookup from "./category-lookups/coffee-and-snacks.json"
import eatLookup from "./category-lookups/eat.json";
import drinkLookup from "./category-lookups/drink.json"
import shopLookup from "./category-lookups/shop.json"

export const defineCategory = yelpCategories  => {
  let parentCategory = [];
  let newCategory;

  newCategory = classifyCategory(yelpCategories, outdoorLookup, OUTDOORS_CATEGORY, true);
  parentCategory = parentCategory.concat(newCategory);

  newCategory = classifyCategory(yelpCategories, eatLookup, EAT_CATEGORY, false);
  parentCategory = parentCategory.concat(newCategory);

  newCategory = classifyCategory(yelpCategories, shopLookup, SHOP_CATEGORY, false);
  parentCategory = parentCategory.concat(newCategory);

  newCategory = classifyCategory(yelpCategories, drinkLookup, DRINK_CATEGORY, false);
  parentCategory = parentCategory.concat(newCategory);

  newCategory = classifyCategory(yelpCategories, coffeeAndSnacksLookup, COFFEE_AND_SNACKS_CATEGORY, true);
  parentCategory = parentCategory.concat(newCategory);

  if (parentCategory.length === 0){
    return [ OUT_AND_ABOUT_CATEGORY ]
  }

  return parentCategory

};

const classifyCategory = (yelpCategories, categoryLookup, categoryName, allMustBePresent) => {
  const classifiedCategory = [];

  if (allMustBePresent === true){
    let allCategoriesFound = true;
    yelpCategories.forEach(category => {
      if (!(category in categoryLookup)){
        allCategoriesFound = false;
      }
    });

    if (allCategoriesFound){
      classifiedCategory.push(categoryName)
    }

  } else {
    for (let i = 0; i < yelpCategories.length; i++) {
      if (yelpCategories[i] in categoryLookup){
        classifiedCategory.push(categoryName);
        break;
      }
    }
  }

  return classifiedCategory
};