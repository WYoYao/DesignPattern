
L.module(['lib/event', 'lib/dom'], function (event, dom) {
    event.on('demo', 'click', function () {
        dom.html('demo', 'successs');
    })
})