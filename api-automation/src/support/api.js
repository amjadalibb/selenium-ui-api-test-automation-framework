const axios = require('axios');

const requestApi = async function (api) {
    if(api.method === 'get') {
        return await axios.get(api.baseUrl + api.endPoint);
    } else
        return undefined;
}

module.exports = { requestApi }