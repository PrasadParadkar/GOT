$(document).ready(function() {
    var $window = $(window);
    function checkWidth() {
        window.windowWidthSize = $window.width();
        window.windowHeightSize = $window.height();
    }
    checkWidth();
    $(window).resize(checkWidth);
});