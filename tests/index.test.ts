import { describe, expect, test } from "@jest/globals";
import { parseFilters, responseFilterer } from "../utils";
import MatcherFactory from "../filter/matcher_factory";
import StringMatcher from "../filter/string_matcher";
import DateMatcher from "../filter/date_matcher";
import NumberMatcher from "../filter/number_matcher";

const fullFixture = {
  responses: [
    {
      submissionId: "ab9959b2-73e8-4994-85b9-56e780b89ce3",
      submissionTime: "2024-02-27T19:37:08.228Z",
      lastUpdatedAt: "2024-02-27T19:37:08.228Z",
      questions: [
        {
          id: "4KC356y4M6W8jHPKx9QfEy",
          name: "Anything else you'd like to share before your call?",
          type: "LongAnswer",
          value: "Nothing much to share yet!",
        },
        {
          id: "bE2Bo4cGUv49cjnqZ4UnkW",
          name: "What is your name?",
          type: "ShortAnswer",
          value: "Johnny",
        },
        {
          id: "dSRAe3hygqVwTpPK69p5td",
          name: "Please select a date to schedule your yearly check-in.",
          type: "DatePicker",
          value: "2024-02-01",
        },
        {
          id: "fFnyxwWa3KV6nBdfBDCHEA",
          name: "How many employees work under you?",
          type: "NumberInput",
          value: 2,
        },
        {
          id: "jB2qDRcXQ8Pjo1kg3jre2J",
          name: "Which department do you work in?",
          type: "MultipleChoice",
          value: "Engineering",
        },
        {
          id: "kc6S6ThWu3cT5PVZkwKUg4",
          name: "What is your email?",
          type: "EmailInput",
          value: "johnny@fillout.com",
        },
      ],
      calculations: [],
      urlParameters: [],
      quiz: {},
      documents: [],
    },
  ],
};
describe("QS filter parsing", () => {
  test("Filters are correctly parsed", () => {
    const fixture = {
      filters:
        '[{"id":"dSRAe3hygqVwTpPK69p5td","condition":"equals","value":"2024-02-01"}]',
    };
    const expected = [
      {
        id: "dSRAe3hygqVwTpPK69p5td",
        condition: "equals",
        value: "2024-02-01",
      },
    ];

    const result = parseFilters(fixture);
    expect(result).toStrictEqual(expected);
  });
  test("URL safe strings are decoded correctly", () => {
    const fixture = {
      filters:
        '[{"id":"dSRAe3hygqVwTpPK69p5td","condition":"equals","value":"2024-02-01"},%20{"id":"4KC356y4M6W8jHPKx9QfEy","condition":"equals","value":"test"}]',
    };

    const expected = [
      {
        id: "dSRAe3hygqVwTpPK69p5td",
        condition: "equals",
        value: "2024-02-01",
      },
      { id: "4KC356y4M6W8jHPKx9QfEy", condition: "equals", value: "test" },
    ];

    const result = parseFilters(fixture);
    expect(result).toStrictEqual(expected);
  });
  test("It should work with no filters", () => {
    const fixture = {};

    const fixtureTwo = {
      filters: "",
    };

    const expected: any[] = [];

    const result = parseFilters(fixture);
    const resultTwo = parseFilters(fixtureTwo);
    expect(result).toStrictEqual(expected);
    expect(resultTwo).toStrictEqual(expected);
  });
});

describe("Matcher Factory", () => {
  test("String Matcher", () => {
    const fixture = {
      filter: {
        id: "dSRAe3hygqVwTpPK69p5td",
        condition: "equals",
        value: "string test",
      },
    };

    const matcher = MatcherFactory(fixture.filter);

    expect(matcher).toBeInstanceOf(StringMatcher);
  });
  test("Date Matcher", () => {
    const fixture = {
      filter: {
        id: "gjrofewoifew",
        condition: "equals",
        value: "2024-02-01",
      },
    };

    const matcher = MatcherFactory(fixture.filter);

    expect(matcher).toBeInstanceOf(DateMatcher);
  });
  test("Number Matcher", () => {
    const fixture = {
      filter: {
        id: "goriogriogf",
        condition: "equals",
        value: 10,
      },
    };

    const matcher = MatcherFactory(fixture.filter);

    expect(matcher).toBeInstanceOf(NumberMatcher);
  });
});

describe("Response Filtering", () => {
  test("Responses are filtered correctly", () => {
    const filterIn = {
      id: "dSRAe3hygqVwTpPK69p5td",
      condition: "equals",
      value: '2024-02-01',
    }

    const filterOut = {
      id: "dSRAe3hygqVwTpPK69p5td",
      condition: "equals",
      value: '1900-02-01',
    }

    const resultIn = responseFilterer([filterIn], fullFixture.responses)
    expect(resultIn).toStrictEqual(fullFixture.responses)

    const resultOut = responseFilterer([filterOut], fullFixture.responses)
    expect(resultOut).toStrictEqual([])

    const resultBoth = responseFilterer([filterIn, filterOut], fullFixture.responses)
    expect(resultBoth).toStrictEqual([])
  });

  test("Bad filters are ingnored", () => {
    const filterOne = {
      id: "123",
      condition: "equals",
      value: '2024-02-01',
    }

    const filterTwo = {
      id: "dSRAe3hygqVwTpPK69p5td",
      condition: "bad_condition",
      value: '1900-02-01',
    }

    const resultIn = responseFilterer([filterOne, filterTwo], fullFixture.responses)
    expect(resultIn).toStrictEqual(fullFixture.responses)
  });
});
