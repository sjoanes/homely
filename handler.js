const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const AlgoliaClient = require("search/algolia")

const app = express();

const HOMES_TABLE = process.env.HOMES_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

/**
 * Endpoint will search home data based on the user's intent
 *
 * /homes/?query=janest
 * 
 * Response
 * 200 - [
 *    {
 *      "id": 1238,
 *      "address": "529 Clayfield Avenue",
 *      "geolocation": {
 *          "lat": 40.639751,
 *          "lng": -73.778925
 *      },
 *    },
 *    ...
 * ]
 * 
 * 400 - Bad Request (no query param)
 * 
 * 500 - Internal Server Error
 */
app.get("/homes/", async function (req, res) {
  if (typeof req.params.query !== "string") {
    res.status(400).json({ error: '"query" must be a string' });
  }

  try {
    const { items } = await AlgoliaClient().search("address", req.params.query).promise();
    if (items) {
      res.json(items);
    } else {
      res
        .status(404)
        .json({ error: 'Could not find home with provided "homeId"' });
    }
  } catch (error) {
    res.json([]);
  }
});



/**
 * The endpoint allows us to create a new home
 * 
 * Request Body
 * {
 *      "address": "529 Clayfield Avenue",
 *      "geolocation": {
 *          "lat": 40.639751,
 *          "lng": -73.778925
 *      },
 * }
 * 
 * Response Body
 * 201 - {
 *      id: <uuid>,
 *      "address": "529 Clayfield Avenue",
 *      "geolocation": {
 *          "lat": 40.639751,
 *          "lng": -73.778925
 *      },
 * }
 * 
 * 400 - Missing Fields
 * 400 - Expected (string) Got (int)
 * 
 */
app.post("/homes", async function (req, res) {
  const { address, geolocation } = req.body;
  if (typeof geolocation !== "object") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: HOMES_TABLE,
    Item: {
      homeId: homeId,
      address,
    },
  };

  try {
    const { Item } = await dynamoDbClient.put(params).promise();
    await AlgoliaClient.addObjects({...params, id: Item.id}).promise();
    res.json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create home" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
module.exports.app = app;
