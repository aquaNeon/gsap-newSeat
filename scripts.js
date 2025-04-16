document.addEventListener("DOMContentLoaded", () => {
    // Define background SVGs
    const backgroundSVGClasses = [
      "sticky_program_svg1",
      "sticky_program_svg2",
      "engage_svg1",
      "engage_svg2",
      "tools_svg",
    ];
  
    // Main timeline
    const tl = gsap.timeline();
  
    // Pre-set the underline path to hidden
    gsap.set(".hero_main_underline path", {
      opacity: 0,
    });
  
    // Hero animations
    tl.from(".hero_main_header", { opacity: 0, y: "6rem", duration: 1 })
      .from(
        ".hero_main_subheader",
        { opacity: 0, y: "6rem", duration: 1 },
        "-=0.5"
      )
      .from(".hero_main_request_wrapper", { opacity: 0, duration: 1 }, "-=0.5")
  
      .add(() => {
        const wrapper = document.querySelector(".hero_main_underline");
        const path = wrapper?.querySelector("path");
  
        if (wrapper && path) {
          const length = path.getTotalLength();
  
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
  
          gsap.to(path, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          });
        }
      }, "-=0.5");
  
    // Reset animations for all paths before start
    gsap.killTweensOf("svg path");
  
    // Slow animation on BG SVGs
    backgroundSVGClasses.forEach((className) => {
      // Select each background SVG by its class
      const svgElements = document.querySelectorAll(`.${className}`);
  
      svgElements.forEach((svg) => {
        // Find all paths in this SVG
        const paths = svg.querySelectorAll("path");
  
        paths.forEach((path) => {
          try {
            // Don't proceed if getTotalLength is not available
            if (!path.getTotalLength) return;
  
            const length = path.getTotalLength();
            const isReversed = path.getAttribute("data-reverse") === "true";
  
            // Reset the paths initial state
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: isReversed ? 0 : length,
            });
  
            // Animation
            gsap.to(path, {
              strokeDashoffset: isReversed ? -length : 0,
              duration: 4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: svg.closest("div") || svg,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
  
            // Mark path as animated
            path.setAttribute("data-animated", "true");
          } catch (e) {
            console.error(`Error with ${className} path:`, e);
          }
        });
      });
    });
  
    // Handle all remaining SVG paths (fast animation) excluding the ones animated above
    document
      .querySelectorAll("svg path:not([data-animated='true'])")
      .forEach((path) => {
        try {
          // Skip the hero underline path
          if (path.closest(".hero_main_underline")) {
            return;
          }
  
          // Skip if getTotalLength is not available
          if (!path.getTotalLength) return;
  
          const length = path.getTotalLength();
          const isReversed = path.getAttribute("data-reverse") === "true";
  
          // Reset initial state
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: isReversed ? 0 : length,
          });
  
          // Animation #2
          gsap.to(path, {
            strokeDashoffset: isReversed ? -length : 0,
            duration: 1.2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: path.closest("div") || path,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        } catch (e) {
          console.error("Error with non-background path:", e);
        }
      });
  
    gsap.from(".memoji_item", {
      scale: 0,
      stagger: { amount: 0.25, from: "center" },
      duration: 0.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".header_memojis_wrapper",
        start: "top 80%",
        toggleActions: "play none none none",
        once: true, 
      },
    });
  
    // Refresh ScrollTrigger to make sure all triggers are registered
    ScrollTrigger.refresh();
  });
  
  // Animate fake cursor groups
  for (let i = 1; i <= 4; i++) {
    const el = `.engagement_hiver_${i}`;
  
    gsap.to(el, {
      y: "-=5",
      scale: 1.04,
      duration: 1 + Math.random() * 0.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: Math.random() * 0.5,
    });
  }
  
  gsap.to(".arrow_pink, .arrow_orange, .arrow_blue, .arrow_yellow", {
    rotation: 5,
    duration: 1.2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  
  gsap.from(".tools_visual_icons_wrapper > *", {
    scale: 0,
    stagger: { amount: 0.5, from: "random" },
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".tools_visual_icons_wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true,
    },
  });
  
  // Stars Animation
  document.addEventListener("DOMContentLoaded", () => {
    const starsWrapper = document.querySelector(".stars_wrapper"); //
  
    if (starsWrapper) {
      // Get all star elements
      const stars = starsWrapper.querySelectorAll(".stars");
  
      // Random initial state for each star
      stars.forEach((star) => {
        // Random initial opacity
        gsap.set(star, {
          opacity: 0.3 + Math.random() * 0.7,
          scale: 0.8 + Math.random() * 0.4,
        });
  
        // Create random twinkling animation
        gsap.to(star, {
          opacity: 0.2 + Math.random() * 0.5,
          scale: 0.7 + Math.random() * 0.3,
          duration: 1 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 3,
        });
  
        // Subtle floating motion
        gsap.to(star, {
          y: `-=${3 + Math.random() * 7}`,
          x: `${Math.random() > 0.5 ? "+" : "-"}=${1 + Math.random() * 3}`,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });
    }
  });
  