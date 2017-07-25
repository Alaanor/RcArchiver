module.exports = {
    showSimple(channel, color, message) {
        channel.send({ embed: {
            color: color,
            description: message
        }});
    },
    showFields (channel, color, title, value) {
        channel.send({ embed: {
            color: color,
            fields: [{name: title, value: value}]
        }});
    }
};