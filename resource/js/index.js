// ==============================
// 2025 Portfolio JS (통합 버전)
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    // ---------------------------
    // 1. 모바일 메뉴 열기/닫기
    // ---------------------------
    const menuBtn = document.querySelector(".mobileHeader .rightArea button");
    const mobileNav = document.querySelector(".mobile-nav");
    const closeBtn = mobileNav.querySelector(".closeBtn");
    let scrollPosition = 0;

    const openMenu = () => {
        scrollPosition = window.pageYOffset;
        mobileNav.classList.add("active");
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = "100%";
    };

    const closeMenu = () => {
        mobileNav.classList.remove("active");
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition);
    };

    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);



    // ---------------------------
    // 2. 공통 스크롤 링크
    // ---------------------------
    const allLinks = document.querySelectorAll(
        '.mobile-nav ul li a, .header-item, .notch-bar .nav-item'
    );

    allLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            // 모바일 메뉴 닫기
            if (mobileNav.classList.contains("active")) closeMenu();

            // href에서 target id 추출
            const href = link.getAttribute("href");
            if (!href || href === "#") return;

            const targetId = href.startsWith("#") ? href.slice(1) : null;
            if (!targetId) return;

            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            // 부드럽게 스크롤
            targetEl.scrollIntoView({ behavior: "smooth" });

            // active 클래스 업데이트
            const allNavItems = document.querySelectorAll(".notch-bar .nav-item, .header-item");
            allNavItems.forEach(item => {
                item.classList.toggle(
                    "active",
                    item === link
                );
            });
        });
    });

    // ---------------------------
    // 3. 스크롤 시 active 갱신
    // ---------------------------
    const sections = Array.from(document.querySelectorAll(
        "#mainVisual, #content1, #service-details, #projectsWrap, #bottomTextWrap"
    ));

    function updateActiveOnScroll() {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        let current = sections[0].id;

        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop) current = sec.id;
        });

        const allNavItems = document.querySelectorAll(".notch-bar .nav-item, .header-item");
        allNavItems.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle(
                "active",
                href === `#${current}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveOnScroll);
    updateActiveOnScroll();

    // ---------------------------
    // 4. 메일 복사 기능
    // ---------------------------
    const mailBtn = document.querySelector(".contactArea .mailIcon");
    const email = "sys152901@naver.com";

    if (mailBtn) {
        mailBtn.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(email).then(() => {
                alert(`${email} メールがコピーされました。`);
            }).catch(err => console.error("コピーに失敗しました:", err));
        });
    }

    // ---------------------------
    // 5. AOS Init
    // ---------------------------
    AOS.init({
        startEvent: "DOMContentLoaded",
        offset: 50,
        duration: 800,
        once: true
    });
});
