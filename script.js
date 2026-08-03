(function () {
  "use strict";

  // // navbar
  
  // const header = document.getElementById("site-header");
  // const navToggle = document.querySelector(".nav-toggle");
  // const mainNav = document.querySelector(".main-nav");
  // const dropdowns = Array.from(document.querySelectorAll(".has-dropdown"));
  // const dropdownToggles = Array.from(document.querySelectorAll(".dropdown-toggle"));
  



  // function setHeaderState() {
  //   header.classList.toggle("scrolled", window.scrollY > 24);
  // }

  // function closeDropdowns(except) {
  //   dropdowns.forEach((item) => {
  //     if (item !== except) {
  //       item.classList.remove("open");
  //       const button = item.querySelector(".dropdown-toggle");
  //       if (button) button.setAttribute("aria-expanded", "false");
  //     }
  //   });
  // }

  // function closeNavigation(returnFocus) {
  //   header.classList.remove("menu-visible");
  //   document.body.classList.remove("nav-open");
  //   navToggle.setAttribute("aria-expanded", "false");
  //   navToggle.setAttribute("aria-label", "Open navigation");
  //   closeDropdowns();
  //   if (returnFocus) navToggle.focus();
  // }

  // function openNavigation() {
  //   header.classList.add("menu-visible");
  //   document.body.classList.add("nav-open");
  //   navToggle.setAttribute("aria-expanded", "true");
  //   navToggle.setAttribute("aria-label", "Close navigation");
  // }

  // navToggle.addEventListener("click", function () {
  //   const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  //   if (isOpen) closeNavigation(false);
  //   else openNavigation();
  // });

  // dropdownToggles.forEach((button) => {
  //   button.addEventListener("click", function () {
  //     const parent = button.closest(".has-dropdown");
  //     const willOpen = !parent.classList.contains("open");
  //     closeDropdowns(parent);
  //     parent.classList.toggle("open", willOpen);
  //     button.setAttribute("aria-expanded", String(willOpen));
  //   });
  // });

  // window.addEventListener("scroll", setHeaderState, { passive: true });
  // setHeaderState();




  // hero-animation

  const hero = document.getElementById("home");
  const parallaxLayers = Array.from(hero.querySelectorAll(".parallax-layer"));
  const biometricDevice = hero.querySelector(".biometric-device");
  const heroCopy = hero.querySelector(".hero-copy");
  const heroVisual = hero.querySelector(".hero-visual");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let scrollFrameRequested = false;

  function resetPointerParallax() {
    parallaxLayers.forEach((layer) => {
      layer.style.setProperty("--px", "0px");
      layer.style.setProperty("--py", "0px");
    });
    hero.style.setProperty("--grid-x", "0px");
    hero.style.setProperty("--grid-y", "0px");
    biometricDevice.style.setProperty("--scene-rx", "0deg");
    biometricDevice.style.setProperty("--scene-ry", "0deg");
  }

  function updateScrollParallax() {
    scrollFrameRequested = false;
    if (reducedMotion.matches) {
      heroCopy.style.setProperty("--section-parallax-y", "0px");
      heroVisual.style.setProperty("--section-parallax-y", "0px");
      biometricDevice.style.setProperty("--scene-rz", "0deg");
      return;
    }
    const heroHeight = hero.offsetHeight;
    const scrolledThroughHero = Math.max(
      0,
      Math.min(heroHeight, -hero.getBoundingClientRect().top)
    );
    const progress = scrolledThroughHero / heroHeight;
    const enableScrollParallax = window.innerWidth > 1024;
    // Apply the requested parallax multipliers directly, without compensating
    // for the page's own scroll movement. Ease each distance into a maximum
    // travel so the columns do not separate enough to leave a large empty gap.
    const copyUpwardRate = enableScrollParallax ? 1.25 : 0;
    const visualDownwardRate = enableScrollParallax ? 0.35 : 0;
    const copyTravel = enableScrollParallax
      ? 72 * (1 - Math.exp((-scrolledThroughHero * copyUpwardRate) / 72))
      : 0;
    const visualTravel = scrolledThroughHero * visualDownwardRate;
    heroCopy.style.setProperty(
      "--section-parallax-y",
      `${-copyTravel}px`
    );
    heroVisual.style.setProperty(
      "--section-parallax-y",
      `${visualTravel}px`
    );
    parallaxLayers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 1);
      layer.style.setProperty(
        "--sy",
        enableScrollParallax ? `${progress * depth * -2.6}px` : "0px"
      );
    });
    biometricDevice.style.setProperty(
      "--scene-rz",
      enableScrollParallax ? `${progress * -3.5}deg` : "0deg"
    );
  }

  hero.addEventListener("pointermove", function (event) {
    if (reducedMotion.matches || event.pointerType === "touch") return;
    const bounds = hero.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    hero.style.setProperty("--grid-x", `${horizontal * -24}px`);
    hero.style.setProperty("--grid-y", `${vertical * -18}px`);
    biometricDevice.style.setProperty("--scene-rx", `${vertical * -10}deg`);
    biometricDevice.style.setProperty("--scene-ry", `${horizontal * 14}deg`);

    parallaxLayers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 1);
      layer.style.setProperty("--px", `${horizontal * depth * 1.25}px`);
      layer.style.setProperty("--py", `${vertical * depth * 0.95}px`);
    });
  });
  hero.addEventListener("pointerleave", resetPointerParallax);

  window.addEventListener(
    "scroll",
    function () {
      if (!scrollFrameRequested) {
        scrollFrameRequested = true;
        window.requestAnimationFrame(updateScrollParallax);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateScrollParallax, { passive: true });
  updateScrollParallax();









    












})();




gsap.registerPlugin(ScrollTrigger);

gsap.from(".fade-left", {
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".fade-left",
    start: "top 70%", // animation starts when the top reaches 80% of viewport
    toggleActions: "play none none none"
  }
});












 // ===== Philosophy section: sticky centering + smooth image crossfade =====
      const philosophyItems   = gsap.utils.toArray('.philosophy-item');
      const philosophyImages  = gsap.utils.toArray('.philosophy-sticky .philosophy-img');
      // const philosophySticky  = document.querySelector('.philosophy-sticky');
      // const philosophyWrap    = document.querySelector('.philosophy-image-wrap');
      const badgeCurrent      = document.querySelector('.philosophy-badge .current');

      // Position the sticky offset so the image's own vertical CENTER lines up
      // with the viewport's vertical center at the moment it locks in place.
      // function updatePhilosophyStickyOffset() {
      //   if (!philosophySticky || !philosophyWrap) return;
      //   if (window.innerWidth <= 900) return; // mobile: sticky is disabled via CSS, nothing to compute
      //   const offset = (window.innerHeight - philosophyWrap.offsetHeight) / 2;
      //   philosophySticky.style.top = Math.max(16, offset) + 'px';
      // }

      function setActivePhilosophy(index) {
        philosophyItems.forEach((item, i) => item.classList.toggle('is-active', i === index));
        philosophyImages.forEach((img, i) => {
          gsap.to(img, {
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 1.08,
            duration: 1,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        });
        if (badgeCurrent) badgeCurrent.textContent = String(index + 1).padStart(2, '0');
      }

      let philosophyTriggers = [];

      function initPhilosophyScroll() {
        // Reset to a known-good state before (re)measuring, so a stale
        // "active" card never survives a rebuild.
        philosophyTriggers.forEach(t => t.kill());
        philosophyTriggers = [];
        setActivePhilosophy(0);
        // updatePhilosophyStickyOffset();

        philosophyItems.forEach((item, i) => {
          philosophyTriggers.push(
            ScrollTrigger.create({
              trigger: item,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => setActivePhilosophy(i),
              onEnterBack: () => setActivePhilosophy(i),
            })
          );
        });

        ScrollTrigger.refresh();
      }

      // Run only after the CTA section's pin spacer has been added to the
      // page (buildAnimation runs first), so positions are measured against
      // the final page layout instead of a shorter, pre-pin one.
      window.addEventListener('load', () => {
        initPhilosophyScroll();
      });

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          initPhilosophyScroll();
        }, 200);
      });






      // solution card reveal one by one


      // ===== Solutions Cards Animation =====
const solutionsGrid = document.querySelector(".solutions__grid");

if (solutionsGrid) {
  const solutionCards = gsap.utils.toArray(".solutions__grid .card");

  gsap.set(solutionCards, {
    autoAlpha: 0,
    scale: 0.82,
    y: 40
  });

  gsap.to(solutionCards, {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    duration: 1,
    ease: "back.out(1.5)",
    stagger: 0.16,
    clearProps: "transform,opacity,visibility",

    scrollTrigger: {
      trigger: solutionsGrid,
      start: "top 80%",
      toggleActions: "play none none none",
      once: true
    }
  });
}

















