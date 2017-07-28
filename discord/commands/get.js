const { Command } = require('discord-akairo');
const RcDbAccess = require("../lib/RcDbAccess");
const DiscordTable = require('../lib/DiscordTable');
const DiscordEmbed = require('../lib/DiscordEmbed');

function exec(message, args) {
    let db = new RcDbAccess(message.guild.id);
    db.GetFromId(args.id)
        .then(data => DiscordTable.ShowDetailed(message.channel, data));
}

module.exports = new Command('get', exec, {
    aliases: ['get'],
    args: [
        { id: 'id' }
    ]
});