const { Command } = require('discord-akairo');
const RcDbAccess = require("../lib/RcDbAccess");
const DiscordTable = require('../lib/DiscordTable');
const DiscordEmbed = require('../lib/DiscordEmbed');

function exec(message, args) {
    let db = new RcDbAccess(message.guild.id);
    let searchResult;

    switch (args.type){
        case "note":
            searchResult = db.SearchNote(args.value);
            break;

        case "icon":
            searchResult = db.SearchIcon(args.value);
            break;

        case "ally":
        case "player":
        case "village":
            searchResult = db.SearchFromTo(args.type, args.value);
            break;
    }

    searchResult.then(data =>
        DiscordTable.Show(message.channel, data)
    );
}

module.exports = new Command('search', exec, {
    aliases: ['search'],
    args: [
        { id: 'type', type: ['ally', 'player', 'village', 'note', 'icon'] },
        { id: 'value' }
    ]
});