//     if(message.content.startsWith("!help")){
//         message.channel.send(
//             {embed: {
//                 color: 0x3399FF,
//                 fields: [{
//                     name: "!help",
//                     value: "Montre ce message"
//                 }, {
//                     name: "!add <url>",
//                     value: "Analyse un rc depuis t-report ou travian-reports"
//                 }]
//             }}
//         );
//     }

const { AkairoClient } = require('discord-akairo');

const client = new AkairoClient({
    ownerID: "213397906571395072",
    prefix: '!',
    commandDirectory: './commands/',
    listenerDirectory: './listeners/'
});

client.login('MzMyMjExNzc1Mjk2NjM0ODgw.DD62GQ.xultA_CU4RxbXQ2BOgPPNfiWonM');
