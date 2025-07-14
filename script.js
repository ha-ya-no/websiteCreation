// ハンバーガー
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (menu.classList.contains('active')) {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        }
    }
});

/*topのタグホバーアニメーション
------------------------------*/
const cards = document.querySelectorAll('.works__tag');

cards.forEach(card => {
  const title = card.querySelector('.works__tag-link');
  const originalText = title.textContent;

  card.addEventListener('mouseenter', () => {
    if (!title.textContent.startsWith('「')) {
      title.textContent = `『${originalText}』`;
    }
  });

  card.addEventListener('mouseleave', () => {
    title.textContent = originalText;
  });
});

// 理念アニメーション
document.addEventListener('DOMContentLoaded', () => {
    const philosophyText = document.querySelector('.philosophy-text');
    const body = document.body;
    let unlocked = false;

    window.addEventListener('scroll', () => {
        if (unlocked) return;

        const triggerPoint = window.innerHeight / 1.3;
        const elementTop = philosophyText.getBoundingClientRect().top;

        if (elementTop < triggerPoint) {
            philosophyText.classList.add('scrolled');

            setTimeout(() => {
                body.classList.remove('lock-scroll');
                unlocked = true;
            }, 1500);
        }
    });
});