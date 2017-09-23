const dateFormat = require('dateformat');

module.exports = {
    unixToString(timestamp){
        let date = new Date(timestamp);
        return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
    }
};
