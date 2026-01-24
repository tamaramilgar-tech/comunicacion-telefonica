// js/app.js
(() => {
  "use strict";
  console.log("CARGANDO js/app.js OK");

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

  // ========= Estado / Progreso =========
  const KEY = "u3_tel_progress_v4";

  const defaultState = {
    unlocked: { phase1: true, phase2: false, phase3: false, phase4: false, certificate: false },
    verified: { phase2: false, phase3: false, phase4: false }, // verificación docente
    passed: { phase1: false, phase2: false, phase3: false, phase4: false }, // aprobado >=80
    scores: { phase1: 0, phase2: 0, phase3: 0, phase4: 0 }, // %
  };

  const state = (() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!raw) return structuredClone(defaultState);
      return {
        ...structuredClone(defaultState),
        ...raw,
        unlocked: { ...defaultState.unlocked, ...(raw.unlocked || {}) },
        verified: { ...defaultState.verified, ...(raw.verified || {}) },
        passed: { ...defaultState.passed, ...(raw.passed || {}) },
        scores: { ...defaultState.scores, ...(raw.scores || {}) },
      };
    } catch {
      return structuredClone(defaultState);
    }
  })();

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  // ========= UI =========
  function setBadge(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function refreshUI() {
    // Tabs
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

    // Badges: completada = aprobada
    setBadge("phase1Badge", state.passed.phase1 ? "FASE 1: completada" : "FASE 1: pendiente");
    setBadge("phase2Badge", state.passed.phase2 ? "FASE 2: completada" : "FASE 2: bloqueada");
    setBadge("phase3Badge", state.passed.phase3 ? "FASE 3: completada" : "FASE 3: bloqueada");
    setBadge("phase4Badge", state.passed.phase4 ? "FASE 4: completada" : "FASE 4: bloqueada");

    // Botones corregir: fase 2-4 solo si verificado docente
    const p2Submit = document.getElementById("p2SubmitQuiz");
    if (p2Submit) p2Submit.disabled = !state.verified.phase2;

    const p3Submit = document.getElementById("p3SubmitQuiz");
    if (p3Submit) p3Submit.disabled = !state.verified.phase3;

    const p4Submit = document.getElementById("p4SubmitQuiz");
    if (p4Submit) p4Submit.disabled = !state.verified.phase4;

    // Certificado
    const certTab = document.getElementById("certTab");
    if (certTab) certTab.disabled = !state.unlocked.certificate;

    const downloadBtn = document.getElementById("downloadCertBtn");
    if (downloadBtn) downloadBtn.disabled = !state.unlocked.certificate;
  }

  // ========= Navegación =========
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!btn.disabled) showView(btn.dataset.view);
    });
  });

  const startBtn = document.getElementById("startPhase1Btn");
  if (startBtn) startBtn.addEventListener("click", () => showView("phase1"));

  // ========= Bancos de preguntas =========
  const bankMap = {
    phase1: window.phase1Bank,
    phase2: window.phase2Bank,
    phase3: window.phase3Bank,
    phase4: window.phase4Bank,
  };

  // ========= Render de Quiz =========
  function renderQuiz(phaseKey, mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;

    const bank = bankMap[phaseKey];
    if (!Array.isArray(bank) || bank.length === 0) {
      mount.innerHTML = `<p class="msg">⚠️ No hay preguntas cargadas para ${phaseKey}. Revisa js/data.js.</p>`;
      return;
    }

    mount.innerHTML = bank
      .map((item, qi) => {
        const opts = item.options
          .map((opt, oi) => {
            const name = `${phaseKey}_q${qi}`;
            const id = `${name}_o${oi}`;
            return `
              <label for="${id}" style="display:block; margin:.25rem 0;">
                <input type="radio" id="${id}" name="${name}" value="${oi}">
                ${opt}
              </label>
            `;
          })
          .join("");

        return `
          <div style="margin:12px 0; padding:12px; border:1px solid rgba(255,255,255,.10); border-radius:10px;">
            <p><strong>${qi + 1}.</strong> ${item.q}</p>
            ${opts}
          </div>
        `;
      })
      .join("");
  }

  function gradeQuiz(phaseKey) {
    const bank = bankMap[phaseKey];
    if (!Array.isArray(bank) || bank.length === 0) return { ok: 0, total: 0, pct: 0 };

    let ok = 0;
    bank.forEach((item, qi) => {
      const sel = document.querySelector(`input[name="${phaseKey}_q${qi}"]:checked`);
      if (sel && Number(sel.value) === item.answerIndex) ok++;
    });

    const total = bank.length;
    const pct = Math.round((ok / total) * 100);
    return { ok, total, pct };
  }

  function setResult(resultId, text) {
    const el = document.getElementById(resultId);
    if (el) el.textContent = text;
  }

  function unlockNextAfterPass(phaseKey) {
    if (phaseKey === "phase1") state.unlocked.phase2 = true;
    if (phaseKey === "phase2") state.unlocked.phase3 = true;
    if (phaseKey === "phase3") state.unlocked.phase4 = true;
    if (phaseKey === "phase4") state.unlocked.certificate = true;
  }

  function nextViewOf(phaseKey) {
    if (phaseKey === "phase1") return "phase2";
    if (phaseKey === "phase2") return "phase3";
    if (phaseKey === "phase3") return "phase4";
    if (phaseKey === "phase4") return "certificate";
    return "home";
  }

  function handleSubmit(phaseKey, resultId) {
    const { ok, total, pct } = gradeQuiz(phaseKey);
    state.scores[phaseKey] = pct;

    setResult(resultId, `Resultado: ${ok}/${total} (${pct}%)`);

    if (pct >= 80) {
      state.passed[phaseKey] = true;
      unlockNextAfterPass(phaseKey);
      save();
      refreshUI();
      showView(nextViewOf(phaseKey));
    } else {
      state.passed[phaseKey] = false;
      save();
      refreshUI();
    }
  }

  // Render quizzes
  renderQuiz("phase1", "p1Quiz");
  renderQuiz("phase2", "p2Quiz");
  renderQuiz("phase3", "p3Quiz");
  renderQuiz("phase4", "p4Quiz");

  // Submit buttons
  const p1Submit = document.getElementById("p1SubmitQuiz");
  if (p1Submit) p1Submit.addEventListener("click", () => handleSubmit("phase1", "p1QuizResult"));

  const p2Submit = document.getElementById("p2SubmitQuiz");
  if (p2Submit) p2Submit.addEventListener("click", () => handleSubmit("phase2", "p2QuizResult"));

  const p3Submit = document.getElementById("p3SubmitQuiz");
  if (p3Submit) p3Submit.addEventListener("click", () => handleSubmit("phase3", "p3QuizResult"));

  const p4Submit = document.getElementById("p4SubmitQuiz");
  if (p4Submit) p4Submit.addEventListener("click", () => handleSubmit("phase4", "p4QuizResult"));

  // ========= Verificación docente REAL (teacher-gate.js) =========
  function setMsg(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function applyGateState(phaseNum) {
    const phaseKey = `phase${phaseNum}`;
    const submit = document.getElementById(`p${phaseNum}SubmitQuiz`);
    const lockMsg = document.getElementById(`p${phaseNum}TestLockMsg`);

    const unlockedToday = window.TeacherGate?.isUnlocked?.(phaseKey) === true;
    state.verified[phaseKey] = unlockedToday;

    if (submit) submit.disabled = !unlockedToday;

    if (lockMsg) {
      lockMsg.textContent = unlockedToday
        ? ""
        : "Test bloqueado. Introduce el código del docente para habilitar la corrección.";
    }
  }

  function wireGate(phaseNum) {
    const phaseKey = `phase${phaseNum}`;
    const input = document.getElementById(`p${phaseNum}CodeInput`);
    const btn = document.getElementById(`p${phaseNum}VerifyBtn`);
    const msgId = `p${phaseNum}GateMsg`;

    if (!btn || !input) return;

    btn.addEventListener("click", async () => {
      if (!window.TeacherGate?.verify) {
        setMsg(msgId, "Error: TeacherGate no está disponible.");
        return;
      }

      const code = (input.value || "").trim();
      const ok = await window.TeacherGate.verify(phaseKey, code);

      if (!ok) {
        setMsg(msgId, "Código incorrecto.");
        applyGateState(phaseNum);
        save();
        refreshUI();
        return;
      }

      window.TeacherGate.setUnlocked(phaseKey);
      setMsg(msgId, "Verificación correcta. Ya puedes realizar el test.");

      applyGateState(phaseNum);
      save();
      refreshUI();
    });

    // Estado inicial
    applyGateState(phaseNum);
  }

  wireGate(2);
  wireGate(3);
  wireGate(4);

  window.addEventListener("teacherGateUpdated", () => {
    applyGateState(2);
    applyGateState(3);
    applyGateState(4);
    save();
    refreshUI();
  });

  // ========= Certificado (botón PDF) =========
  const downloadCertBtnEl = document.getElementById("downloadCertBtn");
  if (downloadCertBtnEl) {
    downloadCertBtnEl.addEventListener("click", () => {
      if (!state.unlocked.certificate || !state.passed.phase4) {
        alert("Certificado bloqueado: debes completar todas las fases (mínimo 80%) y verificación docente.");
        return;
      }

      const studentName = (document.getElementById("studentName")?.value || "").trim() || "Alumno/a";
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

  // ========= Arranque =========
  refreshUI();
  showView("home");
})();





 
