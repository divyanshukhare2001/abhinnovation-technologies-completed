  // cursor-follow glow, per-card
  document.querySelectorAll('.why-choose .card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--x', x + '%');
      card.style.setProperty('--y', y + '%');
    });
  });

  // accordion: one open at a time, smooth via CSS grid-template-rows
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const item = trigger.closest('.accordion-item');
      const wasActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(function (el) {
        el.classList.remove('active');
      });

      if (!wasActive) item.classList.add('active');
    });
  });