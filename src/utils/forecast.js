const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ba02a6bef2d2b210677f9f7a31d30ab4&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to forecast service", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try a different location.", undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
