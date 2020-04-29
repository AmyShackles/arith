const stdlib = require("./stdlib");
const {
  createEnv,
  setEnv,
  lookup,
  getValue,
  setValue,
  defVar,
  getIdentifier,
} = require("./environment");

const environment = setEnv(stdlib);

const define = (node, env = environment) => {
  return defVar(node.name, evaluate(node.value, env), env);
};

const apply = (node, env = environment) => {
  const fn = getValue(node, env);
  const name = fn.name || node.name;

  const args = node.arguments.map((a, i) => evaluate(a, env));
  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }

  return fn(...args);
};

const applyKeyword = (node, env = environment) => {
  const name = `${node.name}Expr`;

  return apply(
    {
      ...node,
      name,
    },
    env,
  );
};

const makeLambda = (node, env = environment) => {
  const lambda = (...args) => {
    const names = node.params;
    const scope = createEnv(env);
    if (names && names.length) {
      names.forEach((n, i) => {
        defVar(n.name, args[i], scope);
      });
    }
    return evaluate(node.body, scope);
  };
  return lambda;
};

const evaluate = (node, env = environment) => {
  switch (node.type) {
    case "Identifier":
      return getValue(node, env);

    case "KeywordExpression":
      return applyKeyword(node, env);

    case "CallExpression":
      return apply(node, env);

    case "DefinitionExpression":
      return define(node, env);

    case "LambdaExpression":
      return makeLambda(node, env);
  }

  if (node.value) {
    return node.value;
  } else if (node.value === 0) {
    return 0;
  } else if (node.value === false) {
    return false;
  } else {
    throw new TypeError(`${node.type} is invalid`);
  }
};

const evaluateProgram = (prog) => {
  let i = 0;
  let val;
  while (i < prog.body.length) {
    if (prog.body[i]) {
      val = evaluate(prog.body[i]);
    }
    i += 1;
  }

  return val;
};

module.exports = { evaluate, evaluateProgram };

console.log(
  evaluateProgram({
    type: "Program",
    body: [
      {
        type: "DefinitionExpression",
        name: "add2",
        value: {
          type: "LambdaExpression",
          params: [
            { type: "FunctionParameter", name: "x" },
            { type: "FunctionParameter", name: "y" },
          ],
          body: {
            type: "CallExpression",
            name: "+",
            arguments: [
              { type: "Identifier", name: "x" },
              { type: "Identifier", name: "y" },
            ],
          },
        },
      },
      {
        type: "CallExpression",
        name: "add2",
        arguments: [
          { type: "IntegerLiteral", value: 2 },
          { type: "IntegerLiteral", value: 3 },
        ],
      },
    ],
  }),
);
