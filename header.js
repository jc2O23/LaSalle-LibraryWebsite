// These scripts are tied to the header on every page
$(document).ready(function () {

    // This loads in an alert if there is one from the blogs guide
    (function headerAlert() {
        // LibGuides Blogs Widget
        springshare_widget_config_1501700474732 = { path: 'blogs' };
        !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://lgapi-us.libapps.com/widgets.php?site_id=489&widget_type=12&widget_embed_type=1&output_format=1&widget_title=Blog+Posts&widget_height=250&widget_width=100%25&widget_link_color=2954d1&window_target=2&display_teaser=1&display_post=1&display_images=0&num_results=5&enable_more_results=0&blog_id=706231&config_id=1501700474732"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "s-lg-widget-script-1501700474732");

        const observer = new MutationObserver((mutationsList, observer) => {
            const $alertWidget = $('#s-lg-widget-1501700474732');

            if ($alertWidget.length) {
                if($("#s-lg-widget-1501700474732 .s-lg-guide-list-info")[0]) return;
                const $alertToggle = $('#alerts #alert-toggle');
                const $alertIcon = $('#alert-toggle i');
                const $alertMsg = $('#alerts #alert-message');

                // Hide the alert during the session if the user clicked
                if (sessionStorage.getItem('alertSeen')) {
                    $alertMsg.hide();
                    $alertIcon.attr('class', 'bi bi-chevron-compact-down');
                    $alertToggle.addClass('toggleShow').removeClass('toggleHide').attr('aria-expanded', false);
                }
                else {
                    $alertToggle.addClass('toggleHide').removeClass('toggleShow');
                    $alertIcon.attr('class', 'bi bi-chevron-compact-up');
                };
                $('#alerts').slideDown("slow");

                let preventToggle = false;

                $alertToggle.off('click keydown').on('click keydown', function (e) {
                    if (e.type !== 'click' && e.key !== 'Enter' && e.key !== ' ') return;
                    if (e.key === ' ') e.preventDefault();
                    if (preventToggle) return;

                    preventToggle = true;
                    $alertMsg.slideToggle();
                    $(this).toggleClass('toggleHide toggleShow');

                    if ($(this).hasClass('toggleHide')) {
                        $alertIcon.attr('class', 'bi bi-chevron-compact-up');
                        sessionStorage.removeItem('alertSeen');
                        $(this).attr('aria-expanded', true);
                    }
                    else {
                        $alertIcon.attr('class', 'bi bi-chevron-compact-down');
                        sessionStorage.setItem('alertSeen', 'true');
                        $(this).attr('aria-expanded', false);

                    }
                    setTimeout(() => {
                        preventToggle = false;
                    }, 500);
                });


                observer.disconnect();
            };
        });

        const alertDiv = document.getElementById('alerts');
        observer.observe(alertDiv, { childList: true, subtree: true });
    })();


    // This handles how the modal reacts on larger/smaller devices
    (function headerModalControl() {
        let collapseBool = false;
        const $menuListHeader = $('.lsu-main-menu-list-group h3');
        const $menuListLink = $('.lsu-main-menu-list-group h3 a');
        const $menuListSubItems = $('.lsu-main-menu-sub-items');

        function modalContentCollapse() {
            var windowWidth = $(window).width();

            if (windowWidth < 992 && collapseBool == false) {
                $menuListLink.prepend('+ ');
                $menuListSubItems.hide();

                $menuListHeader.click(function () {
                    const $this = $(this);
                    $menuListHeader.addClass('pointer-blocked');

                    $this.siblings().slideToggle(250, function () {
                        $menuListHeader.removeClass('pointer-blocked');
                    })

                    let $textType = $this.children().text();
                    $textType = $textType.startsWith('+ ') ? $textType.replace('+ ', '- ') : $textType.replace('- ', '+ ');
                    $this.children().text($textType);
                });
                collapseBool = true;
            }
            else if (windowWidth > 991 && collapseBool == true) {
                $menuListHeader.each(function () {
                    const $this = $(this);
                    $this.children().text($this.text().substring(2));
                });
                $menuListSubItems.show();
                $menuListHeader.off('click');

                collapseBool = false;
            }
        }

        modalContentCollapse();
        $(window).resize(function () {
            modalContentCollapse();
        });
    })();
});