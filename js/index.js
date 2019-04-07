$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $('.sidebar-link').on('click', function(event){
        event.preventDefault();
        $('.overall-section').each(function(i, section){
            $(section).hide();
        });
        let section = $(this).attr('href');
        $('#'+ section).show();
    });
});
