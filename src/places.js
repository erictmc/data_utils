import {
  EAT_CATEGORY,
  SHOP_CATEGORY,
  NIGHTLIFE_CATEGORY,
  OUT_AND_ABOUT_CATEGORY,
  COFFEE_AND_SNACKS_CATEGORY,
  OUTDOORS_CATEGORY
} from "./constants"

import { openAfterCutoff } from "./time"
import { deepCopy } from "./utils";


const COFFEE_AND_SNACKS_LOOKUP = {
  "coffee"     : true,
  "tea"        : true,
  "donuts"     : true,
  "chocolate"  : true,
  "icecream"   : true,
  "desserts"   : true,
  "bakeries"   : true,
  "customcakes": true
};

const OUTDOORS_LOOKUP = {
  "parks"         : true,
  "hiking"        : true,
  "dog_parks"     : true,
  "beaches"       : true,
  "boatcharters"  : true,
  "rafting"       : true,
  "mountainbiking": true,
  "zipline"       : true,
  "skiing"        : true,
  "sailing"       : true,
  "rock_climbing" : true
};


export const defineCategory = ( yelpCategories, hours ) => {
  let parentCategory = [];

  parentCategory = classifyOutdoors(yelpCategories, parentCategory);

  let cats = ["food", "restaurants", "gourmet", "mexican", "french"];
  for (let i = 0; i < cats.length; i++) {
    if (yelpCategories.includes(cats[i])) {
      parentCategory.push( EAT_CATEGORY );
    }
  }

  cats =  ["shopping", "beautysvc", "homeandgarden", "fashion"];
  for (let i = 0; i < cats.length; i++) {
    if (yelpCategories.includes(cats[i])) {
      parentCategory.push(SHOP_CATEGORY);
    }
  }

  cats = ["bars", "nightlife"];
  for (let i = 0; i < cats.length; i++) {
    if (yelpCategories.includes(cats[i])) {
      if (openAfterCutoff(hours, "23:30") === true) {
        parentCategory.push(NIGHTLIFE_CATEGORY);
      }
    }
  }


  parentCategory = classifyCoffeeAndSnacks(yelpCategories, parentCategory);



  if (parentCategory.length === 0){
    return [ OUT_AND_ABOUT_CATEGORY ]
  }

  return parentCategory

};


const classifyCoffeeAndSnacks = (yelpCategories, parentCategory) => {

  const parentCategoryCpy = deepCopy(parentCategory);
  let allCategoriesFound = true;
  yelpCategories.forEach(category => {
    if (!(category in COFFEE_AND_SNACKS_LOOKUP)){
      allCategoriesFound = false;
    }
  });

  if (allCategoriesFound){
    parentCategoryCpy.push(COFFEE_AND_SNACKS_CATEGORY)
  }

  return parentCategoryCpy
};


const classifyOutdoors = (yelpCategories, parentCategory) => {

  const parentCategoryCpy = deepCopy(parentCategory);
  let allCategoriesFound = true;
  yelpCategories.forEach(category => {
    if (!(category in OUTDOORS_LOOKUP)){
      allCategoriesFound = false;
    }
  });

  if (allCategoriesFound){
    parentCategoryCpy.push(OUTDOORS_CATEGORY)
  }

  return parentCategoryCpy
};