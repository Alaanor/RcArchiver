const r = require('rethinkdbdash')({db: "RcArchiver"});
const TRc = require("./TRc");
const shortid = require('shortid');

class RcDbAccess {
    constructor(discordServerId){
        r.tableList().contains(discordServerId)
            .do(tableExist =>
                r.branch(
                    tableExist,
                    "ok",
                    r.tableCreate(discordServerId)
                )
            ).run();

        this.table = discordServerId;
    }

    AddEntry(rc){
        if(rc === TRc.State.Error){
            return;
        }

        let data = rc.getData();
        data.id = shortid.generate();

        r.table(this.table).insert(data).run()
            .error(err => console.log(err.message));
        console.log(`[${rc.getUrl()}][db] entry added. (${rc.getQuickName()})`)
    }

    SearchFromTo(type, value) {
        return r.table(this.table).filter(row => r.or(
            row('from')(type).match(value),
            row('to')(type).match(value)
        ));
    }

    SearchNote(value) {
        return r.table(this.table)
            .filter(row => row('note').match(value));
    }

    SearchIcon(value) {
        return r.table(this.table)
            .filter(row => row('icon').match(value.toString()))
    }

    ExistEntry(id) {
        return r.table(this.table).get(id)
            .then(e => e !== null);
    }

    RemoveEntry(id) {
        console.log(`[${id}] entry deleted.`);
        return r.table(this.table).get(id).delete();
    }

    EditNote(id, value) {
        return r.table(this.table).get(id).update({note: value});
    }

    GetLast(limit, skip) {
        return r.table(this.table)
            .orderBy(r.desc('dateAdd'))
            .skip(skip)
            .limit(limit);
    }

    GetFromId(id) {
        return r.table(this.table).get(id);
    }

    CountRc() {
        return r.table(this.table).count();
    }
}

module.exports = RcDbAccess;