const { Listener } = require('discord-akairo');

function exec() {
    console.log('I\'m ready!');
}

module.exports = new Listener('ready', exec, {
    emitter: 'client',
    eventName: 'ready'
});