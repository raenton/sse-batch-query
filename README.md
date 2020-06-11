# JSON to MySQL Client Interface

This was an experiment using SSE (Server Sent Events). When you submit a query from a client, the query will be added to a queue and executed in FIFO (First In First Out) order.

The client will not wait upon the request. It posts the query, and the server will handle it when it can. When the server has handled the query, the resulting JSON will be streamed to the client via SSE.

## Prerequisites

You will need Docker and yarn installed on your system.

## How to use

```
docker-compose up -d
yarn start
```

Navigate to http://localhost:1337

You can now run queries on the MySQL database directly from the text box, and recieve the JSON result in your browser.
