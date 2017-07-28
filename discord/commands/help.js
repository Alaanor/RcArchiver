const { Command } = require('discord-akairo');
const DiscordEmbedUtils = require("../lib/DiscordEmbed");

function exec(message, args) {
    DiscordEmbedUtils.showFields(message.channel, 0x3399FF, [
        {
            name: "!help",
            value: "Montre ce message"
        },
        {
            name: "!add <url> [icon]",
            value: "Analyse un rc depuis t-report ou travian-reports"
        },
        {
            name: "!get <id>",
            value: "Montre un rc précis"
        },
        {
            name: "!search <ally|player|village|note|icon> <regex>",
            value: "Recherche de rc via [regex](https://www.rethinkdb.com/api/javascript/match/)"
        },
        {
            name: "!last [limit] [skip]",
            value: "Montre les derniers rc ajouter"
        },
        {
            name: "!edit <id>",
            value: "Modifie les notes d'une entrée."
        },
        {
            name: "!delete <id>",
            value: "Delete un rc de la db via son id"
        },
        {
            name: "!stats",
            value: "Montre quelques info :D"
        }
    ]);
}

module.exports = new Command('help', exec, {
    aliases: ['help']
});