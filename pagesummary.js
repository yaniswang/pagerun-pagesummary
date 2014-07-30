var fs = require('fs');

module.exports = function(pagerun){
    pagerun.injectCode('<script src="//pagerun/pagesummary.js"></script>', 'top');
    pagerun.injectCodeBefore('<script>var pagesummaryHeaderEndTime = (new Date()).getTime();</script>', 'header');
    pagerun.injectCodeBefore('<script>var pagesummaryFooterEndTime = (new Date()).getTime();</script>', 'footer');
    pagerun.addRequestMap('pagerun/pagesummary.js', {
        'responseCode': '200',
        'responseHeaders': {
            'Content-Type': 'application/javascript'
        },
        'responseData': fs.readFileSync(__dirname+'/pagesummary-client.js')
    });
};