const items = document.querySelectorAll(".card-sticky");

function animateCards() {
  items.forEach((item, i) => {
    const card = item.firstElementChild;
    const next = items[i + 1];

    card.style.backgroundImage = `url("${card.dataset.bg}")`;

    const progress = next
      ? Math.max(0, Math.min(
          (card.offsetHeight + parseInt(item.style.top) -
          next.getBoundingClientRect().top) / card.offsetHeight,
          1
        ))
      : 0;

    card.style.transform =
      `translateY(${-18 * progress}px) scale(${1 - .06 * progress})`;

    card.style.filter = `brightness(${1 - .25 * progress})`;
  });
}

addEventListener("scroll", animateCards, { passive: true });
addEventListener("resize", animateCards);
animateCards();