$(document).ready(function() {
    var $window = $(window);
    function checkWidth() {
        window.windowWidthSize = $window.width();
        window.windowHeightSize = $window.height();
        $("#divJumbo").width($window.width());
        $("#divJumbo").height($window.height()-50);
        $("#imgJumbo").width($window.width());
        $("#imgJumbo").height($window.height()-50);
    }
    checkWidth();
    $(window).resize(checkWidth);
});