import {
  convertObjToCamelCase,
  convertObjToSnakeCase,
  isValidEmail,
  passwordPassesComplexityRules
} from "./utils"

import camelCase from "lodash.camelcase";

describe("Case Conversion", () => {
  const snake_case = {
    "start_time": "foo",
    "end_time": {
      "foo_bar": undefined,
      "bee_bop": [1, 2]
    }
  };

  const camelCase = {
    "startTime": "foo",
    "endTime": {
      "fooBar": undefined,
      "beeBop": [1, 2]
    }
  };

  describe("convertObjToCamelCase", () => {
    it(" should handle basic objects", () => {
      expect(convertObjToCamelCase(snake_case)).toEqual(camelCase)
    });

    it(" should handle arrays of objects", () => {
      const inputArr = [snake_case, snake_case];
      const outputArr = [camelCase, camelCase];
      expect(convertObjToCamelCase(inputArr)).toEqual(outputArr);
    });

    it(" should handle empty arrays", () => {
      expect(convertObjToCamelCase([])).toEqual([]);
    })

    it(" should handle cases with undefined values", () => {
      const input = { "foo_bar": undefined };
      const output = { "fooBar": undefined };
      expect(convertObjToCamelCase(input)).toEqual(output);
    })
  });

  describe("convertObjToSnakeCase", () => {
    it(" should handle basic objects", () => {
      expect(convertObjToSnakeCase(camelCase)).toEqual(snake_case)
    });

    it(" should handle arrays of objects", () => {
      const inputArr = [camelCase, camelCase];
      const outputArr = [snake_case, snake_case];
      expect(convertObjToSnakeCase(inputArr)).toEqual(outputArr);
    });

    it(" should handle empty arrays", () => {
      expect(convertObjToSnakeCase([])).toEqual([]);
    });

    it(" should handle empty arrays", () => {
      expect(convertObjToSnakeCase([])).toEqual([]);
    });

    it(" should handle cases with undefined values", () => {
      const input = { "fooBar": undefined };
      const output = { "foo_bar": undefined };
      expect(convertObjToSnakeCase(input)).toEqual(output);
    })
  });

});

describe("camelCase", () => {
  it(" should correctly handle field names", () => {
    expect(camelCase("start_datetime")).toEqual("startDatetime");
    expect(camelCase("created_at")).toEqual("createdAt");
    expect(camelCase("user_id")).toEqual("userId");
    expect(camelCase("place_id")).toEqual("placeId");
  });
});

describe("convertObjToCamelCase", () => {
  const inputObj = { "start_time": "foo_bar",  "end_time": "foo_bar" };
  const outputObj = { "startTime": "foo_bar",  "endTime": "foo_bar" };

  it(" should handle basic objects", () => {
    expect(convertObjToCamelCase(inputObj)).toEqual(outputObj)
  });

  it(" should handle basic objects", () => {
    const inputArr = [inputObj, inputObj];
    const outputArr = [outputObj, outputObj];
    expect(convertObjToCamelCase(inputArr)).toEqual(outputArr);
  })
});

describe("passwordPassesComplexityRules", () => {
  describe(" it should correctly reject cases", () => {
    it(" empty string", () => {
      expect(passwordPassesComplexityRules("")).toEqual(false);
    });

    it(" password with special char, upper/lower case, num, but too short", () => {
      expect(passwordPassesComplexityRules("!Abcde8")).toEqual(false);
    });

    it(" has any spaces", () => {
      expect(passwordPassesComplexityRules(" !Abcdef8")).toEqual(false);
      expect(passwordPassesComplexityRules("!Abc def8")).toEqual(false);
      expect(passwordPassesComplexityRules("!Abcdef8 ")).toEqual(false);
    });

    it(" lacks a number", () => {
      expect(passwordPassesComplexityRules("!Abcdefg")).toEqual(false);
    });

    it(" all lowers letters is ok", () => {
      expect(passwordPassesComplexityRules("!abcdef8")).toEqual(true);
    });

    it(" all uppercase letters is ok", () => {
      expect(passwordPassesComplexityRules("!ABCDEF8")).toEqual(true);
    })
  });

  describe(" it should correctly accept cases", () => {
    it(" expected correct", () => {
      expect(passwordPassesComplexityRules("!Abcdef8")).toEqual(true);
    })

    it(" handles minimum case", () => {
      expect(passwordPassesComplexityRules("abcdefg8")).toEqual(true);
    })
  })
});


describe("isValidEmail", () => {
  describe("it should correctly reject invalid emails ", () => {
    it("lacks @ in the email string", () => {
      expect(isValidEmail("foobar.com")).toEqual(false);
    });

    it("has a space in the email", () => {
      expect(isValidEmail(" foo@bar.com")).toEqual(false);
      expect(isValidEmail("foo @bar.com")).toEqual(false);
      expect(isValidEmail("foo@bar.com ")).toEqual(false);
    });

    it("nothing after @", () => {
      expect(isValidEmail("foo@")).toEqual(false);
    });

    it("it should handle test cases", () => {
      const failureCases = ["john.doe@example..com", "A@b@c@example.com", "just\"not\"right@example.com"];
      failureCases.map(emailCase => {
        expect(isValidEmail(emailCase)).toEqual(false);
      });
    })
  });

  describe(" it should correctly accept an email", () => {
    expect(isValidEmail("foo@bar.com")).toEqual(true);
  })
});