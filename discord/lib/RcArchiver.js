const Promise = require("bluebird");
const RcDbAccess = require("./Db/RcDbAccess");
const TRc = require("./TRc");
const RcTravianReport = require('./Driver/RcTravianReport');
const linq = require('linq-es6'); //.asEnumerable()

class RcArchiver {

    constructor(){
        this.driver = [
            RcTravianReport
        ];
    }

    Analyze(guildId, msg, icon){
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
            rc.setNote("");
            db.AddEntry(rc);
            return rc;
        });
    }

}

module.exports = new RcArchiver();