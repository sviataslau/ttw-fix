var $frame = $('#frame');

function fix() {
    var height = $(document.body).prop('scrollHeight');
    $frame.height(height);
}

$(document).ready(function () {
    var timeoutMs = 1000;
    $frame.ready(setTimeout(fix, timeoutMs));
});