require('dotenv').config();
const { expect } = require("chai");

const { Given, When, Then, BeforeAll, AfterAll } = require("cucumber");

const Weather = require('../lib/weather')

let _weather;

BeforeAll(function () {
	_weather = new Weather();
});

AfterAll(async function () {
  await _weather.generateReport();
});

Given('I like to holiday in {string}', async function (city) {
	_weather = new Weather();
	await _weather.getCoordViaCityAndCountry(city);
});

Given('I only like to holiday on {string}', async function (day) {
	await _weather.setDay(day);
	expect(day).to.be.a('string');
});

When('I look up the weather forecast', async function () {
	await _weather.getEndpointForWeatherByDayAndCord();
	await _weather.parseEndpoint();
});

Then('I receive the weather forecast', async function () {
	const status = await _weather.serveRequest();
	expect(status).to.equal(200);
});

// Assuming that we are only interested for this week
Then('The temperature is warmer than {int} degrees', async function (degree) {
	const minTemp = await _weather.getMinTemperatureOnDay();
	expect(minTemp).to.gt(degree);
});