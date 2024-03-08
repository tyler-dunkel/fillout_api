import { filter as filterType } from "./types";
import { RequestQuery, FilloutSubmissionResponse } from "./types";
import { ALLOWED_FILTER_CONDITIONS } from "./constants";
import MatcherFactory from "./filter/matcher_factory";

// This works similarly to Lodash's {pick} function. Instead of adding 
// the whole library for one feature, just add our own.
export const pick = (o: { [key: string]: any }, fields: string[]) => {
  return fields.reduce((a: { [key: string]: any }, x: string) => {
    if (o.hasOwnProperty(x)) a[x] = o[x];
    return a;
  }, {});
};

export const parseFilters = (qs: RequestQuery): filterType[] => {
  if (qs?.filters) {
    return JSON.parse(decodeURIComponent(qs.filters));
  }
  return [];
};

// this function is used to filter the responses from the fillout api using an arbitrary # of filters
// We reduce on the number of filters and use the unfiltered responses as the initial value. Each loop of the reduce
// function uses any "not filtered yet" responses as the accumulator which is passed to each filter from the request
// At the end, we will have an array of filtered responses that we can return to the requestor.
export const responseFilterer = (
  filters: filterType[],
  responses: FilloutSubmissionResponse[]
) => {
  return filters.reduce(
    (filtered: FilloutSubmissionResponse[], filter: filterType) => {
      if (ALLOWED_FILTER_CONDITIONS.indexOf(filter.condition) === -1) {
        console.log("Invalid filter detected, ignoring..");
        return filtered;
      }
      return filtered.filter((response: FilloutSubmissionResponse) => {
        let shouldKeep = true;
        const { questions } = response;
        for (const { id, value } of questions) {
          if (filter.id === id) {
            const matcher = MatcherFactory(filter);
            shouldKeep = matcher.match(value, filter);
          }
          if (!shouldKeep) {
            break;
          }
        }
        return shouldKeep;
      });
    },
    responses
  );
};
