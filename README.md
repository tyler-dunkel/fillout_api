# Fillout API with Filters!

Welcome to the Fillout API example app with filters!

## Introduction

This is an Express application written in Typescript that adds filtering logic on top of an existing Fillout API endpoint. It uses simple NPM scripts and Docker to build and containzer the application. Tests are written for the core functionality using Jest.

You can access the API here: `https://fillout-api-kw40.onrender.com`

### Technologies Used

- Express.js
- TypeScript
- Jest

### Setup Instructions

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`
3. Run in watch (dev) mode using `npm run dev`
4. Run in prod mode using `npm run build && npm run start`

### Docker Build Instructions
1. Run `npm run dockerize`
2. Run `npm run docker:run`
3. visit application at `localhost:3000`

### Testing Instructions
1. Clone this repository to your local machine.
2. Install dependencies using `npm install`
3. Run `npm run test`

### API Endpoint

#### `GET :formId/filteredResponses`

- **Description**: Retrieves filtered responses from the Fillout API.
- **Parameters**:
  - `formId`: The form Id responses to filter by
- **Query Parameters**:
  - `limit(optional)`: the maximum number of responses to retrieve per request. Must be a number between 1 and 150. Default is 150.
  - `afterDate(optional)`: a date string to filter responses submitted after this date
  - `beforeDate(optional)`: a date string to filter responses submitted before this date
  - `offset(optional)`: the starting position from which to fetch the responses. Default is 0.
  - `status(optional)`: pass in_progress to get a list of in-progress (unfinished) submissions. By default, only finished submissions are returned.
  - `includeEditLink (optional)`: pass true to include a link to edit the submission as editLink
  - `sort(optional)`: can be asc or desc, defaults to asc
  - `filters(optional)`: A list of filters for the responses from the Fillout api of the format `[{ id: '...', condition: 'equals | does_not_equal | less_than | greater_than', value: '...'}]`
- **Sample Requests**:
  ```http
  GET {domain}/cLZojxk94ous/filteredResponses?limit=5&sort=asc
  GET {domain}/cLZojxk94ous/filteredResponses?filters=%5B%7B%22id%22%3A%22dSRAe3hygqVwTpPK69p5td%22%2C%22condition%22%3A%22equals%22%2C%22value%22%3A%222024-02-01%22%7D%5D
  GET {domain}/cLZojxk94ous/filteredResponses?filters=%5B%7B%22id%22%3A%22dSRAe3hygqVwTpPK69p5td%22%2C%22condition%22%3A%20%22less_than%22%2C%22value%22%3A%222024-02-03%22%7D%2C%2520%7B%22id%22%3A%224KC356y4M6W8jHPKx9QfEy%22%2C%22condition%22%3A%20%22equals%22%2C%22value%22%3A%22Nothing%20much%20to%20share%20yet!%22%7D%5D
