const BaseURL= 'https://api.openweathermap.org/data/2.5/onecall';

const endPoints = {
	dailyViaCoord: {
		endpoint: '?lat={LAT}&lon={LON}&exclude={EXCLUDE}&appid={APIKEY}&units=metric',
		method: 'get'
	}
}

module.exports = { BaseURL, endPoints };