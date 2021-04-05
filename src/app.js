//built in node module for manipulating folder paths
const path = require("path");

//functions that get weather data
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//for template pages
const hbs = require("hbs");

//import express npm package
const express = require("express");

//starts the server
const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//routes

//this renders the template engine instead of the index.html file
// ------------------------------------------
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Henrique Pereira",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Henrique Pereira",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is the help page",
    title: "Help",
    name: "Henrique Pereira",
  });
});
// -------------------------------------------

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        } else {
          return res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
        }
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    message: "Help article not found",
    name: "Henrique Pereira",
    title: "Not found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    message: "Page not found",
    name: "Henrique Pereira",
    title: "Not found",
  });
});

//Necessary to run the server on the machine
app.listen(3003, () => {
  console.log("Server is up on port 3003");
});
