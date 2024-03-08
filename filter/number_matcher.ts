import { filter } from "../types";

export default class NumberMatcher {
  constructor() {}

  operators: { [key: string]: (x: number, y: number) => boolean } = {
    equals: (x, y) => x === y,
    does_not_equal: (x, y) => x !== y,
    greater_than: (x, y) => x > y,
    less_than: (x, y) => x < y,
  };

  match(val: any, { condition, value }: filter) {
    return this.operators[condition](val, Number(value));
  }
}

export const isNumber = (num: filter["value"]) => {
  return !isNaN(parseFloat(String(num))) && isFinite(Number(num));
};
