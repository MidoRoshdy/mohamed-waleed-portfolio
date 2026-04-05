/**
 * Portfolio: scroll animations, mobile nav collapse, active nav on scroll.
 */
(function () {
  "use strict";

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".fade-in")
    .forEach((el) => fadeObserver.observe(el));

  document.querySelectorAll("#hero .fade-in").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 150);
  });

  const navCollapse = document.getElementById("navbarMain");

  /** While `true`, scroll-spy must not overwrite (smooth scroll passes other sections). */
  let navSpyLocked = false;
  let navUnlockTimer = null;

  function setNavActiveByHref(targetHref) {
    document
      .querySelectorAll("#portfolioNav .navbar-nav .nav-link[href^='#']")
      .forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === targetHref);
      });
  }

  document
    .querySelectorAll("#portfolioNav .navbar-nav .nav-link[href^='#']")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          setNavActiveByHref(href);
          navSpyLocked = true;
          window.clearTimeout(navUnlockTimer);

          let unlockDone = false;
          const unlock = () => {
            if (unlockDone) {
              return;
            }
            unlockDone = true;
            window.clearTimeout(navUnlockTimer);
            window.removeEventListener("scrollend", unlock);
            navSpyLocked = false;
            updateActiveNav();
          };

          if ("onscrollend" in window) {
            window.addEventListener("scrollend", unlock, { passive: true });
          }
          navUnlockTimer = window.setTimeout(unlock, 1200);
        }

        if (navCollapse && typeof bootstrap !== "undefined") {
          const inst = bootstrap.Collapse.getInstance(navCollapse);
          if (inst && window.innerWidth < 992) {
            inst.hide();
          }
        }
      });
    });

  /** Section order must match nav links (href="#id"). */
  const SECTION_IDS = [
    "hero",
    "experience",
    "skills",
    "education",
    "courses",
    "contact",
  ];

  function navOffset() {
    const nav = document.querySelector(".portfolio-nav");
    return nav ? nav.getBoundingClientRect().height + 16 : 96;
  }

  function sectionDocumentTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  /**
   * Pick the section whose top edge is nearest below the "spy line"
   * (largest section top still <= scrollY + offset). Avoids the common bug
   * where hero stays "matching" because its rect.top is always <= offset.
   */
  function updateActiveNav() {
    if (navSpyLocked) {
      return;
    }

    const links = document.querySelectorAll(
      "#portfolioNav .navbar-nav .nav-link[href^='#']",
    );
    if (!links.length) {
      return;
    }

    const scrollY =
      window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const offset = navOffset();
    const marker = scrollY + offset;

    const docEl = document.documentElement;
    const scrollHeight = docEl.scrollHeight;
    const vh = window.innerHeight;
    const nearBottom = scrollY + vh >= scrollHeight - 3;

    let activeId = SECTION_IDS[0];

    if (nearBottom) {
      activeId = SECTION_IDS[SECTION_IDS.length - 1];
    } else {
      let bestTop = -Infinity;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) {
          continue;
        }
        const top = sectionDocumentTop(el);
        if (top <= marker && top >= bestTop) {
          bestTop = top;
          activeId = id;
        }
      }
    }

    links.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${activeId}`);
    });
  }

  let navTick = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!navTick) {
        window.requestAnimationFrame(() => {
          updateActiveNav();
          navTick = false;
        });
        navTick = true;
      }
    },
    { passive: true },
  );

  window.addEventListener("resize", updateActiveNav);
  window.addEventListener("load", updateActiveNav);
  window.addEventListener("DOMContentLoaded", updateActiveNav);
  window.addEventListener("hashchange", updateActiveNav);
})();
