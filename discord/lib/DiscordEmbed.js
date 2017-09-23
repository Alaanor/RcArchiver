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
    ShowOneTRc(channel, color, rc) {
        let data = rc.getData();
        channel.send({embed: {
            color: color,
            title: `${data.icon} ${data.url}`,
            fields: [
                {
                    name: "Depuis",
                    value: `**[${data.from.ally}] ${data.from.player}** du village **${data.from.village}**`
                },
                {
                    name: "Vers",
                    value: `**[${data.to.ally}] ${data.to.player}** du village **${data.to.village}**`
                },
                {
                    name: "Note",
                    value: data.note || "-"
                }
            ],
            thumbnail: {
                "url": data.img
            },
            image: {
                "url": data.img
            },
        }});
        console.log(data.img);
    },
    ShowMultipleTRc(channel, color, rcs, pageIndex = -1, pageMax = -1){
        let showNote = (rc) => {
            if(rc.getNote() !== "")
                return `\nNote: ${rc.getNote()}`;
            return "";
        };

        let embed = {
            color: color,
            fields: rcs.map(rc => {
                return {
                    name: `${rc.getIcon()} ${rc.getQuickName()} (${rc.getId()})`,
                    value: `${rc.getUrl()}${showNote(rc)}`
                };
            }),
        };

        if(pageIndex !== -1 && pageMax !== -1)
            embed.footer = { text: `Page ${pageIndex}/${pageMax}` };

        channel.send({ embed: embed });
    }
};