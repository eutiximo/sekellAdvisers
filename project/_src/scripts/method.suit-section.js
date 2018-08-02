function suitSection() {
    var Elems = $('[suit], .suit');
    
    Elems.each(function (index, elem) {
        var getSetHeight = $(elem).attr('data-height') || $g.wh;
        setHeight(elem, getSetHeight);
        responsive(elem);
    });
    
    function responsive(elem) {
        $(window).on('resize', function () {
            setHeight(elem, window.innerHeight);
        });
    }
    
    function setHeight(elem, height) {
        $(elem).css('height', typeof height === 'number' ? height + 'px' : height);
    }
}