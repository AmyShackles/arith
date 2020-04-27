const { tokenize } = require("../src/tokenize");

describe("Tokenize the input stream", () => {
  it("Should return an empty array", () => {
    expect(Array.isArray(tokenize(""))).toBe(true);
  });

  it("Should correctly tokenize a single digit", () => {
    const input = "2";
    const result = [
      {
        type: "INTEGER",
        value: 2,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a multi-digit number", () => {
    const input = "249102";
    const result = [
      {
        type: "INTEGER",
        value: 249102,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a floating-point number", () => {
    const input = "31.1415";
    const result = [
      {
        type: "FLOAT",
        value: 31.1415,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should throw an error on malformed numeric input", () => {
    expect(() => {
      tokenize("389ss9");
    }).toThrow();

    expect(() => {
      tokenize("3.227dd");
    }).toThrow();

    expect(() => {
      tokenize("842.888888.");
    }).toThrow();
  });

  it("Should correctly tokenize a string of letters as an identifier", () => {
    const input = "abcdefg";
    const result = [
      {
        type: "IDENTIFIER",
        value: "abcdefg",
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should tokenize a string beginning with an underscore as an identifier", () => {
    const input = "_abcdefg";
    const result = [
      {
        type: "IDENTIFIER",
        value: "_abcdefg",
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should tokenize a string beginning with a dollar sign as an identifier", () => {
    const input = "$abcdefg";
    const result = [
      {
        type: "IDENTIFIER",
        value: "$abcdefg",
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should tokenize a string starting with a valid beginning character and containing valid special characters as an identifier", () => {
    const input = "_-$%&!?*+/\\>^<";
    const result = [
      {
        type: "IDENTIFIER",
        value: "_-$%&!?*+/\\>^<",
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should throw an error when an identifier contains invalid characters", () => {
    expect(() => {
      tokenize("_:");
    }).toThrow();
  });

  it("Should throw an error when an identifier starts with a number", () => {
    expect(() => {
      tokenize("12abc");
    }).toThrow();
  });

  it("Should throw an error when an identifier starts with a valid special character that's not a letter, dollar sign, or underscore", () => {
    expect(() => {
      tokenize("^abc");
    }).toThrow();
  });

  it("Should correctly tokenize a string literal", () => {
    const input = '"This is a string"';
    const result = [
      {
        type: "STRING",
        value: "This is a string",
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize the next token after a string literal", () => {
    const input = '"A string" 3.14';
    const result = [
      { type: "STRING", value: "A string" },
      { type: "FLOAT", value: 3.14 },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a boolean literal", () => {
    const input1 = "false";
    const result1 = [{ type: "BOOLEAN", value: false }];
    const input2 = "true";
    const result2 = [{ type: "BOOLEAN", value: true }];

    expect(tokenize(input1)).toEqual(result1);
    expect(tokenize(input2)).toEqual(result2);
  });

  it("Should correctly tokenize consecutive (not nested) expressions", () => {
    const input = `
      "Hello"
      true
      (add 2 3)
    `;

    const result = [
      { type: "STRING", value: "Hello" },
      { type: "BOOLEAN", value: true },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "add" },
      { type: "INTEGER", value: 2 },
      { type: "INTEGER", value: 3 },
      { type: "PAREN", value: ")" },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a define expression", () => {
    const input = "(define x 3)";

    const result = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "define" },
      { type: "IDENTIFIER", value: "x" },
      { type: "INTEGER", value: 3 },
      { type: "PAREN", value: ")" },
    ];

    expect(tokenize(input)).toEqual(result);
  });
});
