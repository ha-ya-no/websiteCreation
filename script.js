// ハンバーガー
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

menu.querySelectorAll('a, button, img, li').forEach(el => {
    el.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

menu.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    }
});

const worksLink = document.querySelector('a[href$="#works"]');

if (worksLink) {
    worksLink.addEventListener('click', () => {
        const isTopPage = location.pathname.endsWith('top.html') || location.pathname === '/' || location.pathname === '/index.html';

        if (isTopPage && menu.classList.contains('active')) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        }
    });
}

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

// モーダル
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal__close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const images = Array.from(document.querySelectorAll('.content__img'));
let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener('click', function () {
        currentIndex = index;
        showImage();
        modal.style.display = "flex";
    });
});

function showImage() {
    modalImg.src = images[currentIndex].src;

    prevBtn.classList.toggle('hidden', currentIndex === 0);
    nextBtn.classList.toggle('hidden', currentIndex === images.length - 1);
}

closeBtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

nextBtn.onclick = function () {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        showImage();
    }
};

prevBtn.onclick = function () {
    if (currentIndex > 0) {
        currentIndex--;
        showImage();
    }
};