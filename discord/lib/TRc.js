const Enum = require('es6-enum');
const State = Enum("Error", "None", "NotSupportedDriver");

class TRc {

    static get State() { return State; }

    constructor(date, from, to, url, img){
        this.data = {
            dateAdd: Date.now(),
            dateRc: date,
            from: from,
            to: to,
            url: url,
            img: img
        }
    }

    getUrl(){
        return this.data.url;
    }

    getData(){
        return this.data;
    }

    getQuickName(){
        return `[${this.data.from.ally}] ${this.data.from.player}, ` +
               `[${this.data.to.ally}] ${this.data.to.player}`;
    }
}

module.exports = TRc;