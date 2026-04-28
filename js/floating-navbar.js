/* ============================================================
   Clubweb — Floating Navbar Loader
   Archivo: js/floating-navbar.js
   ============================================================ */

(function () {
  "use strict";

  // ── 1. Cargar el componente HTML ──────────────────────────────
  fetch("/components/navbar.html")
    .then(function (res) {
      if (!res.ok) throw new Error("No se pudo cargar el navbar");
      return res.text();
    })
    .then(function (html) {
      // Insertar al inicio del body
      var placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) {
        placeholder.outerHTML = html;
      } else {
        document.body.insertAdjacentHTML("afterbegin", html);
      }
      initNavbar();
    })
    .catch(function (err) {
      console.warn("Navbar:", err.message);
    });

  // ── 2. Inicializar comportamientos ───────────────────────────
  function initNavbar() {
    setTimeout(function() {
      markActiveLink();
    }, 50);
    initMobileMenu();
    initScrollEffect();
  }

  // ── 3. Marcar el link activo según la página actual ──────────
  function markActiveLink() {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".cw-nav-link, .cw-mobile-link");
    links.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      // Ignorar links que son solo anclas (#seccion) — pertenecen a index
      var linkPage = href.startsWith("#") ? "index.html" : href.split("/").pop().split("#")[0];
      // No marcar si linkPage quedó vacío
      if (!linkPage) return;
      if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  // ── 4. Menú mobile ───────────────────────────────────────────
  function initMobileMenu() {
    var toggler = document.getElementById("cwToggler");
    var menu    = document.getElementById("cwMobileMenu");
    if (!toggler || !menu) return;

    // Crear overlay
    var overlay = document.createElement("div");
    overlay.className = "cw-mobile-overlay";
    document.body.appendChild(overlay);

    function openMenu() {
      menu.classList.add("open");
      overlay.classList.add("open");
      toggler.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      menu.classList.remove("open");
      overlay.classList.remove("open");
      toggler.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    toggler.addEventListener("click", function () {
      var isOpen = menu.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    // Cerrar al hacer click en un link
    menu.querySelectorAll(".cw-mobile-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
    });
  }

  // ── 5. Efecto al hacer scroll ────────────────────────────────
  function initScrollEffect() {
    var wrapper = document.querySelector(".cw-navbar-wrapper");
    if (!wrapper) return;

    function onScroll() {
      if (window.scrollY > 20) {
        wrapper.classList.add("scrolled");
      } else {
        wrapper.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Ejecutar al cargar por si ya hay scroll
  }
})();