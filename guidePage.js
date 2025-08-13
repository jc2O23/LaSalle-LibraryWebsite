// These scripts are set to apply across different LibeGuide Pages
$(document).ready(function () {

    // There was previously 6 different templates with different header images for guide pages
    // This script picks a random header image, reduces the templates down to one and only runs on pages with 's-lg-guide-header'
    (function guideHeaderImage() {
        const $guideHeader = $('#s-lg-guide-header')
        if (!$guideHeader) {
            return
        }

        const ranNum = parseInt(Math.floor(Math.random() * 6));
        const imgLink = ["research-header", "library-stacks-top-floor", "library-pc-lab",
            "library-group-shot-a", "library-exterior-steps", "library-stacks"];

        const headerIMG = "https://d2jv02qf7xgjwx.cloudfront.net/customers/478/images/" + imgLink[ranNum] + ".jpg";
        const img = new Image();

        img.src = headerIMG;

        img.onload = () => {
            $guideHeader.addClass(imgLink[ranNum]);
        };
    })()

    // When on smaller devices (<992), the profile image takes up a large section of the top of the page, before the content
    // This script flexes the profile box to after the content on smaller devices and only runs on pages with a profile box
    (function guideFlexLibProfile() {
        const $profileBox = $('#s-lg-guide-tabs #s-lg-col-0')
        if (window.innerWidth > 991 || !$profileBox) {
            return
        }
        else {
            $('#s-lg-guide-tabs #s-lg-col-0').remove()
            $('#s-lg-side-nav-content .row .col-md-9').append($profileBox)
        }
    })()
});