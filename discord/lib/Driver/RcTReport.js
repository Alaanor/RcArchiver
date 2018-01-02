const IRcDriver = require('./IRcDriver');
const moment = require('moment');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class RcTReport extends IRcDriver {

    static get pattern() {
        return /(http[s]*:\/\/(?:www\.)?t-reports\.net\/rcs\/([0-9a-zA-Z]*)\.png|http[s]*:\/\/(?:www\.)?t-reports\.net\/report\/([0-9a-zA-Z]*))/gm;
    }

    static GetLink(msg){
        let m;
        const regex = RcTReport.pattern;
        let result = [];

        while ((m = regex.exec(msg)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            m.forEach((match, groupIndex) => {
                if( ([2,3].includes(groupIndex) && match !== undefined)){
                    result.push(match);
                }
            });
        }

        return result.map(function(id){
            return `http://t-reports.net/report/${id}`;
        })[0];
    }

    static LinkToImg(link){
        let m;
        const regex = RcTReport.pattern;
        let result = [];

        while ((m = regex.exec(link)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            m.forEach((match, groupIndex) => {
                if( ([2,3].includes(groupIndex) && match !== undefined)){
                    result.push(match);
                }
            });
        }

        return result.map(function(id){
            return `http://t-reports.net/rcs/${id}.png`;
        })[0];
    }

    static GetRcData(msg){
        let link = RcTReport.GetLink(msg);
        if(link === undefined) return;

        return Promise
            .resolve(JSDOM.fromURL(link))
            .then(dom => dom.window.document)
            .then(document => {
                let jsonrc = document.querySelector("#jsonrc");
                if(jsonrc === undefined)
                    throw new Error();
                return jsonrc.textContent;
            })
            .then(data => {
                data = JSON.parse(data);

                let parsePlayer = data => {
                    let d = /\[(.*)] (.*)/g
                        .exec(data[0])
                        .filter((match, groupIndex) => [1, 2].includes(groupIndex));

                    return {
                        player: d[1],
                        ally: d[0],
                        village: data[1]
                    };
                };

                return new TRc(
                    moment(data["envoye"], "DD.MM.YY, HH:mm:ss").format("X"),
                    parsePlayer(data["attaquants"][0]),
                    parsePlayer(data["defenseurs"][0]),
                    link,
                    this.LinkToImg(link)
                );
            })
            .catch(err => TRc.State.Error);
    }
}

module.exports = RcTReport;
