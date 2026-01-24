// js/app.js
(() => {
  // =====================
  // Navegación
  // =====================
  const views = {
    home: document.getElementById("view-home"),
    phase1: document.getElementById("view-phase1"),
    phase2: document.getElementById("view-phase2"),
    phase3: document.getElementById("view-phase3"),
    phase4: document.getElementById("view-phase4"),
    certificate: document.getElementById("view-certificate")
  };

  function showView(viewId) {
    Object.values(views).forEach(v => v && v.classList.add("hidden"));
    if (!views[viewId]) return;
    views[viewId].classList.remove("hidden");
  }

  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!btn.disabled) showView(btn.dataset.view);
    });
  });

  const startBtn = document.getElementById("startPhase1Btn");
  if (startBtn)
      if (startBtn) {
    startBtn.addEventListener("click", () => showView("phase1"));
  }

  // =====================
  // Navegación por botones (sin romper nada si algún ID no existe)
  // =====================
  const go = (id) => () => showView(id);

  const phase1NextBtn = document.getElementById("phase1NextBtn");
  if (phase1NextBtn) phase1NextBtn.addEventListener("click", go("phase2"));

  const phase2NextBtn = document.getElementById("phase2NextBtn");
  if (phase2NextBtn) phase2NextBtn.addEventListener("click", go("phase3"));

  const phase3NextBtn = document.getElementById("phase3NextBtn");
  if (phase3NextBtn) phase3NextBtn.addEventListener("click", go("phase4"));

  const phase4FinishBtn = document.getElementById("phase4FinishBtn");
  if (phase4FinishBtn) phase4FinishBtn.addEventListener("click", go("certificate"));

  const goCertificateBtn = document.getElementById("goCertificateBtn");
  if (goCertificateBtn) goCertificateBtn.addEventListener("click", go("certificate"));

  // =====================
  // Atajos opcionales por data-goto (NO obliga a cambiar HTML)
  // Si ya existen botones con data-goto="phase2" etc., funcionarán.
  // =====================
  document.querySelectorAll("[data-goto]").forEach(el => {
    el.addEventListener("click", () => showView(el.dataset.goto));
  });

  // Vista inicial (si quieres arrancar siempre en home)
  showView("home");
})();

