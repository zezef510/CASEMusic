
$('.feat-btn').click(function () {
    $('.sub-menu .feat-show').toggleClass("showSort");
    $('.sub-menu .first').toggleClass("rotate");
});
$('.serv-btn').click(function () {
    $(' .sub-menu .serv-show').toggleClass("show1");
    $(' .sub-menu .second').toggleClass("rotate");
});
$('.sub-menu li').click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});

