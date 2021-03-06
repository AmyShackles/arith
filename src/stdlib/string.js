const R = require("ramda");
const v = require("voca");
const _String = require("./types/String");
const Decimal = require("./types/Decimal");
const Char = require("./types/Char");
const { all } = require("./utils");
const { list } = require("./list");

// string constructor
function string(value) {
  return new _String(value);
}

// string utilities
function strlen(str) {
  return new Decimal(v.countGraphemes(str));
}

function upper(str) {
  return string(str.toUpperCase());
}

function lower(str) {
  return string(str.toLowerCase());
}

function strAppend(...args) {
  return string(all((a, s) => a + s)(...args));
}

strAppend = R.curryN(2, strAppend);

function strRepeat(num, str) {
  return string(str.repeat(num));
}

strRepeat = R.curry(strRepeat);

function strRef(i, str) {
  if (i > strlen(str) - 1) {
    throw new ReferenceError(
      "Ref out of bounds: string length exceeded",
    );
  }
  return string(str.chars[i]);
}

strRef = R.curry(strRef);

function substring(start, end, str) {
  return string(
    string(
      str.chars.slice(start, end).reduce((s, c) => s + c.value, ""),
    ),
  );
}

substring = R.curry(substring);

function stringFirst(num, str) {
  return substring(0, num, str);
}

stringFirst = R.curry(stringFirst);

function stringLast(num, str) {
  return substring(str.chars.length - num, str.chars.length, str);
}

stringLast = R.curry(stringLast);

function makeString(num, char) {
  return string(char.repeat(num));
}

makeString = R.curry(makeString);

function stringCopy(str) {
  return string(substring(str, 0));
}

function stringTrim(str) {
  return string(str.trim());
}

function stringJoin(sep, ...strs) {
  return string(strs.join(sep));
}

stringJoin = R.curryN(3, stringJoin);

function stringReplace(toReplace, replaceWith, str) {
  return string(str.replace(toReplace, replaceWith));
}

stringReplace = R.curry(stringReplace);

// to list, array, and vector
function stringToList(str) {
  return str.toCharList();
}

function stringToArray(str) {
  return str.toCharArray();
}

function stringToVector(str) {
  return str.toCharVector();
}

// string comparisons
function strEq(str1, str2) {
  return str1.isEq(str2);
}

strEq = R.curry(strEq);

function strLt(str1, str2) {
  return str1 < str2;
}

strLt = R.curry(strLt);

function strLte(str1, str2) {
  return str1 <= str2;
}

strLte = R.curry(strLte);

function strGt(str1, str2) {
  return str1 > str2;
}

strGt = R.curry(strGt);

function strGte(str1, str2) {
  return str1 >= str2;
}

strGte = R.curry(strGte);

// string predicate
function isString(obj) {
  return _String.isString(obj);
}

// additional string utilities
function camelCase(str) {
  return string(v.camelCase(str));
}

function capitalize(str) {
  return string(v.capitalize(str, true));
}

function decapitalize(str) {
  return string(v.decapitalize(str));
}

function lispCase(str) {
  return string(v.kebabCase(str));
}

function snakeCase(str) {
  return string(v.snakeCase(str));
}

function swapCase(str) {
  return string(v.swapCase(str));
}

function titleCase(str) {
  return string(v.titleCase(str));
}

function countWords(str) {
  return new Decimal(v.countWords(str));
}

function escapeHtml(str) {
  return string(v.escapeHtml(str));
}

function escapeRegex(str) {
  return string(v.escapeRegExp(str));
}

function unescapeHtml(str) {
  return string(v.unescapeHtml(str));
}

function stringReverse(str) {
  return string(v.reverseGrapheme(str));
}

function slugify(str) {
  return string(v.slugify(str));
}

function stringInsert(insert, pos, str) {
  return string(v.insert(str, insert, pos));
}

stringInsert = R.curry(stringInsert);

function latinize(str) {
  return string(v.latinise(str));
}

function padleft(length, pad, str) {
  return string(v.padLeft(str, length, pad));
}

padleft = R.curry(padleft);

function padright(length, pad, str) {
  return string(v.padRight(str, length, pad));
}

padright = R.curry(padright);

function wordWrap(width, str) {
  return string(v.wordWrap(str, { width, newLine: "\n" }));
}

wordWrap = R.curry(wordWrap);

function wordWrapWith(width, wrap, str) {
  return string(v.wordWrap(str, { width, newLine: wrap }));
}

wordWrapWith = R.curry(wordWrapWith);

function stringSplitChars(str) {
  return str.toCharList();
}

function stringSplit(sep, str) {
  return list(...v.split(str, sep));
}

stringSplit = R.curry(stringSplit);

function splitWords(str) {
  return list(...v.words(str));
}

function stripHtmlTags(str) {
  return string(v.stripTags(str));
}

// utility predicates
function stringEndsWith(end, str) {
  return v.endsWith(str, end);
}

stringEndsWith = R.curry(stringEndsWith);

function stringContains(search, str) {
  return v.includes(str, search);
}

stringContains = R.curry(stringContains);

function stringIsAlpha(str) {
  return v.isAlpha(str);
}

function stringIsAlphaDigit(str) {
  return v.isAlphaDigit(str);
}

function stringIsBlank(str) {
  return v.isBlank(str);
}

function stringIsDigit(str) {
  return v.isDigit(str);
}

function stringIsEmpty(str) {
  return v.isEmpty(str);
}

function stringIsLowerCase(str) {
  return v.isLowerCase(str);
}

function stringIsUpperCase(str) {
  return v.isUpperCase(str);
}

function stringIsNumeric(str) {
  return v.isNumeric(str);
}

function stringStartsWith(start, str) {
  return v.startsWith(str, start);
}

stringStartsWith = R.curry(stringStartsWith);

module.exports = {
  string,
  "string-length": strlen,
  "string-upcase": upper,
  "string-downcase": lower,
  "string-append": strAppend,
  "string-repeat": strRepeat,
  "string-ref": strRef,
  substring,
  "string-first": stringFirst,
  "string-last": stringLast,
  "make-string": makeString,
  "string-copy": stringCopy,
  "string-trim": stringTrim,
  "string-join": stringJoin,
  "string-replace": stringReplace,
  "string->list": stringToList,
  "string->array": stringToArray,
  "string->vector": stringToVector,
  "string=?": strEq,
  "string<?": strLt,
  "string<=?": strLte,
  "string>?": strGt,
  "string>=?": strGte,
  "string?": isString,
  "string-camelcase": camelCase,
  "string-capitalize": capitalize,
  "string-decapitalize": decapitalize,
  "string-lispcase": lispCase,
  "string-snakecase": snakeCase,
  "string-swapcase": swapCase,
  "string-titlecase": titleCase,
  "count-words": countWords,
  "escape-html": escapeHtml,
  "escape-regex": escapeRegex,
  "unescape-html": unescapeHtml,
  "string-reverse": stringReverse,
  "string-slugify": slugify,
  "string-insert": stringInsert,
  "string-latinize": latinize,
  "string-padleft": padleft,
  "string-padright": padright,
  "word-wrap": wordWrap,
  "word-wrap-with": wordWrapWith,
  "string-split-chars": stringSplitChars,
  "string-split": stringSplit,
  "split-words": splitWords,
  "strip-html-tags": stripHtmlTags,
  "string-ends-with?": stringEndsWith,
  "string-contains?": stringContains,
  "string-alpha?": stringIsAlpha,
  "string-alpha-digit?": stringIsAlphaDigit,
  "string-blank?": stringIsBlank,
  "string-digit?": stringIsDigit,
  "string-empty?": stringIsEmpty,
  "string-lower-case?": stringIsLowerCase,
  "string-upper-case?": stringIsUpperCase,
  "string-numeric?": stringIsNumeric,
  "string-starts-with?": stringStartsWith,
};
