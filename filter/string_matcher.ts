import { filter } from "../types";

export default class StringMatcher {
  constructor() {}

  operators: { [key: string]: (x: string, y: string) => boolean } = {
    equals: (x, y) => x === y,
    does_not_equal: (x, y) => x !== y,
    // NOTE: requirements were ambiguous here, used string length to determine gt/lt
    greater_than: (x, y) => x.length > y.length,
    less_than: (x, y) => x.length < y.length,
  };

  match(item: any, { condition, value }: filter): boolean {
    return this.operators[condition]?.(item, String(value));
  }
}
