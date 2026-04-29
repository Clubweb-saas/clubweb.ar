/* ============================================================
   Clubweb — Footer Loader
   Archivo: js/footer.js
   ============================================================ */

(function () {
  "use strict";

  fetch("/components/footer.html")
    .then(function (res) {
      if (!res.ok) throw new Error("No se pudo cargar el footer");
      return res.text();
    })
    .then(function (html) {
      var placeholder = document.getElementById("footer-placeholder");
      if (placeholder) {
        placeholder.outerHTML = html;
      } else {
        document.body.insertAdjacentHTML("beforeend", html);
      }
      // Año dinámico
      var yearEl = document.getElementById("cw-footer-year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    })
    .catch(function (err) {
      console.warn("Footer:", err.message);
    });

})();
