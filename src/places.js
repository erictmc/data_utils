import {
  EAT_CATEGORY,
  SHOP_CATEGORY,
  NIGHTLIFE_CATEGORY,
  OUT_AND_ABOUT_CATEGORY
} from "./constants"

import { openAfterCutoff } from "./time"

export const defineCategory = ( parentCategories, hours ) => {
  const parentCategory = [];

  let cats = ["food", "restaurants", "gourmet", "mexican", "french"];
  for (let i = 0; i < cats.length; i++) {
    if (parentCategories.includes(cats[i])) {
      parentCategory.push( EAT_CATEGORY );
    }
  }

  cats =  ["shopping", "beautysvc", "homeandgarden", "fashion"];
  for (let i = 0; i < cats.length; i++) {
    if (parentCategories.includes(cats[i])) {
      parentCategory.push(SHOP_CATEGORY);
    }
  }

  cats = ["bars", "nightlife"];
  for (let i = 0; i < cats.length; i++) {
    if (parentCategories.includes(cats[i])) {
      if (openAfterCutoff(hours, "23:30") === true) {
        parentCategory.push(NIGHTLIFE_CATEGORY);
      }
    }
  }

  if (parentCategory.length === 0){
    return [ OUT_AND_ABOUT_CATEGORY ]
  }

  return parentCategory

};
