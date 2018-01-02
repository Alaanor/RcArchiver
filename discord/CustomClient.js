const path = require('path');
const sqlite = require('sqlite');
const {AkairoClient, SQLiteProvider} = require('discord-akairo');

class CustomClient extends AkairoClient {

    //noinspection JSUnusedGlobalSymbols
    constructor(param) {
        param.prefix = message => {
            if (message.guild)
                return this.settings.get(message.guild.id, 'prefix', '!');
            return '!';
        };

        super(param);

        const db = sqlite.open(path.join(__dirname + '/data/', 'db.sqlite'))
            .then(d => d.run('CREATE TABLE IF NOT EXISTS guilds (id TEXT NOT NULL UNIQUE, settings TEXT)').then(() => d));
        this.settings = new SQLiteProvider(db, 'guilds', {dataColumn: 'settings'});
    }

    login(token) {
        return this.settings
            .init()
            .then(() => super.login(token))
    }

    async start(token) {
        await this.settings.init();
        await this.login(token);
    }
}

module.exports = CustomClient;