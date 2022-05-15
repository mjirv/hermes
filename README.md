# Hermes

## Plain English metrics queries for business users

Hermes lets business users ask questions of your dbt metrics in plain English.

[View live demo](https://hermes-odmf.onrender.com/)

[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Quickstart

1. Copy `example.env` to `.env` and update the environment variables
   - `METRICS_API_URL` must point to a running instance of [Demeter](https://github.com/mjirv/demeter)
   - Reach out to [Michael Irvine](mailto:michael.j.irvine@gmail.com) for Hermes API credentials
2. Run `npm i && npm run dev` to start the server
