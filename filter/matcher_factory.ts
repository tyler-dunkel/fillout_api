import { filter } from "../types";
import StringMatcher from "./string_matcher";
import DateMatcher, { isDate } from "./date_matcher";
import NumberMatcher, { isNumber } from "./number_matcher";

/**
 * Factory function used to create the right kind of matcher class based on what
 * type the {value} of the filter is
 * NOTE: These matchers could obviously be singletons and not need a cache as they are based on types
 * but this design allows for flexibility if we ever need to build matchers specific to ids
 */
const cache: { [key: string]: StringMatcher | DateMatcher | NumberMatcher } =
  {};
export default (filter: filter) => {
  if (cache[filter.id]) return cache[filter.id];
  let type = "string";
  if (isDate(filter.value)) {
    type = "date";
  }
  if (isNumber(filter.value)) {
    type = "number";
  }
  switch (type) {
    case "string":
      cache[filter.id] = new StringMatcher();
      return cache[filter.id];
    case "date":
      cache[filter.id] = new DateMatcher();
      return cache[filter.id];
    case "number":
      cache[filter.id] = new NumberMatcher();
      return cache[filter.id];
    default:
      return new StringMatcher();
  }
};
