import { defineCategory } from "./places"

describe("renameObjectFieldCopy", () => {
  it(" should correctly define classify the EAT category", () => {
    console.log(defineCategory(["mexican"], {}))
  })

});