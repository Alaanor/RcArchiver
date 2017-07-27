const { Command } = require('discord-akairo');
const RcDbAccess = require("../lib/RcDbAccess");
const DiscordEmbed = require('../lib/DiscordEmbed');

function exec(message, args) {
    if(args.note.toLowerCase() === "non"){
        DiscordEmbed.showSimple(message.channel, 0xFF7000,
            "Rien n'a été modifier.");
        return;
    }

    if(args.note.toLowerCase() === "néant"){
        args.note = "";
    }

    let db = new RcDbAccess(message.guild.id);
    db.ExistEntry(args.id)
        .then(exist => {
            if(!exist){
                DiscordEmbed.showSimple(message.channel, 0xCC0000,
                    "Ta mal copy&pasta, pas d'entrée avec cette id :(");
            } else {
                db.EditNote(args.id, args.note).then(result => {
                    if(result.replaced !== 0){
                        DiscordEmbed.showSimple(message.channel, 0x6DC066,
                            "Voilà ! c'est mis à jour :)");
                    } else {
                        DiscordEmbed.showSimple(message.channel, 0xCC0000,
                            "Chelou, rien a été update Oo");
                    }
                });
            }
        });
}

module.exports = new Command('edit', exec, {
    aliases: ['edit'],
    args: [
        { id: 'id' },
        { id: 'note' , prompt: {
            start: "Quel sont les nouvelles note que tu aimerais mettre sur cette entrée ?" +
                "\n - non pour annuler" +
                "\n - néant pour rien mettre"
        }}
    ]
});