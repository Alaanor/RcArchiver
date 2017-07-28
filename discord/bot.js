const { AkairoClient } = require('discord-akairo');
const pckgJson = require('../package.json');

const client = new AkairoClient({
    ownerID: "213397906571395072",
    prefix: '!',
    commandDirectory: __dirname + '/commands/',
    listenerDirectory: __dirname + '/listeners/'
});

if(pckgJson.dev){
    client.login('MzQwMjUxNzAyMzI4Mjk1NDI1.DFvz_A.lWBwJrsuTMY62vkJdvIo86A6DhA');
} else {
    client.login('MzMyMjExNzc1Mjk2NjM0ODgw.DD62GQ.xultA_CU4RxbXQ2BOgPPNfiWonM');
}
