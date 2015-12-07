(function($) {
    $(window).scroll(function() {
        if($(this).scrollTop() > 1) {
            $('header').addClass('sticky');
            $('header').removeClass('site-header');
            if($(window).width() < 500) {
                $('.site-title').hide();
            }
        } else {
            $('header').removeClass('sticky');
            $('header').addClass('site-header');
            $('.site-title').show();
        }

    })
})(jQuery);
