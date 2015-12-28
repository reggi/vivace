var faker = require('faker');

module.exports = function() {
  var output = [];

  for (var i = 0; i < 80; i++) {
    output.push({
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      summary: faker.lorem.sentence(),
      avatar: faker.internet.avatar()
    });
  }
  return output;
};
