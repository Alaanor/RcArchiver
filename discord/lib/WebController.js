const nodeCleanup = require('node-cleanup');

class WebController {
    constructor() {
        let phantom = require('phantom');
        this.instance = Promise.resolve(phantom.create([], {
            logLevel: 'warning'
        }));

        nodeCleanup(async (exitCode, signal) => {
            console.log(`[*] ExitCode: ${exitCode}, Signal: ${signal}`);
            console.log(`[*] Shutting down PhantomJs instance.`);
            await this.instance.then(i => i.exit());
        });
    }

    Use(link){
        return this.instance
            .then(instance => instance.createPage())
            .then(async page => {
                console.log(`[${link}][status] opening the page`);
                let status = await page.open(link);
                console.log(`[${link}][status] ${status}`);
                return page;
            });
    }
}

module.exports = new WebController();
