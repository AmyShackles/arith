const { evaluate } = require("../src/evaluate");

describe("AST Evaluator", () => {
  it("Should return the value of a primitive integer literal", () => {
    const ast = { type: "IntegerLiteral", value: 10 };

    expect(evaluate(ast)).toBe(10);
  });

  it("Should return zero", () => {
    const ast = { type: "IntegerLiteral", value: 0 };

    expect(evaluate(ast)).toBe(0);
  });

  it("Should return the value of a primitive float literal", () => {
    const ast = { type: "FloatLiteral", value: 3.14159 };

    expect(evaluate(ast)).toBe(3.14159);
  });

  it("Should be able to look up identifiers in the environment", () => {
    const ast = { type: "Identifier", name: "PI" };
    expect(evaluate(ast)).toBe(Math.PI);
  });

  it("Should be able to evaluate a single call expression", () => {
    const ast = {
      type: "CallExpression",
      name: "add",
      arguments: [
        { type: "IntegerLiteral", value: 2 },
        { type: "IntegerLiteral", value: 3 },
      ],
    };

    expect(evaluate(ast)).toBe(5);
  });

  it("Should be able to evaluate a call expression with float arguments", () => {
    const ast = {
      type: "CallExpression",
      name: "sub",
      arguments: [
        { type: "FloatLiteral", value: 6.4 },
        { type: "FloatLiteral", value: 3.2 },
      ],
    };

    expect(evaluate(ast)).toBeCloseTo(3.2);
  });

  it("Should be able to evaluate a nested expression", () => {
    const ast = {
      type: "CallExpression",
      name: "add",
      arguments: [
        { type: "IntegerLiteral", value: 2 },
        { type: "IntegerLiteral", value: 3 },
        {
          type: "CallExpression",
          name: "sub",
          arguments: [
            { type: "IntegerLiteral", value: 5 },
            { type: "IntegerLiteral", value: 4 },
          ],
        },
      ],
    };

    expect(evaluate(ast)).toBe(6);
  });

  it("Should be able to evaluate a string literal", () => {
    const ast = {
      type: "StringLiteral",
      value: "Hello",
    };

    expect(evaluate(ast)).toBe("Hello");
  });

  it("Should be able to evaluate a function with a string argument", () => {
    const ast = {
      type: "CallExpression",
      name: "upper",
      arguments: [{ type: "StringLiteral", value: "hello" }],
    };

    expect(evaluate(ast)).toBe("HELLO");
  });

  it("Should correctly evaluate a boolean literal", () => {
    const ast = { type: "BooleanLiteral", value: true };

    expect(evaluate(ast)).toBe(true);
  });
});
