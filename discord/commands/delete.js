const { Command } = require('discord-akairo');
const RcArchiver = require('../lib/RcArchiver');
const TRc = require("../lib/TRc.js");
const RcDbAccess = require("../lib/Db/RcDbAccess");
const DiscordEmbedUtils = require("../lib/DiscordEmbed");

function exec(message, args) {
    let db = new RcDbAccess(message.guild.id);
    db.ExistEntry(args.id)
        .then(exist => {
            if(!exist){
                DiscordEmbedUtils.showSimple(message.channel, 0xCC0000,
                    "Ta mal copy&pasta, pas d'entrée avec cette id :(");
            } else {
                db.RemoveEntry(args.id).then(d => {
                    if(d.deleted !== 0){
                        DiscordEmbedUtils.showSimple(message.channel, 0xFF7000,
                            "Pouf ! c'est delete :)");
                    } else {
                        DiscordEmbedUtils.showSimple(message.channel, 0xCC0000,
                            "Chelou, rien a été delete Oo");
                    }
                });

            }
        });
}

module.exports = new Command('delete', exec, {
    aliases: ['delete'],
    args: [
        {id: 'id'}
    ]
});