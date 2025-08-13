// The scroll-to-top that is the default on the pages has many bugs (Fades in-out, flashes the body of page, etc.)
// This is a custom script fixes the bugs and applys to pages that have the 'scroll-to-top-btn'
$(document).ready(function () {
    const $scrollBtn = $('#scroll-to-top-btn');
    if (!$scrollBtn) {
        return
    }

    $(window).scrollTop() >= 220 ? $scrollBtn.fadeIn('slow') : null;

    $scrollBtn.on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, 500, () => {
            $('body').find('a:focusable:first').focus();
        });
        $(this).css('pointer-events', 'none');
    });

    let scrollBtn_visible = false;
    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= 220 && !scrollBtn_visible) {
            $scrollBtn.fadeIn('slow').css('pointer-events', 'initial');
            scrollBtn_visible = true;
        }
        else if ($(this).scrollTop() <= 219 && scrollBtn_visible) {
            $scrollBtn.fadeOut('slow');
            scrollBtn_visible = false;
        };
    });
});