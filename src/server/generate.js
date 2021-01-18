const { internet, phone, address, lorem } = require('faker');

const database = { users: []};

for (var i = 1; i<= 100; i++) {
  database.users.push({
    id: i,
    name: internet.userName(),
	  email: internet.email(),
	  phonenumber: phone.phoneNumber(),
	  country_code: address.countryCode(),
	  text: lorem.text()
  });
}

console.log(JSON.stringify(database));
