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

// 理念アニメーション
document.addEventListener('DOMContentLoaded', () => {
    const philosophyText = document.querySelector('.philosophy__text');
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

/*membersのborderアニメーション*/
document.addEventListener("DOMContentLoaded", function () {
    const target = document.querySelector(".career__list");

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                target.classList.add("is-visible");
                observer.unobserve(target);
            }
        },
        {
            root: null,
            threshold: 0.95,
        }
    );

    if (target) {
        observer.observe(target);
    }
});

/*プロセスアニメーション-スマホ*/
document.addEventListener("DOMContentLoaded", () => {
    const flows = document.querySelectorAll(".process__flow");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    }, { threshold: 0.1 });

    flows.forEach(el => observer.observe(el));

    document.querySelectorAll('.process__item a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            if (!target) return;

            target.classList.remove('is-visible');

            setTimeout(() => {
                target.classList.add('is-visible');
            }, 150);
        });
    });
});

/*プロセスアニメーション-デスクトップ*/
document.addEventListener("DOMContentLoaded", () => {
    const line = document.querySelector(".process__line");
    const section = document.querySelector(".process");

    if (!line || !section) return;

    let maxHeight = 0;

    const updateLineHeight = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        const scrolledInSection = scrollY + window.innerHeight / 2 - sectionTop;

        if (scrolledInSection > 0 && scrollY + window.innerHeight > sectionTop) {
            const progress = Math.min(1, scrolledInSection / sectionHeight);
            const newHeight = sectionHeight * progress;

            if (newHeight > maxHeight) {
                maxHeight = newHeight;
                line.style.height = `${maxHeight}px`;
            }
        }
    };

    window.addEventListener("scroll", updateLineHeight);
    window.addEventListener("resize", updateLineHeight);
    updateLineHeight();
});