const faker = require('faker');

const name = function () {
    return faker.name.findName();
}

module.exports = {
    name
};