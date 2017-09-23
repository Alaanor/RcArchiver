const TRc = require('../lib/TRc');
const DiscordEmbedUtils = require("../lib/DiscordEmbed");
const Lodash = require('lodash');

class DiscordShowTable {
    static Show(message, data) {
        let channel = message.channel;

        if (data === undefined) {
            DiscordEmbedUtils.showSimple(channel, 0xCC0000, "Chelou, j'ai une erreur de mon coter");
        }

        data = TRc.RCfying(data);
        data = data.sort((a, b) => a['dateRc'] - b['dateRc']);

        if (data.length === 0) {
            DiscordEmbedUtils.showSimple(channel, 0xCC0000, "Aucun RC trouver");
        } else {
            if (data.length <= 10) {
                DiscordEmbedUtils.ShowMultipleTRc(channel, 0x6DC066, data);
            } else {
                message.reply(
                    `Il y a ${data.length} Rc trouvé, tu souhaite vraiment tous les afficher ?` +
                    `\n - \`Oui\` pour tous les afficher` +
                    `\n - \`Chiffre\` pour afficher les x dernière entrée`
                );

                let filter = m => m.author === message.author &&
                    (m.content.toLowerCase() === "oui" || m.content.match("^[0-9]*$") !== null);
                let option = {max: 1, time: 1e3 * 60 * 3, errors: ['time']};

                channel
                    .awaitMessages(filter, option)
                    .then(m => {
                        m = m.first();
                        if(m.content.toLowerCase() === "oui")
                            this.ShowByMultipleChunk(data, channel);
                        else
                            this.ShowByMultipleChunk(data.slice(0, parseInt(m.content)), channel);
                    })
                    .catch(ignored => {});
            }
        }
    }

    static ShowByMultipleChunk(data, channel) {
        const chunkSize = 10;
        Lodash
            .chunk(data, chunkSize)
            .forEach((chunk, index) =>
                DiscordEmbedUtils.ShowMultipleTRc(
                    channel, 0x6DC066,
                    chunk, index + 1,
                    Math.ceil(data.length / chunkSize)
                )
            );
    }

    static ShowDetailed(channel, rc) {
        if (rc === undefined || rc === null) {
            DiscordEmbedUtils.showSimple(channel, 0xCC0000, "Mauvais id, jtrouve rien dans la db :/");
            return;
        }

        DiscordEmbedUtils.ShowOneTRc(channel, 0x6DC066, TRc.FromJson(rc));
    }
}

module.exports = DiscordShowTable;