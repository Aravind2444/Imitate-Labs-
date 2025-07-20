$(window).on("scroll", function () {
  if ($(window).scrollTop() > 100) {
    $(".logo-container").addClass("scroll-animate");
  } else {
    $(".logo-container").removeClass("scroll-animate");
  }
});
