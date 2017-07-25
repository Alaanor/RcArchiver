const r = require('rethinkdbdash')({db: "RcArchiver"});
const TRc = require("./TRc");
var shortid = require('shortid');

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
}

module.exports = RcDbAccess;