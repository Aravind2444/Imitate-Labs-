// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Fade in logo on load
gsap.to(".logo-container", {
  opacity: 1,
  duration: 1.5,
  ease: "power2.out",
  delay: 0.5
});

// Scroll animation: Zoom + rotate the logo
gsap.to(".logo-container", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true
  },
  scale: 30,
  rotate: 270,
  ease: "power2.inOut"
});

// Text animation: Slide in welcome message
gsap.to(".next-section h1", {
  scrollTrigger: {
    trigger: ".next-section",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  x: 0,
  opacity: 1,
  duration: 1.5,
  ease: "power2.out"
});
