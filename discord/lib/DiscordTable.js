const TRc = require('../lib/TRc');
const DiscordEmbedUtils = require("../lib/DiscordEmbed");

class DiscordShowTable {
    static Show(channel, data){
        if(data === undefined){
            DiscordEmbedUtils.showSimple(channel, 0xCC0000, "Chelou, j'ai une erreur de mon coter");
        }

        data = TRc.RCfying(data);
        data = data.sort((a, b) => a['dateRc'] - b['dateRc']);

        if(data.length === 0){
            DiscordEmbedUtils.showSimple(channel, 0xCC0000, "Aucun RC trouver");
        } else {
            DiscordEmbedUtils.ShowMultipleTRc(channel, 0x6DC066, data);
        }
    }
}

module.exports = DiscordShowTable;