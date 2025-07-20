$(document).ready(function () {
  // Show logo initially
  setTimeout(function () {
    $(".logo-container").addClass("visible");
  }, 100);

  let animationTriggered = false;

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();

    if (scrollTop > 50 && !animationTriggered) {
      animationTriggered = true;

      // Trigger logo zoom + rotate
      $(".logo-container").addClass("scrolled");

      // After animation ends (2s), show next section
      setTimeout(function () {
        $(".logo-container").css("display", "none"); // hide logo after animation
        $(".next-section").addClass("show");
      }, 2000);
    }
  });
});
