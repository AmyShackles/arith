const { peek, lookahead, pop } = require("./utilities");
const { tokenize } = require("./tokenize");
const {
  isLeftParen,
  isRightParen,
  isKeyword,
} = require("./identifiers");
const { ArithSyntaxError } = require("./errors");

const parse = (tokens) => {
  const parseProgram = (tokens) => {
    const startToken = peek(tokens);
    const endToken = lookahead(tokens, tokens.length - 1);
    const program = {
      type: "Program",
      body: parseBlock(tokens),
      start: {
        line: startToken.line,
        col: startToken.start,
      },
      end: {
        line: endToken.line,
        col: endToken.end,
      },
    };
    return program;
  };

  return parseProgram(tokens);
};

const parseBlock = (tokens) => {
  let body = [];
  while (tokens.length) {
    body.push(parseExpr(tokens));
  }
  return body;
};

parseExpr = (tokens) => {
  const token = pop(tokens);
  if (isLeftParen(token.value)) {
    return maybeCall(tokens);
  }
  return parseAtom(token);
};

const maybeCall = (tokens) => {
  let token = peek(tokens);
  if (token.type === "KEYWORD") {
    return parseKeyword(tokens);
  } else if (token.type === "IDENTIFIER") {
    return parseCall(tokens);
  }
  throw new ArithSyntaxError(
    `Don't know how to parse ${token.value} at line ${token.line}, col ${token.start}`,
  );
};

const parseKeyword = (tokens) => {
  let token = pop(tokens);
  switch (token.value) {
    case "define":
      return parseDefine(tokens);
  }
  throw new ArithSyntaxError(
    `Unknown keyword ${token.value} at line ${token.line} and col ${token.start}`,
  );
};

const parseCall = (tokens) => {
  const callTokens = eatExprTokens(tokens);
  let token = pop(callTokens);
  let endToken = lookahead(callTokens, callTokens.length - 1);
  const call = {
    type: "CallExpression",
    name: token.value,
    arguments: [],
    start: {
      line: token.line,
      col: token.start,
    },
    end: {
      line: endToken.line,
      col: endToken.end,
    },
  };
  while (!isRightParen(peek(callTokens).value)) {
    call.arguments.push(parseExpr(callTokens));
  }
  return call;
};

const parseAtom = (token) => {
  if (isKeyword(token.value)) {
    if (token.value === "true" || token.value === "false") {
      return nodeCreators["BOOLEAN"](token);
    } else if (token.value === "nil") {
      return nodeCreators["NIL"](token);
    }
  } else if (nodeCreators[token.type]) {
    return nodeCreators[token.type](token);
  }
  throw new ArithSyntaxError(
    `Could not parse ${token.value} at line ${token.line}, col ${token.start}`,
  );
};

const eatExprTokens = (tokens, numOfLeft = 1) => {
  let exprTokens = [];
  let lParens = numOfLeft;
  let rParens = 0;

  while (lParens > rParens) {
    token = pop(tokens);
    if (isLeftParen(token.value)) lParens += 1;
    if (isRightParen(token.value)) rParens += 1;
    exprTokens.push(token);
  }

  return exprTokens;
};

const NUMBER = ({ value, line, start, end }) => {
  return createAtomNode("NumericLiteral", value, line, start, end);
};

const STRING = ({ value, line, start, end }) => {
  return createAtomNode("StringLiteral", value, line, start, end);
};

const IDENTIFIER = ({ value, line, start, end }) => {
  return createAtomNode("Identifier", value, line, start, end);
};

const BOOLEAN = ({ value, line, start, end }) => {
  return createAtomNode("BooleanLiteral", value, line, start, end);
};

const NIL = ({ value, line, start, end }) => {
  return createAtomNode("NilLiteral", value, line, start, end);
};

const nodeCreators = { NUMBER, STRING, IDENTIFIER, BOOLEAN, NIL };

const createAtomNode = (type, value, line, start, end) => {
  return {
    type,
    value,
    start: {
      line,
      col: start,
    },
    end: {
      line,
      col: end,
    },
  };
};

module.exports = { parse, parseExpr };
