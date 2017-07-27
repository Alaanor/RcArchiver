module.exports = {
    showSimple(channel, color, message) {
        channel.send({ embed: {
            color: color,
            description: message
        }});
    },
    showField (channel, color, title, value) {
        channel.send({ embed: {
            color: color,
            fields: [{name: title, value: value}]
        }});
    },
    showFields(channel, color, fields) {
        channel.send({ embed: {
            color: color,
            fields: fields
        }});
    },
    ShowMultipleTRc(channel, color, rcs){
        let showNote = (rc) => {
            if(rc.getNote() !== "")
                return `\nNote: ${rc.getNote()}`;
            return "";
        };

        channel.send({ embed: {
            color: color,
            fields: rcs.map(rc => {
                return {
                    name: `${rc.getIcon()} ${rc.getQuickName()} (${rc.getId()})`,
                    value: `${rc.getUrl()}${showNote(rc)}`
                };
            })
        }});
    }
};