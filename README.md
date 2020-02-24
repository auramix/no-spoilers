# No Spoilers
> No Spoilers reliably rates soccer matches based on their general excitement so viewers can decide what's worth their time without having outcomes revealed.

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> You can start by choosing a date and competition to rank. Currently, date ranges are not supported - only a single match date may be ranked at a time.

> The 3rd party API is somewhat unreliable in that competition codes are not the same year-to-year. So although you can search for current match rankings across the provided leagues, searches are only guaranteed to work for the current season.


## API

* > **GET** '/api/fixtures/:comp/:date' - Retrieves ranked matches from the server

## Requirements

> You will need an API key to run this application locally! --> rapidapi.com/api-sports/api/api-football

> You will need install mongoDb in order to use this application, or remove the code that checks for caching on the initial axios request.

## Development

> The code base has considerable amounts of unused styling code from initial iteration which used Styled-Components. Out of curiosity I wanted to refactor to SASS, so that is the reason both are present here.

### Installing Dependencies

From within the root directory: `npm install`


