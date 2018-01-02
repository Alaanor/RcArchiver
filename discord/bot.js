const CustomClient = require('./CustomClient');
const pckgJson = require('../package.json');
const token = require('./botToken.json');

const client = new CustomClient({
    ownerID: "213397906571395072",
    prefix: '!',
    commandDirectory: __dirname + '/commands/',
    listenerDirectory: __dirname + '/listeners/'
});

if(pckgJson.dev){
    client.start(token.dev);
} else {
    client.start(token.prod);
}
