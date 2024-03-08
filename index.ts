import "dotenv/config";
import fs from "fs";
import path from "path";
import express, { Request, Response } from "express";
import cors from "cors";
import { FILLOUT_API_PARAMS, FILLOUT_API_DOMAIN, PORT, FILLOUT_API_KEY } from "./constants";
import { pick, parseFilters, responseFilterer } from "./utils";
import {
  RequestBody,
  RequestParams,
  RequestQuery,
  ResponseBody,
  FilloutApiResponse,
} from "./types";

const app = express();
app.use(cors());
app.listen(PORT, () => {});

app.use(express.static("public"));

app.get(
  "/:formId/filteredResponses",
  async (
    req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
    res: Response
  ) => {
    // First parse the raw query string into usable json
    const { query } = req;
    const filters = parseFilters(query);

    // Next pull the relevant QS params for the FillOut API and use them in our api call
    const params = pick(query, FILLOUT_API_PARAMS);
    const filloutResp: FilloutApiResponse = await (
      await fetch(
        `${FILLOUT_API_DOMAIN}forms/${
          req.params.formId
        }/submissions?${new URLSearchParams(params).toString()}`,
        {
          headers: {
            Authorization: `Bearer ${FILLOUT_API_KEY}`,
          },
        }
      )
    ).json();

    // Now use the filters passed from the REQ to filter the responses from the FillOut API
    const { responses } = filloutResp;
    const filteredResponses = responseFilterer(filters, responses);

    // Last prepare the response and send it back to the requestor (updated the responses and total count)
    res.setHeader("Content-Type", "application/json");
    const result = Object.assign(filloutResp, {
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
    }); // can also do { ...filloutResp, responses: filteredResp}
    res.end(JSON.stringify(result));
  }
);
