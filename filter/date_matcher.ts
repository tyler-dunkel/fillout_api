import { filter } from "../types";

export default class DateMatcher {
  constructor() {}

  operators: { [key: string]: (x: number, y: number) => boolean } = {
    equals: (x, y) => x === y,
    does_not_equal: (x, y) => x !== y,
    greater_than: (x, y) => x > y,
    less_than: (x, y) => x < y,
  };

  match(val: any, { condition, value }: filter) {
    const d1 = new Date(val).getTime();
    const d2 = new Date(value).getTime();
    return this.operators[condition](d1, d2);
  }
}

export const isDate = (date: filter["value"]) => {
  return !isNaN(Date.parse(date as string));
};
