const {Command} = require('discord-akairo');
const DiscordEmbedUtils = require("../lib/DiscordEmbed");

class prefix extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            category: 'stuff',
            args: [
                {
                    id: 'prefix',
                    default: '!'
                }
            ],
            channelRestriction: 'guild'
        });
    }

    exec(message, args) {
        if (message.author.id !== message.guild.ownerID) {
            DiscordEmbedUtils.showSimple(message.channel, 0xCC0000,
                "T'es pas le boss, wesh, dégage.");
        } else {
            const oldPrefix = this.client.settings.get(message.guild.id, 'prefix', '!');

            return this.client.settings.set(message.guild.id, 'prefix', args.prefix).then(() => {
                DiscordEmbedUtils.showSimple(message.channel, 0x6DC066, `Le prefix a été changer (${oldPrefix} -> ${args.prefix})`);
            });
        }
    }
}

module.exports = prefix;
