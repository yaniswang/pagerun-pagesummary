pagerun.newTask('pagesummary', function(){
    var task = this;
    var doc = document;
    var win = window;

    var startTime, readyTime, readyDomCount;

    startTime = (new Date()).getTime();

    DOMContentLoaded = function() {
        if (doc.addEventListener) {
            doc.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            readyTriggered();
        } else if (doc.readyState === "complete") {
            doc.detachEvent("onreadystatechange", DOMContentLoaded);
            readyTriggered();
        }
    }
    var isReady = false;

    function readyTriggered() {
        if (isReady === false) {
            isReady = true;
            readyTime = (new Date()).getTime() - startTime;
            readyDomCount = document.getElementsByTagName('*').length;
        }
    }

    function loadTriggered() {
        var headerTime = pagesummaryHeaderEndTime - startTime;
        var footerTime = pagesummaryFooterEndTime - startTime;
        var loadTime = (new Date()).getTime() - startTime;
        task.info({
            'url': location.href,
            'headerTime': headerTime,
            'footerTime': footerTime,
            'readyTime': readyTime,
            'readyDomCount': readyDomCount,
            'loadTime': loadTime,
            'loadDomCount': document.getElementsByTagName('*').length
        });
        task.end();
    }
    if (doc.addEventListener) {
        doc.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
        win.addEventListener("load", readyTriggered, false);
        win.addEventListener("load", loadTriggered, false);
    } else {
        doc.attachEvent("onreadystatechange", DOMContentLoaded);
        win.attachEvent("onload", readyTriggered);
        win.attachEvent("onload", loadTriggered);
        var top = false;
        try {
            top = win.frameElement == null && doc.documentElement;
        } catch(e) {}
        if ( top && top.doScroll ) {
            (function doScrollCheck() {
                if ( !isReady ) {
                    try {
                        top.doScroll("left");
                    } catch(e) {
                        return setTimeout( doScrollCheck, 50 );
                    }
                    DOMContentLoaded();
                }
            })();
        }
    }
});