const Enum = require('es6-enum');
const State = Enum("Error", "None", "NotSupportedDriver");

class TRc {

    static get State() { return State; }

    constructor(date, from, to, url, img, icon, dateAdd, note, id){
        this.data = {
            dateAdd: dateAdd || Date.now(),
            dateRc: date,
            from: from,
            to: to,
            url: url,
            icon: icon || "",
            img: img,
            note: note,
            id: id || "none"
        }
    }

    getUrl(){
        return this.data.url;
    }

    getId(){
        return this.data.id;
    }

    getIcon(){
        return this.data.icon;
    }

    setIcon(icon){
        this.data.icon = icon;
    }

    getNote(){
        return this.data.note;
    }

    setNote(note){
        this.data.note = note;
    }

    getData(){
        return this.data;
    }

    getQuickName(){
        return `[${this.data.from.ally}] ${this.data.from.player}, ` +
               `[${this.data.to.ally}] ${this.data.to.player}`;
    }

    static RCfying(data) {
        return data.map(d => TRc.FromJson(d));
    }

    static FromJson(json){
        return new TRc(json.dateRc, json.from, json.to,
            json.url, json.img, json.icon, json.dateAdd,
            json.note, json.id);
    }
}

module.exports = TRc;