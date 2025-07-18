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
const links = document.querySelectorAll('.works__tag-link');

links.forEach(link => {
  const textElement = link.querySelector('.text');
  const rawText = textElement.textContent;

  // 文字列に「」が含まれていれば hover を無効にする
  const hasJapaneseQuotes = rawText.includes('「') || rawText.includes('」');

  if (!hasJapaneseQuotes) {
    link.addEventListener('mouseenter', () => {
      link.classList.add('hover');
    });

    link.addEventListener('mouseleave', () => {
      link.classList.remove('hover');
    });
  }
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