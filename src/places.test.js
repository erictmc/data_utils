import { defineCategory } from "./places"
import { COFFEE_AND_SNACKS_CATEGORY, EAT_CATEGORY, OUT_AND_ABOUT_CATEGORY, OUTDOORS_CATEGORY } from "./constants";

const EAT_YELP_CATEGORIES = ["restaurants", "gourmet", "mexican", "french"];
const OUTDOOR_YELP_CATEGORIES=["hiking", "parks", "dog_parks"];

describe("defineCategory", () => {

  describe("should correctly define classify the EAT", () => {
    it(" in a basic scenario for existing category", () => {
      EAT_YELP_CATEGORIES.forEach(category => {
        expect(defineCategory([category], {})).toEqual([EAT_CATEGORY]);
      });
    });

    it(" with a combination of an unknown category", () => {
      EAT_YELP_CATEGORIES.forEach(category => {
        expect(defineCategory([category, "unknown_category"], {})).toEqual([EAT_CATEGORY]);
      });
    })
  });


  describe("should correctly define classify the COFFEE_AND_SNACKS_CATEGORY", () => {
    it(" in a basic scenario for existing category", () => {
      expect(defineCategory(["coffee"], {})).toEqual([COFFEE_AND_SNACKS_CATEGORY]);
      expect(defineCategory(["chocolate"], {})).toEqual([COFFEE_AND_SNACKS_CATEGORY]);
      expect(defineCategory(["donuts"], {})).toEqual([COFFEE_AND_SNACKS_CATEGORY]);
      expect(defineCategory(["icecream"], {})).toEqual([COFFEE_AND_SNACKS_CATEGORY]);
      expect(defineCategory(["desserts"], {})).toEqual([COFFEE_AND_SNACKS_CATEGORY]);
      expect(defineCategory(["bakeries"], {})).toEqual([COFFEE_AND_SNACKS_CATEGORY]);
      expect(defineCategory(["customcakes"], {})).toEqual([COFFEE_AND_SNACKS_CATEGORY]);
    });

    it(" in a scenario with multiple categories", () => {
      expect(defineCategory(["coffee", "chocolate"], {})).toEqual([COFFEE_AND_SNACKS_CATEGORY]);
    });

    it(" in a scenario with unknown category", () => {
      expect(defineCategory(["coffee", "unknown"], {})).toEqual([OUT_AND_ABOUT_CATEGORY]);
    })
  });

  describe("should correctly define classify the OUTDOORS_CATEGORY", () => {
    it(" in a basic scenario for existing category", () => {
      OUTDOOR_YELP_CATEGORIES.forEach(category => {
        expect(defineCategory([category], {})).toEqual([OUTDOORS_CATEGORY]);
      });
    });

    it(" in a scenario with multiple categories", () => {
      expect(defineCategory(OUTDOOR_YELP_CATEGORIES, {})).toEqual([OUTDOORS_CATEGORY]);
      expect(defineCategory(["hiking", "parks"], {})).toEqual([OUTDOORS_CATEGORY]);
    });

    it(" in a scenario with unknown category", () => {
      expect(defineCategory(["hiking", "unknown"], {})).toEqual([OUT_AND_ABOUT_CATEGORY]);
    })
  });

});