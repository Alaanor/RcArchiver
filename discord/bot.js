const { AkairoClient } = require('discord-akairo');

const client = new AkairoClient({
    ownerID: "213397906571395072",
    prefix: '!',
    commandDirectory: __dirname + '/commands/',
    listenerDirectory: __dirname + '/listeners/'
});

client.login('MzMyMjExNzc1Mjk2NjM0ODgw.DD62GQ.xultA_CU4RxbXQ2BOgPPNfiWonM');
