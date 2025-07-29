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

      // Zoom + rotate logo
      $(".logo-container").addClass("scrolled");

      // After zoom animation, hide logo and show text
      setTimeout(function () {
        $(".logo-container").css("display", "none");
        $(".next-section").addClass("show");
      }, 2000);
    }

    // 🔁 Reverse animation when user scrolls back to top
    if (scrollTop <= 50 && animationTriggered) {
      animationTriggered = false;

      // Reset everything
      $(".logo-container")
        .removeClass("scrolled")
        .css("display", "flex"); // show logo again

      // Small delay to make it fade in again smoothly
      setTimeout(function () {
        $(".logo-container").addClass("visible");
      }, 50);

      $(".next-section").removeClass("show");
    }
  });
});
