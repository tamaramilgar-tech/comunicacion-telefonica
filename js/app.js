// js/app.js
(() => {
  "use strict";console.log("CARGANDO js/app.js OK");

  // ========= Vistas =========
  const views = {
    home: document.getElementById("view-home"),
    phase1: document.getElementById("view-phase1"),
    phase2: document.getElementById("view-phase2"),
    phase3: document.getElementById("view-phase3"),
    phase4: document.getElementById("view-phase4"),
    certificate: document.getElementById("view-certificate"),
  };

  function showView(viewId) {
    Object.values(views).forEach(v => v && v.classList.add("hidden"));
    if (views[viewId]) views[viewId].classList.remove("hidden");
  }

  // ========= Progreso (bloqueos) =========
  const KEY = "u3_tel_progress";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  state.unlocked = state.unlocked || { phase1: true, phase2: false, phase3: false, phase4: false, certificate: false };

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function setBadge(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function refreshUI() {
    // Tabs (bloqueo)
    document.querySelectorAll(".tab").forEach(btn => {
      const v = btn.dataset.view;
      if (!v) return;
      if (v === "home") btn.disabled = false;
      else if (v === "phase1") btn.disabled = !state.unlocked.phase1;
      else if (v === "phase2") btn.disabled = !state.unlocked.phase2;
      else if (v === "phase3") btn.disabled = !state.unlocked.phase3;
      else if (v === "phase4") btn.disabled = !state.unlocked.phase4;
      else if (v === "certificate") btn.disabled = !state.unlocked.certificate;
    });

    // Badges (si existen)
    setBadge("phase1Badge", state.unlocked.phase2 ? "FASE 1: completada" : "FASE 1: pendiente");
    setBadge("phase2Badge", state.unlocked.phase3 ? "FASE 2: completada" : "FASE 2: bloqueada");
    setBadge("phase3Badge", state.unlocked.phase4 ? "FASE 3: completada" : "FASE 3: bloqueada");
    setBadge("phase4Badge", state.unlocked.certificate ? "FASE 4: completada" : "FASE 4: bloqueada");
  }

  // ========= Tabs =========
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!btn.disabled) showView(btn.dataset.view);
    });
  });

  // ========= Botones =========
  const startBtn = document.getElementById("startPhase1Btn");
  if (startBtn) startBtn.addEventListener("click", () => showView("phase1"));

  // Estos IDs los pongo “por si existen”; si no, NO rompe.
  const phase1NextBtn = document.getElementById("phase1NextBtn");
  if (phase1NextBtn) {
    phase1NextBtn.addEventListener("click", () => {
      state.unlocked.phase2 = true;
      save();
      refreshUI();
      showView("phase2");
    });
  }

  const phase2NextBtn = document.getElementById("phase2NextBtn");
  if (phase2NextBtn) {
    phase2NextBtn.addEventListener("click", () => {
      state.unlocked.phase3 = true;
      save();
      refreshUI();
      showView("phase3");
    });
  }

  const phase3NextBtn = document.getElementById("phase3NextBtn");
  if (phase3NextBtn) {
    phase3NextBtn.addEventListener("click", () => {
      state.unlocked.phase4 = true;
      save();
      refreshUI();
      showView("phase4");
    });
  }

  const phase4FinishBtn = document.getElementById("phase4FinishBtn");
  if (phase4FinishBtn) {
    phase4FinishBtn.addEventListener("click", () => {
      state.unlocked.certificate = true;
      save();
      refreshUI();
      showView("certificate");
    });
  }

  // ========= PARCHE DEFINITIVO "CORREGIR" (delegación) =========
  document.addEventListener("click", (e) => {
    const el = e.target.closest("button, a, [role='button']");
    if (!el) return;

    const txt = (el.textContent || "").trim().toLowerCase();
    if (txt !== "corregir") return;

    e.preventDefault();

    const isVisible = (key) => views[key] && !views[key].classList.contains("hidden");

    let current =
      isVisible("phase1") ? "phase1" :
      isVisible("phase2") ? "phase2" :
      isVisible("phase3") ? "phase3" :
      isVisible("phase4") ? "phase4" :
      null;

    if (!current) return;

    const nextMap = {
      phase1: "phase2",
      phase2: "phase3",
      phase3: "phase4",
      phase4: "certificate",
    };

    const next = nextMap[current];
    if (!next) return;

    state.unlocked[next] = true;
    save();
    refreshUI();
    showView(next);
  });
  // ========= PARCHE VALIDAR DOCENTE =========
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if ((btn.textContent || "").trim().toLowerCase() !== "validar") return;

    e.preventDefault();

    const input = btn.parentElement.querySelector("input");
    if (!input) return;

    const code = input.value.trim();
    if (code.length !== 6) {
      alert("El código debe tener 6 caracteres");
      return;
    }

    // Detectar fase actual visible
    const isVisible = (k) => views[k] && !views[k].classList.contains("hidden");
    const phase =
      isVisible("phase1") ? "phase1" :
      isVisible("phase2") ? "phase2" :
      isVisible("phase3") ? "phase3" :
      isVisible("phase4") ? "phase4" :
      null;

    if (!phase) return;

    const ok = await TeacherGate.verify(phase, code);

    if (!ok) {
      alert("Código incorrecto");
      return;
    }

    // Desbloquea fase siguiente
    const nextMap = {
      phase1: "phase2",
      phase2: "phase3",
      phase3: "phase4",
      phase4: "certificate",
    };

    const next = nextMap[phase];
    if (!next) return;

    TeacherGate.setUnlocked(next);
    state.unlocked[next] = true;
    save();
    refreshUI();
    showView(next);
  });

  // ========= Arranque =========
  refreshUI();
  showView("home");
})();
