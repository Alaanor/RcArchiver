const { Command } = require('discord-akairo');
const RcDbAccess = require("../lib/RcDbAccess");
const DiscordTable = require('../lib/DiscordTable');
const DiscordEmbed = require('../lib/DiscordEmbed');

function exec(message, args) {
    let db = new RcDbAccess(message.guild.id);
    db.GetLast(args.limit, args.skip)
        .then(data => DiscordTable.Show(message, data));
}

module.exports = new Command('last', exec, {
    aliases: ['last'],
    args: [
        { id: 'limit', type: 'integer', default: 5 },
        { id: 'skip', type: 'integer', default: 0}
    ]
});