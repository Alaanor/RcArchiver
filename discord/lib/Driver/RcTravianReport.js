const IRcDriver = require('./IRcDriver');
const moment = require('moment');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const TRc = require("./../TRc");
const cleanUtf8 = strTest = str => str.replace(/([\x09\x0A\x0D\x20-\x7E]|[\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}|\xED[\x80-\x9F][\x80-\xBF]|\xF0[\x90-\xBF][\x80-\xBF]{2}|[\xF1-\xF3][\x80-\xBF]{3}|\xF4[\x80-\x8F][\x80-\xBF]{2})|./g, "$1");

class RcTravianReport extends IRcDriver {

    static get pattern() {
        return /http[s]*:\/\/(?:www\.)?travian-reports\.net\/([a-z]{2})\/.*\/([0-9a-zA-Z]*)\b/gm;
    }

    static GetLink(msg) {
        let m;
        const regex = RcTravianReport.pattern;
        let result = [];

        while ((m = regex.exec(msg)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            if (m[1] !== undefined && m[2] !== undefined) {
                result.push({
                    lang: m[1],
                    id: m[2]
                });
            }
        }

        return result.map(function (link) {
            return `http://travian-reports.net/${link.lang}/report/${link.id}`;
        })[0];
    }

    static LinkToImg(link) {
        let m;
        const regex = RcTravianReport.pattern;
        let result = [];

        while ((m = regex.exec(link)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            if (m[1] !== undefined && m[2] !== undefined) {
                result.push({
                    lang: m[1],
                    id: m[2]
                });
            }
        }

        return result.map(function (link) {
            return `http://travian-reports.net/${link.lang}/img/${link.id}.png`;
        })[0];
    }

    static GetRcData(msg) {
        let link = RcTravianReport.GetLink(msg);
        if (link === undefined) return;

        return Promise
            .resolve(JSDOM.fromURL(link))
            .then(dom => dom.window.document)
            .then(document => {
                if (document.getElementsByClassName("new_green do_lewej") === undefined) {
                    throw new Error();
                }

                let players;

                if (document.querySelector("td.pomarancz[colspan]") === null) {
                    players = Object.values(document.getElementsByClassName("new_green do_lewej"))
                        .map(function (el) {
                            return el.innerHTML;
                        });
                } else {
                    players = [
                        document.querySelector("td.pomarancz[colspan]").innerHTML,
                        document.querySelector("td.zielony[colspan]").innerHTML
                    ]
                }

                let date = document.querySelectorAll("td.do_lewej[colspan='2']");
                return {players: players, date: date}
            })
            .then(data => {
                data.players = Object.values(data.players)
                    .map(html => /\[(.*)] (.*) <span.*span> (.*)/g.exec(html).slice(1, 4));

                data.date = data.date[0].innerHTML;

                let cleanInput = str => decodeURIComponent(escape(cleanUtf8(str)));
                let parsePlayer = data => {
                    return {
                        player: cleanInput(data[1]),
                        ally: cleanInput(data[0]),
                        village: cleanInput(data[2])
                    }
                };

                return new TRc(
                    moment(data.date, "DD.MM.YY, HH:mm:ss").format("X"),
                    parsePlayer(data.players[0]),
                    parsePlayer(data.players[1]),
                    link,
                    this.LinkToImg(link)
                );
            })
            .catch(err => {
                console.log(err);
                return TRc.State.Error;
            });
    }
}

module.exports = RcTravianReport;