/* =========================================================================
   John Silva — Engineering Portfolio
   Progressive enhancement only: everything below degrades to a readable page.
   ========================================================================= */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- theme */

  var root = document.documentElement;
  var themeBtn = $("#themeToggle");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("js-theme", next); } catch (e) {}
      themeBtn.setAttribute("aria-label", next === "light" ? "Switch to dark theme" : "Switch to light theme");
    });
  }

  /* --------------------------------------------------------- sticky header */

  var head = $("#siteHead");
  var bar = $("#scrollBar");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (head) head.classList.toggle("is-stuck", y > 12);
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------- mobile nav */

  var navToggle = $("#navToggle");
  var nav = $("#primaryNav");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
      navToggle.innerHTML = '<svg aria-hidden="true"><use href="#i-menu"></use></svg>';
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      navToggle.innerHTML = '<svg aria-hidden="true"><use href="#i-' + (open ? "close" : "menu") + '"></use></svg>';
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  }

  /* ------------------------------------------------------------ scroll spy */

  var navLinks = $$("#primaryNav a[href^='#']");
  var spied = navLinks
    .map(function (a) { return { link: a, section: document.getElementById(a.getAttribute("href").slice(1)) }; })
    .filter(function (p) { return p.section; });

  if (spied.length && "IntersectionObserver" in window) {
    var visible = new Set();
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
      });
      var best = null;
      spied.forEach(function (p) {
        if (visible.has(p.section)) {
          if (!best || p.section.offsetTop < best.section.offsetTop) best = p;
        }
      });
      spied.forEach(function (p) {
        if (best && p === best) p.link.setAttribute("aria-current", "true");
        else p.link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
    spied.forEach(function (p) { spy.observe(p.section); });
  }

  /* --------------------------------------------------------- reveal on scroll */

  var revealables = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        obs.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* -------------------------------------------------------- animated counters */

  function animateCount(el, target, dp) {
    dp = dp || 0;
    if (reduceMotion) { el.textContent = target.toFixed(dp); return; }
    var dur = 1300;
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dp);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = $$("[data-count]");
  counters.forEach(function (el) {
    var raw = el.getAttribute("data-count");
    var target = parseFloat(raw);
    // Match the written precision, so 3.2 counts up through 0.8, 1.6, 2.4 rather
    // than being rounded to whole numbers on the way.
    var dp = (raw.split(".")[1] || "").length;
    if (isNaN(target)) return;
    // The real figure is already in the markup so it survives with JS off, in reader
    // mode, and for crawlers. Keep it on screen and only blank it at the instant the
    // count-up is about to run.
    if (!("IntersectionObserver" in window)) { el.textContent = target.toFixed(dp); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        obs.unobserve(en.target);
        el.textContent = (0).toFixed(dp);
        animateCount(el, target, dp);
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });

  /* --------------------------------------------------- elapsed-years caption */

  $$("[data-years-since]").forEach(function (el) {
    var from = parseInt(el.getAttribute("data-years-since"), 10);
    if (isNaN(from)) return;
    var now = new Date();
    // Anniversary is March, when John joined in 2012.
    var n = now.getFullYear() - from - (now.getMonth() < 2 ? 1 : 0);
    if (n > 0) el.textContent = n + (n === 1 ? " year" : " years") + " and counting";
  });

  /* ------------------------------------------------------------- skill bars */

  var bars = $$(".skillbar__fill");
  if (bars.length) {
    if (!("IntersectionObserver" in window) || reduceMotion) {
      bars.forEach(function (b) { b.style.width = b.getAttribute("data-skill") + "%"; });
    } else {
      var barIo = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var b = en.target;
          setTimeout(function () { b.style.width = b.getAttribute("data-skill") + "%"; }, 80);
          obs.unobserve(b);
        });
      }, { threshold: 0.3 });
      bars.forEach(function (b) { barIo.observe(b); });
    }
  }

  /* ------------------------------------------- disclosure: cases + accordions */

  function wireDisclosure(btn, panelClass) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.classList.toggle("is-open", !open);
      if (open) {
        // Keep the trigger in view when a long panel collapses above the fold.
        var top = btn.getBoundingClientRect().top;
        if (top < 0) {
          window.scrollTo({ top: window.scrollY + top - 90, behavior: reduceMotion ? "auto" : "smooth" });
        }
      }
    });
  }

  $$(".case__toggle").forEach(function (b) { wireDisclosure(b, "case__detail"); });
  $$(".acc__btn").forEach(function (b) { wireDisclosure(b, "acc__panel"); });

  /* ------------------------------------------------ before / after comparison */

  $$("[data-compare]").forEach(function (wrap) {
    var stage = $(".compare__stage", wrap);
    var top = $(".compare__top", wrap);
    var handle = $(".compare__handle", wrap);
    var topImg = $("img", top);
    if (!stage || !top || !handle || !topImg) return;

    var pos = 50;

    function sizeTopImage() {
      // The clipped layer must render its image at full stage width so both
      // halves stay in register as the mask width changes.
      topImg.style.width = stage.clientWidth + "px";
    }

    function apply(p) {
      pos = Math.max(0, Math.min(100, p));
      top.style.width = pos + "%";
      handle.style.left = pos + "%";
      stage.setAttribute("aria-valuenow", Math.round(pos));
      stage.setAttribute("aria-valuetext", Math.round(pos) + "% conventional weld shown");
    }

    function fromPointer(clientX) {
      var r = stage.getBoundingClientRect();
      if (!r.width) return;
      apply(((clientX - r.left) / r.width) * 100);
    }

    var dragging = false;

    stage.addEventListener("pointerdown", function (e) {
      dragging = true;
      stage.setPointerCapture(e.pointerId);
      fromPointer(e.clientX);
    });
    stage.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      e.preventDefault();
      fromPointer(e.clientX);
    });
    ["pointerup", "pointercancel"].forEach(function (evt) {
      stage.addEventListener(evt, function (e) {
        dragging = false;
        if (stage.hasPointerCapture && stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
      });
    });

    stage.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 10 : 4;
      if (e.key === "ArrowLeft") { apply(pos - step); e.preventDefault(); }
      else if (e.key === "ArrowRight") { apply(pos + step); e.preventDefault(); }
      else if (e.key === "Home") { apply(0); e.preventDefault(); }
      else if (e.key === "End") { apply(100); e.preventDefault(); }
    });

    window.addEventListener("resize", function () { sizeTopImage(); }, { passive: true });

    // The stage may be inside a collapsed panel with zero width at load, so
    // re-measure whenever it actually becomes visible.
    if ("ResizeObserver" in window) {
      new ResizeObserver(sizeTopImage).observe(stage);
    }
    if (topImg.complete) sizeTopImage(); else topImg.addEventListener("load", sizeTopImage);

    sizeTopImage();
    apply(50);
  });

  /* ------------------------------------------------------------- lightbox */

  var lb = $("#lightbox");
  var lbImg = $("#lbImg");
  var lbCap = $("#lbCap");
  var lbCount = $("#lbCount");
  var triggers = $$("[data-lightbox]");
  var lastFocus = null;
  var index = 0;

  function show(i) {
    if (!triggers.length) return;
    index = (i + triggers.length) % triggers.length;
    var t = triggers[index];
    lbImg.src = t.getAttribute("data-src");
    lbImg.alt = t.getAttribute("data-title") || "";
    var title = t.getAttribute("data-title");
    var cap = t.getAttribute("data-caption") || "";
    lbCap.innerHTML = (title ? "<b>" + title + "</b>" : "") + cap;
    lbCount.textContent = (index + 1) + " / " + triggers.length;
  }

  function openLb(i) {
    lastFocus = document.activeElement;
    lb.hidden = false;
    lb.classList.add("is-open");
    document.body.classList.add("is-locked");
    show(i);
    $("[data-lb-close]", lb).focus();
  }

  function closeLb() {
    lb.classList.remove("is-open");
    lb.hidden = true;
    document.body.classList.remove("is-locked");
    lbImg.src = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (lb && triggers.length) {
    triggers.forEach(function (t, i) {
      t.addEventListener("click", function () { openLb(i); });
    });
    $("[data-lb-close]", lb).addEventListener("click", closeLb);
    $("[data-lb-prev]", lb).addEventListener("click", function () { show(index - 1); });
    $("[data-lb-next]", lb).addEventListener("click", function () { show(index + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
      else if (e.key === "Tab") {
        // Trap focus inside the dialog.
        var focusables = $$("button", lb);
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
  }

  /* --------------------------------------------------------- copy + print */

  var copyBtn = $("#copyEmail");
  if (copyBtn && navigator.clipboard) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(copyBtn.getAttribute("data-copy")).then(function () {
        copyBtn.classList.add("is-copied");
        setTimeout(function () { copyBtn.classList.remove("is-copied"); }, 1800);
      });
    });
  } else if (copyBtn) {
    copyBtn.hidden = true;
  }

  var printBtn = $("#printCv");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      // Expand every disclosure so the printed document is complete.
      $$(".case__toggle[aria-expanded='false'], .acc__btn[aria-expanded='false']").forEach(function (b) { b.click(); });
      setTimeout(function () { window.print(); }, 450);
    });
  }

  /* ------------------------------------------------------------------ misc */

  var yr = $("#year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
