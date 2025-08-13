// These scripts are set to apply to the Library main HomePage
$(document).ready(function () {

    const windowPathName = window.location.pathname;
    if (windowPathName !== '/') {
        return;
    };


    // LibGuides does not let you set any custom metadata for the HomePage
    // This function is used to set custom metadata
    (function homePageMetaData() {
        const customMeataDesc = document.createElement('meta');
        customMeataDesc.name = 'description';
        customMeataDesc.content = "The Connelly Library at La Salle University provides students and faculty with research tools, digital collections, and academic resources for learning success.";
        document.head.appendChild(customMeataDesc);
    })();


    // This function is used to clean up the hours displayed on the HomePage
    (function homePageGetHours() {
        $('#dyn-hours').empty();

        $('#set-hours').children().clone().appendTo($('#dyn-hours'));

        $('#s-lg-box-33788970-container').remove();
    })();


    // This function is used to fetch the news blog and create the content
    (function homePageGetNews() {
        springshare_widget_config_1501852441072 = { path: 'blogs' };
        !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://lgapi-us.libapps.com/widgets.php?site_id=489&widget_type=12&widget_embed_type=1&output_format=1&widget_title=Blog+Posts&widget_height=250&widget_width=100%25&widget_link_color=2954d1&window_target=2&display_teaser=1&display_post=0&display_images=0&num_results=3&enable_more_results=0&blog_id=689296&config_id=1501852441072"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "s-lg-widget-script-1501852441072");

        const observer = new MutationObserver((mutationsList, observer) => {
            const $newsWidget = $('#s-lg-widget-1501852441072 ul');

            if ($newsWidget.length && $newsWidget.is(':visible')) {

                // Loop through each list item and clone the link
                $('#body-2024-generic #news-announcements ul li').each(function () {

                    const $li = $(this);
                    const $link = $li.find('a').clone();
                    if ($link.length) {
                        //var linkHtml = $link.prop('outerHTML');
                        $link.html("<span class='news-link-text'>Read More </span>").addClass("news-link wrapped");
                        $li.append($link).append("<span class='mask-arrow-fancy wrapped'></span>");

                        $(this).find('.wrapped').wrapAll("<div class='news-link-combo'></div>");

                    };
                });
                observer.disconnect();

                // Change the links on the first news item for La Salle's news and updates page
                if ($('#s-lg-widget-1501852441072 ul li:eq(0) a:eq(0)')[0].innerText === "La Salle News and Updates") {
                    $('#s-lg-widget-1501852441072 ul li:eq(0) a').each(function () {
                        $(this).attr('href', 'https://www.lasalle.edu/news-and-updates/');
                        $(this).attr('target', '_blank');
                    });
                }
            };
        });
        const newsDiv = document.getElementById('news-announcements');
        observer.observe(newsDiv, { childList: true, subtree: true });
    })();


    // This function is used to handle the search box and fade-in the background image
    (function homePageSearchMain() {
        /* globals $: false */
        $.fn.responsiveTabs = function () {
            this.addClass('responsive-tabs');
            this.append($('<span class="glyphicon glyphicon-triangle-bottom"></span>'));
            this.append($('<span class="glyphicon glyphicon-triangle-top"></span>'));

            this.on('click', 'li.active > a, span.glyphicon', function () {
                this.toggleClass('open');
            }.bind(this));

            this.on('click', 'li:not(.active) > a', function () {
                this.removeClass('open');
            }.bind(this));
        };

        $('.nav.nav-tabs').responsiveTabs();

        // Fade-in Background Image when ready
        const homePageImage = "https://d2jv02qf7xgjwx.cloudfront.net/customers/478/images/library-home9.jpg";
        const img = new Image();

        img.src = homePageImage;

        img.onload = () => {
            $('#search-main').addClass('homePageImage');
        };
    })();
});