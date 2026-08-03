(function(){
      // CTA-section animation

  
      gsap.registerPlugin(ScrollTrigger);

      const section   = document.querySelector('.cta-section');
      const container = document.querySelector('.cta-section .container');
      const bg         = document.querySelector('.bg');

      let st; // holds the current ScrollTrigger instance so we can kill/rebuild on resize

      function buildAnimation() {
        if (st) st.kill();
        gsap.set(bg, { clearProps: 'clipPath' });
        container.classList.remove('js-expand');
        bg.classList.remove('js-expand');

        // 1. Measure the box in its natural (small, centered, rounded) state.
        const sectionRect = section.getBoundingClientRect();
        const bgRect = bg.getBoundingClientRect();

        const top    = bgRect.top - sectionRect.top;
        const left   = bgRect.left - sectionRect.left;
        const right  = sectionRect.right - bgRect.right;
        const bottom = sectionRect.bottom - bgRect.bottom;

        // inset(120.67px 526.855px 121.68px round 167.5px)

        const radius = window.innerWidth < 768 ? 90 : 167.5;

        const startClip = `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;
        // const endClip   = `inset(0px 0px 0px 0px round 0px)`;
        // const endClip   = `inset(35px 50px 35px 50px round 30px)`;
        const endClip = window.innerWidth < 768 ? `inset(0px 0px 0px 0px round 0px)` : `inset(35px 50px 35px 50px round 30px)`

        // 2. Re-anchor .bg to fill the whole section, then use clip-path to
        //    visually "fake" the original small rounded box (no layout jump).
        container.classList.add('js-expand');
        bg.classList.add('js-expand');
        gsap.set(bg, { clipPath: startClip });

        // 3. Pin the section once it's fully in view, and scrub the clip-path
        //    open as the user scrolls. When the tween finishes, ScrollTrigger
        //    unpins automatically and normal scrolling resumes.
        st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          animation: gsap.timeline().fromTo(
            bg,
            { clipPath: startClip },
            { clipPath: endClip, ease: 'none' }
          )
        });
      }

      window.addEventListener('load', buildAnimation);

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildAnimation, 200);
      });
})()