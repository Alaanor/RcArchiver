const { Command } = require('discord-akairo');
const RcDbAccess = require("../lib/RcDbAccess");
const DiscordEmbed = require("../lib/DiscordEmbed");

async function exec(message, args) {
    let db = new RcDbAccess(message.guild.id);

    DiscordEmbed.showFields(message.channel, 0x3399FF, [
        {
            name: "Nombre de RC",
            value: await db.CountRc()
        }
    ]);
}

module.exports = new Command('stats', exec, {
    aliases: ['stats'],
});