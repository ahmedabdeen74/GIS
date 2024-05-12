const express = require("express");
const axios = require("axios")
const dotenv = require("dotenv");
const Country = require("./models/country");
dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.get("/schools", async (req, res) => {
  try {
    const city = "ismailia";
    const brought = "ismailiastaduim";
    const category = "schools";
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${city}+${brought}&type=school&key=${process.env.apiKey}`
    );
    res.status(200).json({
      status: "success",
      data: {
        schools: data,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/hospital", async (req, res) => {
  try {
    const city = "ismailia";
    const brought = "ismailiastaduim";
    const category = "hospitals";
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${city}+${brought}&type=restaurant&key=${process.env.apiKey}`
    );
    res.status(200).json({
      status: "success",
      data: {
        hospitals: data,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get all nearest locations from longitude and latitude of client location
app.post("/country", async (req, res) => {
  try {
    const country = await Country.create(req.body);
    return res.status(201).json({
      status: "success",
      data: {
        country,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
//get nearstplaces
app.get("/getNearestLocation", async (req, res) => {
  let maxDistance = req.query.maxDistance || 50000000;

  const nearestPlaces = await Country.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [req.query.long, req.query.lat],
        },
        $maxDistance: maxDistance,
      },
    },
  });

  res.send(nearestPlaces);
});

module.exports = app;
