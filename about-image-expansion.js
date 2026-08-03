  // About visual scroll expansion: start

  (function(){
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const aboutVisual = document.querySelector(".about-visual");
  const aboutIntro = document.querySelector(".about-intro");
  const gsapLibrary = window.gsap;
  const scrollTriggerPlugin = window.ScrollTrigger;

  if (aboutVisual && aboutIntro && gsapLibrary && scrollTriggerPlugin) {
    gsapLibrary.registerPlugin(scrollTriggerPlugin);

    const aboutMotionQuery = window.matchMedia(
      "(min-width: 1025px) and (prefers-reduced-motion: no-preference)"
    );
    let aboutExpansionTrigger = null;

    function setAboutExpansionProgress(progress, immediate) {
      const nextScale = 0.75 + progress * 0.25;

      if (immediate) {
        gsapLibrary.killTweensOf(aboutVisual);
        gsapLibrary.set(aboutVisual, {
          scale: nextScale,
          transformOrigin: "center center",
        });
        return;
      }

      gsapLibrary.to(aboutVisual, {
        scale: nextScale,
        transformOrigin: "center center",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    function setupAboutExpansion() {
      if (aboutExpansionTrigger) {
        aboutExpansionTrigger.kill();
        aboutExpansionTrigger = null;
      }

      gsapLibrary.killTweensOf(aboutVisual);
      gsapLibrary.set(aboutVisual, { clearProps: "transform" });

      if (!aboutMotionQuery.matches) return;

      setAboutExpansionProgress(0, true);

      aboutExpansionTrigger = scrollTriggerPlugin.create({
        trigger: aboutIntro,
        start: "top center",
        end: "bottom top",
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          setAboutExpansionProgress(self.progress, false);
        },
      });

      scrollTriggerPlugin.refresh();
    }

    if (typeof aboutMotionQuery.addEventListener === "function") {
      aboutMotionQuery.addEventListener("change", setupAboutExpansion);
    } else {
      aboutMotionQuery.addListener(setupAboutExpansion);
    }

    setupAboutExpansion();
  }

  })()
  // About visual scroll expansion: end