// LibGuides has started to implment changes to some of the web platform
// Some of these newer pages (AtoZ databases page) removed the ability to edit the HTML of the page
// These scripts create buttons for the scroll to top and LibChat 

$(document).ready(function () {

    document.getElementById('s-lib-scroll-top').remove()

    let $newScrollBtn = $('<button/>', { id: 'scroll-to-top-btn', title: 'Back To Top' })

    let $newSVG = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        .attr({
            'aria-hidden': 'true',
            viewBox: '0 0 24 24',
            fill: 'none',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        });

    let $newPoly = $(document.createElementNS('http://www.w3.org/2000/svg', 'polyline'))
        .attr('points', '18 15 12 9 6 15')

    $newSVG.append($newPoly)
    $newScrollBtn.append($newSVG.clone())
    $newScrollBtn.append($newSVG.clone())

    $('body').append($newScrollBtn)

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


    (function loadLibChatButton() {
        const $lsuChatContainer = $('<div/>', { id: 'lsu-chat-modal-float-container' })
        const $lsuChatFloat = $('<div/>', { id: 'lsu-chat-modal-float', role: 'button', 'data-bs-toggle': 'modal', 'data-bs-target': '#lsu-chat-modal' })
        const $lsuChatIcon = $('<i/>', { class: 'fa fa-comments', 'aria-hidden': 'true' })

        $lsuChatFloat.append('Chat ')
        $lsuChatFloat.append($lsuChatIcon)
        $lsuChatContainer.append($lsuChatFloat)

        $('body').append($lsuChatContainer)

    })()
});
