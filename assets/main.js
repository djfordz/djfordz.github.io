(function($) {
    $(window).scroll(function() {
        if($(this).scrollTop() > 1) {
            $('header').addClass('sticky');
            $('header').removeClass('site-header');
        } else {
            $('header').removeClass('sticky');
            $('header').addClass('site-header');
        }
    })
})(jQuery);
