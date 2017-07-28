const Promise = require("bluebird");
const RcDbAccess = require("./RcDbAccess");
const TRc = require("./TRc");
const moment = require('moment');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const linq = require('linq-es6');

class RcArchiver {

    constructor(){
        this.driver = [
            RcTReport,
            RcTravianReport
        ];
    }

    Analyze(guildId, msg, icon, note){
        let db = new RcDbAccess(guildId);
        let driver = this.driver.asEnumerable()
            .firstOrDefault(d => d.GetLink(msg) !== undefined);

        if(driver === undefined)
            return Promise.resolve(TRc.State.NotSupportedDriver);

        let promise = driver.GetRcData(msg);

        if(promise === undefined)
            return Promise.resolve(TRc.State.None);

        return promise.then(rc => {
            if(rc === TRc.State.Error){
                return rc;
            }

            rc.setIcon(icon.toString());
            rc.setNote(note);
            db.AddEntry(rc);
            return rc;
        });
    }

}

// So fucking useless, but let me mind like if this was an interface.
class IRcDriver {
    static GetRcData(msg){}
    static GetLink(msg){}
}

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

class RcTravianReport extends IRcDriver {

    static get pattern() {
        return /http[s]*:\/\/(?:www\.)?travian-reports\.net\/([a-z]{2})\/.*\/([0-9a-zA-Z]*)\b/gm;
    }

    static GetLink(msg){
        let m;
        const regex = RcTravianReport.pattern;
        let result = [];

        while ((m = regex.exec(msg)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            if(m[1] !== undefined && m[2] !== undefined){
                result.push({
                    lang: m[1],
                    id: m[2]
                });
            }
        }

        return result.map(function(link){
            return `http://travian-reports.net/${link.lang}/report/${link.id}`;
        })[0];
    }

    static LinkToImg(link){
        let m;
        const regex = RcTravianReport.pattern;
        let result = [];

        while ((m = regex.exec(link)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            if(m[1] !== undefined && m[2] !== undefined){
                result.push({
                    lang: m[1],
                    id: m[2]
                });
            }
        }

        return result.map(function(link){
            return `http://travian-reports.net/${link.lang}/img/${link.id}.png`;
        })[0];
    }

    static GetRcData(msg){
        let link = RcTravianReport.GetLink(msg);
        if(link === undefined) return;

        return Promise
            .resolve(JSDOM.fromURL(link))
            .then(dom => dom.window.document)
            .then(document => {
                if(document.getElementsByClassName("new_green do_lewej") === undefined){
                    throw new Error();
                }

                let players;

                if(document.querySelector("td.pomarancz[colspan]") === null){
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
                    .map(html => /\[(.*)] (.*) <span.*span> (.*)/g.exec(html).slice(1,4));

                data.date = data.date[0].innerHTML;

                let parsePlayer = data => {
                    return {
                        player: data[1],
                        ally: data[0],
                        village: data[2]
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
            .catch(err => TRc.State.Error);

    }
}

module.exports = new RcArchiver();