require('dotenv').config();

var reporter = require('cucumber-html-reporter');
const cityList = require('../fixtures/city.list.json');
const urls = require('../fixtures/urls');
const { requestApi } = require('../support/api');


class Weather {
	constructor() {
		this.scenario = { api: { baseUrl: urls.BaseURL} };
		this.reporterOptions = {
			name: 'WooliesX Tech Challenge API',
			theme: 'hierarchy',
			jsonFile: './test/report/cucumber_report.json',
			output: './test/report/cucumber_report.html',
			reportSuiteAsScenarios: true,
			scenarioTimestamp: true,
			launchReport: false,
			storeScreenshots: false,
			metadata: {
				"Base URL": urls.BaseURL,
			}
		};
	}

	getDayNo(day) {
		switch(day) {
			case 'Sundays' : return 0;
			case 'Mondays' : return 1;
			case 'Tuesdays' : return 2;
			case 'Wednesdays' : return 3;
			case 'Thursdays' : return 4;
			case 'Fridays' : return 5;
			case 'Saturdays' : return 6;
		}
		return -1;
	}

	async generateReport() {
		setTimeout(async () => {
			this.reporterOptions.launchReport = true;
			await reporter.generate(this.reporterOptions);
		}, 2000)
	};

	parseEndpoint() {
		let exclude = 'current,minutely,hourly,daily';
		exclude = this.scenario.day ? exclude.replace(',daily', '') : exclude;

		this.scenario.api.endPoint = this.scenario.api.endPoint.includes('{APIKEY}') && process.env.APPKEY ? this.scenario.api.endPoint.replace('{APIKEY}', process.env.APPKEY) : this.scenario.api.endPoint;
		this.scenario.api.endPoint = this.scenario.api.endPoint.includes('{LAT}') && this.scenario.cityDetails ? this.scenario.api.endPoint.replace('{LAT}', this.scenario.cityDetails.coord.lat) : this.scenario.api.endPoint;
		this.scenario.api.endPoint = this.scenario.api.endPoint.includes('{LON}') && this.scenario.cityDetails ? this.scenario.api.endPoint.replace('{LON}', this.scenario.cityDetails.coord.lon) : this.scenario.api.endPoint;
		this.scenario.api.endPoint = this.scenario.api.endPoint.includes('{EXCLUDE}') ? this.scenario.api.endPoint.replace('{EXCLUDE}', exclude) : this.scenario.api.endPoint;
	}
	
	getCoordViaCityAndCountry(city) {
		const firstCity = cityList.filter(item => item.name === city);
		// Assuming that it should always take coordinates of first city in search
		this.scenario.cityDetails = firstCity.length > 0 ? firstCity[0] : undefined;
	}

	setDay(day) {
		this.scenario.day = day;
		this.scenario.dayNo = this.getDayNo(day);
	}
	
	getEndpointForWeatherByDayAndCord() {
		this.scenario.api.endPoint = urls.endPoints.dailyViaCoord.endpoint;
		this.scenario.api.method = urls.endPoints.dailyViaCoord.method;
	}
	
	async serveRequest() {
		this.result = await requestApi(this.scenario.api);
		return this.result.status;
	}

	getMinTemperatureOnDay() {
		if(this.result.data && this.result.data.daily && this.result.data.daily.length > 0) {
			const weatherOnDay = this.result.data.daily.filter(item => new Date(item.dt * 1000 ).getDay() === this.scenario.dayNo)
			let minWeather;
			weatherOnDay.forEach(dailyWeather => {
				if(!minWeather || dailyWeather.temp.min < minWeather)
					minWeather = dailyWeather.temp.min;
			})
			return minWeather;
		} else return undefined;
	}
}

module.exports = Weather;
