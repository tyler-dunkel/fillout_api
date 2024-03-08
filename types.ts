// Used to type the Express REQ query object
// https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript
export interface RequestParams {
  formId: string;
}

export interface RequestBody {}

export interface ResponseBody {}

export interface RequestQuery {
  filters?: string;
  limit?: string;
  afterDate?: string;
  beforeDate?: string;
  offset?: string;
  status?: string;
  includeEditLink?: boolean;
  sort?: string;
}

export type filter = {
  id: string;
  condition: string;
  value: string | number;
};

export type FilloutApiResponse = {
  responses: FilloutSubmissionResponse[];
  totalResponses: number;
  pageCount: number;
};

export type FilloutSubmissionResponse = {
  questions: FilloutResponseQuestion[];
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  // These types below are based on the examples here: https://www.fillout.com/help/fillout-rest-api#220e499f2dba45cfaed5d38abf58e79a
  calculations?: calculation[];
  urlParameters?: urlParameter[];
  quiz?: { score?: number; maxScore?: number };
  documents?: any[]; // Could not find an example of this type
};

export type FilloutResponseQuestion = {
  id: string;
  name: string;
  type: string;
  value: string | number;
};

export type calculation = {
  id: string;
  name: string;
  type: string;
};

export type urlParameter = {
  id: string;
  name: string;
};
