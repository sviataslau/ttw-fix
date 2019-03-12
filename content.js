$(document).ready(function () {    
    var domFrame = document.getElementById('frame');
    domFrame.onload = function() {};
    domFrame.removeAttribute('onload');
    var withoutListeners = domFrame.cloneNode(true);
    domFrame.parentNode.replaceChild(withoutListeners, domFrame);
    domFrame = document.getElementById('frame');
    console.log('buggy onload cleared');
    
    // these two functions copied from TTW code since chrome extensions can't access page's JS
    function createCookieFixed(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    function resizeIframeFixed(obj) {
        var url = document.getElementById("frame").contentWindow.location.href.replace('/forum/', '/forums/');
        var newHeight = obj.contentWindow.document.body.scrollHeight + 'px';
        console.log(newHeight);
        obj.style.height = newHeight;
        history.pushState(null, null, url);
        createCookieFixed('query_url', url, 1);
    }
    
    domFrame.onload = function () {
        var timeoutMs = 1000;
        console.log('will resize in ' + timeoutMs + 'ms');
        setTimeout(function () {
            console.log('resized correctly');
            resizeIframeFixed(domFrame);
            window.scrollTo(0, 0);
        }, timeoutMs);
    };
    console.log('fixed onload created');
});
