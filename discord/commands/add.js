const { Command } = require('discord-akairo');
const RcArchiver = require('../lib/RcArchiver');
const TRc = require("../lib/TRc.js");
const RcDbAccess = require("../lib/RcDbAccess");
const DiscordEmbedUtils = require("../lib/DiscordEmbed");

function exec(message, args) {
    if(args.note.toLowerCase() === "non"){
        args.note = "";
    }

    RcArchiver
        .Analyze(message.guild.id, args.url, args.icon, args.note)
        .then(rc => {
            if(rc === TRc.State.None)
                DiscordEmbedUtils.showSimple(message.channel, 0xCC0000,
                    "Donne moi un vrai lien patate !");
            else if(rc === TRc.State.NotSupportedDriver)
                DiscordEmbedUtils.showSimple(message.channel, 0xCC0000,
                    "Jveux pas de ce site. Peuh !");
            else if(rc === TRc.State.Error)
                DiscordEmbedUtils.showSimple(message.channel, 0xCC0000,
                    "Chelou ton lien, y a rien quand on va sur la page.");
            else
                DiscordEmbedUtils.showField(message.channel, 0x6DC066,
                    "Rc ajouté", `${rc.getIcon()} ${rc.getQuickName()} (${rc.getId()})`);
        });
}

module.exports = new Command('add', exec, {
    aliases: ['add'],
    args: [
        {id: 'url', type: 'url'},
        {id: 'icon', type: 'emoji'},
        {id: 'note', prompt: {
            start: "Tu veux ajouter des notes sur cette entrée ?"+
                "\n - non pour annuler",
            time: 90000
        }}
    ]
});