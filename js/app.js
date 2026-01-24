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
// Estado necesario para tests y certificado
state.passed = state.passed || {
  phase1: false,
  phase2: false,
  phase3: false,
  phase4: false
};

state.scores = state.scores || {
  phase1: 0,
  phase2: 0,
  phase3: 0,
  phase4: 0
};

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
  // ========= FIX DEFINITIVO: avanzar SOLO 1 fase =========
  function currentPhaseKey() {
    if (!views.phase1.classList.contains("hidden")) return "phase1";
    if (!views.phase2.classList.contains("hidden")) return "phase2";
    if (!views.phase3.classList.contains("hidden")) return "phase3";
    if (!views.phase4.classList.contains("hidden")) return "phase4";
    return null;
  }

  const nextOf = {
    phase1: "phase2",
    phase2: "phase3",
    phase3: "phase4",
    phase4: "certificate",
  };

  // 1) CORREGIR (cualquier botón que diga "Corregir")
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const txt = (btn.textContent || "").trim().toLowerCase();
    if (txt !== "corregir") return;

    e.preventDefault();

    const cur = currentPhaseKey();
    if (!cur) return;

    const next = nextOf[cur];
    if (!next) return;

    state.unlocked[next] = true;
    save();
    refreshUI();
    showView(next);
  });

  // 2) VALIDAR (IDs reales de tu HTML)
  // p2VerifyBtn valida fase2 -> desbloquea fase3
  // p3VerifyBtn valida fase3 -> desbloquea fase4
  // p4VerifyBtn valida fase4 -> desbloquea certificado
  const mapValidar = {
    p2VerifyBtn: "phase3",
    p3VerifyBtn: "phase4",
    p4VerifyBtn: "certificate",
  };

  Object.entries(mapValidar).forEach(([id, unlockTo]) => {
    const b = document.getElementById(id);
    if (!b) return;

    b.addEventListener("click", () => {
      state.unlocked[unlockTo] = true;
      save();
      refreshUI();
      showView(unlockTo);
    });
  });
// ======== Arranque ========
// ======== Certificado ========
const certBtn = document.getElementById("certTab");
const downloadBtn = document.getElementById("downloadCertBtn");

if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    // Bloqueo fuerte: solo si está desbloqueado el certificado
    if (!state.unlocked.certificate || !state.passed.phase4) {
      alert("Certificado bloqueado: debes completar todas las fases (mínimo 80%) y verificación docente.");
      return;
    }

    const studentName =
      (document.getElementById("studentName")?.value || "").trim() || "Alumno/a";
    const unitName = window.UNIT_NAME || "Unidad";

    generateCertificatePDF({
      studentName,
      unitName,
      resultP1: state.scores.phase1,
      resultP2: state.scores.phase2,
      resultP3: state.scores.phase3,
      resultP4: state.scores.phase4,
    });
  });
}

refreshUI();

if (certBtn) certBtn.disabled = !state.unlocked.certificate;
if (downloadBtn) downloadBtn.disabled = !state.unlocked.certificate;

showView("home");
})();




 
