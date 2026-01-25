// js/app.js
(() => {
  "use strict";
  console.log("CARGANDO js/app.js OK");

  // ========= Configuración =========
  const MAX_ATTEMPTS = 3;            // ✅ intentos máximos
  const QUESTIONS_PER_PHASE = 15;    // ✅ preguntas por fase

  // ========= Vistas =========
  const views = {
    home: document.getElementById("view-home"),
    phase1: document.getElementById("view-phase1"),
    phase2: document.getElementById("view-phase2"),
    phase3: document.getElementById("view-phase3"),
    phase4: document.getElementById("view-phase4"),
    phase5: document.getElementById("view-phase5"),
    certificate: document.getElementById("view-certificate"),
  };

  function showView(viewId) {
    Object.values(views).forEach(v => v && v.classList.add("hidden"));
    if (views[viewId]) views[viewId].classList.remove("hidden");
  }

  // ========= Estado / Progreso =========
  const KEY = "u3_tel_progress_v5_es";
  const ATTEMPTS_KEY = "u3_tel_attempts_v1";
  const QUIZ_SHUFFLES_KEY = "u3_tel_quiz_shuffles_v1";
  const QUIZ_PICK_KEY = "u3_tel_quiz_pick_v1";
  const ACT_KEY = "u3_tel_phase5_activities_v1";

  const defaultState = {
    unlocked: { phase1: true, phase2: false, phase3: false, phase4: false, phase5: false, certificate: false },
    verified: { phase2: false, phase3: false, phase4: false, phase5: false }, // verificación docente
    passed: { phase1: false, phase2: false, phase3: false, phase4: false, phase5: false }, // aprobado >=80
    scores: { phase1: 0, phase2: 0, phase3: 0, phase4: 0, phase5: 0 }, // %
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

  // ========= Intentos =========
  const attempts = (() => {
    try { return JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || "{}"); }
    catch { return {}; }
  })();

  function saveAttempts() {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  }

  function getAttempts(phaseKey) {
    return Number(attempts[phaseKey] || 0);
  }

  function incAttempts(phaseKey) {
    attempts[phaseKey] = getAttempts(phaseKey) + 1;
    saveAttempts();
  }

  function attemptsLeft(phaseKey) {
    return Math.max(0, MAX_ATTEMPTS - getAttempts(phaseKey));
  }

  function canAttempt(phaseKey) {
    // si ya aprobó, no bloqueamos por intentos
    if (state.passed[phaseKey]) return true;
    return getAttempts(phaseKey) < MAX_ATTEMPTS;
  }

  // ========= UI =========
  function setBadge(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setResult(resultId, text) {
    const el = document.getElementById(resultId);
    if (el) el.textContent = text;
  }

  // ========= Bancos de preguntas =========
  const bankMap = {
    phase1: window.phase1Bank,
    phase2: window.phase2Bank,
    phase3: window.phase3Bank,
    phase4: window.phase4Bank,
    phase5: window.phase5Bank,
  };

  // ========= Utils =========
  function shuffleArray(arr, rng = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ========= Selección aleatoria de preguntas (15 por fase, estable) =========
  const quizPick = (() => {
    try { return JSON.parse(localStorage.getItem(QUIZ_PICK_KEY) || "{}"); }
    catch { return {}; }
  })();

  function savePick() {
    localStorage.setItem(QUIZ_PICK_KEY, JSON.stringify(quizPick));
  }

  function ensurePhasePick(phaseKey) {
    const bank = bankMap[phaseKey];
    if (!Array.isArray(bank) || bank.length === 0) return;

    const n = Math.min(QUESTIONS_PER_PHASE, bank.length);
    if (!quizPick[phaseKey] || quizPick[phaseKey].length !== n) {
      const idxs = shuffleArray(bank.map((_, i) => i)).slice(0, n);
      quizPick[phaseKey] = idxs;
      savePick();
    }
  }

  function getPhaseQuestions(phaseKey) {
    const bank = bankMap[phaseKey];
    if (!Array.isArray(bank) || bank.length === 0) return [];
    ensurePhasePick(phaseKey);
    return (quizPick[phaseKey] || []).map(i => ({ ...bank[i], __origIndex: i }));
  }

  // ========= Shuffle de opciones (anti "siempre la B") =========
  // Estructura: { phase1: [ { options:[...], correctIndex:n }, ... (por índice ORIGINAL del banco) ] , ... }
  const quizShuffles = (() => {
    try { return JSON.parse(localStorage.getItem(QUIZ_SHUFFLES_KEY) || "{}"); }
    catch { return {}; }
  })();

  function saveShuffles() {
    localStorage.setItem(QUIZ_SHUFFLES_KEY, JSON.stringify(quizShuffles));
  }

  function ensurePhaseShuffles(phaseKey) {
    const bank = bankMap[phaseKey];
    if (!Array.isArray(bank) || bank.length === 0) return;

    if (!quizShuffles[phaseKey] || quizShuffles[phaseKey].length !== bank.length) {
      quizShuffles[phaseKey] = bank.map((item) => {
        const idxs = shuffleArray(item.options.map((_, i) => i));
        const shuffledOptions = idxs.map(i => item.options[i]);
        const correctIndex = idxs.indexOf(item.answerIndex);
        return { options: shuffledOptions, correctIndex };
      });
      saveShuffles();
    }
  }

  // ========= Actividades Fase 5 =========
  const actState = (() => {
    try { return JSON.parse(localStorage.getItem(ACT_KEY) || "{}"); }
    catch { return {}; }
  })();

  function saveActs() {
    localStorage.setItem(ACT_KEY, JSON.stringify(actState));
  }

  function activitiesDone() {
    return actState.a1 === true && actState.a2 === true && actState.a3 === true;
  }

  // ========= refreshUI =========
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
      else if (v === "phase5") btn.disabled = !state.unlocked.phase5;
      else if (v === "certificate") btn.disabled = !state.unlocked.certificate;
    });

    // Badges
    setBadge("phase1Badge", state.passed.phase1 ? "FASE 1: completada" : "FASE 1: pendiente");
    setBadge("phase2Badge", state.passed.phase2 ? "FASE 2: completada" : "FASE 2: bloqueada");
    setBadge("phase3Badge", state.passed.phase3 ? "FASE 3: completada" : "FASE 3: bloqueada");
    setBadge("phase4Badge", state.passed.phase4 ? "FASE 4: completada" : "FASE 4: bloqueada");
    setBadge("phase5Badge", state.passed.phase5 ? "FASE 5: completada" : "FASE 5: bloqueada");

    // Desactivar por intentos (solo si no ha aprobado)
    ["phase1","phase2","phase3","phase4","phase5"].forEach((pk, i) => {
      const n = i + 1;
      const btn = document.getElementById(`p${n}SubmitQuiz`);
      if (!btn) return;

      // Se aplican otras reglas aparte (docente/actividades), pero si no hay intentos -> siempre disabled
      if (!canAttempt(pk)) btn.disabled = true;
    });

    // Fases 2-4: requieren verificación docente para corregir (además de intentos)
    const p2Submit = document.getElementById("p2SubmitQuiz");
    if (p2Submit) p2Submit.disabled = p2Submit.disabled || !state.verified.phase2;

    const p3Submit = document.getElementById("p3SubmitQuiz");
    if (p3Submit) p3Submit.disabled = p3Submit.disabled || !state.verified.phase3;

    const p4Submit = document.getElementById("p4SubmitQuiz");
    if (p4Submit) p4Submit.disabled = p4Submit.disabled || !state.verified.phase4;

    // Fase 5: requiere docente + actividades (además de intentos)
    const p5Submit = document.getElementById("p5SubmitQuiz");
    if (p5Submit) p5Submit.disabled = p5Submit.disabled || !state.verified.phase5 || !activitiesDone();

    // Mensaje guía Fase 5
    const p5LockMsg = document.getElementById("p5TestLockMsg");
    if (p5LockMsg) {
      if (!state.verified.phase5) {
        p5LockMsg.textContent = "Test bloqueado. Introduce el código del docente para habilitar la corrección.";
      } else if (!activitiesDone()) {
        p5LockMsg.textContent = "Completa primero las 3 actividades interactivas para habilitar la corrección del test final.";
      } else if (!canAttempt("phase5")) {
        p5LockMsg.textContent = `Sin intentos disponibles (máximo ${MAX_ATTEMPTS}).`;
      } else {
        p5LockMsg.textContent = "";
      }
    }

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

  // ========= Botón Reiniciar progreso =========
  const resetBtn = document.getElementById("resetProgressBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const ok = confirm("¿Reiniciar progreso de esta unidad en ESTE navegador? (No afecta a otros dispositivos)");
      if (!ok) return;

      Object.keys(localStorage)
        .filter(k =>
          k.includes("u3_tel_progress") ||
          k.startsWith("teacher_unlock_") ||
          k.toLowerCase().includes("teachergate") ||
          k === ATTEMPTS_KEY ||
          k === QUIZ_SHUFFLES_KEY ||
          k === QUIZ_PICK_KEY ||
          k === ACT_KEY
        )
        .forEach(k => localStorage.removeItem(k));

      location.reload();
    });
  }

  // ========= Render de Quiz (15 preguntas por fase) =========
  function renderQuiz(phaseKey, mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;

    const questions = getPhaseQuestions(phaseKey);
    if (!Array.isArray(questions) || questions.length === 0) {
      mount.innerHTML = `<p class="msg">⚠️ No hay preguntas cargadas para ${phaseKey}. Revisa js/data.js.</p>`;
      return;
    }

    // asegura shuffle por banco completo; luego usamos el shuffle del índice original
    ensurePhaseShuffles(phaseKey);
    const phaseShuffle = quizShuffles[phaseKey] || [];

    mount.innerHTML = questions
      .map((item, qi) => {
        const orig = item.__origIndex ?? qi;
        const shuffled = phaseShuffle?.[orig];
        const optionsToUse = shuffled?.options || item.options;

        const name = `${phaseKey}_q${qi}`; // ojo: qi es índice dentro del SUBSET (15)
        const opts = optionsToUse
          .map((opt, oi) => {
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
    const questions = getPhaseQuestions(phaseKey);
    if (!Array.isArray(questions) || questions.length === 0) return { ok: 0, total: 0, pct: 0 };

    ensurePhaseShuffles(phaseKey);
    const phaseShuffle = quizShuffles[phaseKey] || [];

    let ok = 0;
    questions.forEach((item, qi) => {
      const sel = document.querySelector(`input[name="${phaseKey}_q${qi}"]:checked`);
      const orig = item.__origIndex ?? qi;
      const correct = phaseShuffle?.[orig]?.correctIndex ?? item.answerIndex;
      if (sel && Number(sel.value) === correct) ok++;
    });

    const total = questions.length;
    const pct = Math.round((ok / total) * 100);
    return { ok, total, pct };
  }

  function unlockNextAfterPass(phaseKey) {
    if (phaseKey === "phase1") state.unlocked.phase2 = true;
    if (phaseKey === "phase2") state.unlocked.phase3 = true;
    if (phaseKey === "phase3") state.unlocked.phase4 = true;
    if (phaseKey === "phase4") state.unlocked.phase5 = true;
    if (phaseKey === "phase5") state.unlocked.certificate = true;
  }

  function nextViewOf(phaseKey) {
    if (phaseKey === "phase1") return "phase2";
    if (phaseKey === "phase2") return "phase3";
    if (phaseKey === "phase3") return "phase4";
    if (phaseKey === "phase4") return "phase5";
    if (phaseKey === "phase5") return "certificate";
    return "home";
  }

  function handleSubmit(phaseKey, resultId) {
    // Intentos
    if (!canAttempt(phaseKey)) {
      setResult(resultId, `❌ Sin intentos disponibles. (Máximo ${MAX_ATTEMPTS})`);
      refreshUI();
      return;
    }

    incAttempts(phaseKey);

    const { ok, total, pct } = gradeQuiz(phaseKey);
    state.scores[phaseKey] = pct;

    setResult(resultId, `Resultado: ${ok}/${total} (${pct}%) — Intentos restantes: ${attemptsLeft(phaseKey)}`);

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

  // ========= Render inicial de quizzes =========
  renderQuiz("phase1", "p1Quiz");
  renderQuiz("phase2", "p2Quiz");
  renderQuiz("phase3", "p3Quiz");
  renderQuiz("phase4", "p4Quiz");
  renderQuiz("phase5", "p5Quiz");

  // ========= Botones de corrección =========
  const p1Submit = document.getElementById("p1SubmitQuiz");
  if (p1Submit) p1Submit.addEventListener("click", () => handleSubmit("phase1", "p1QuizResult"));

  const p2Submit = document.getElementById("p2SubmitQuiz");
  if (p2Submit) p2Submit.addEventListener("click", () => handleSubmit("phase2", "p2QuizResult"));

  const p3Submit = document.getElementById("p3SubmitQuiz");
  if (p3Submit) p3Submit.addEventListener("click", () => handleSubmit("phase3", "p3QuizResult"));

  const p4Submit = document.getElementById("p4SubmitQuiz");
  if (p4Submit) p4Submit.addEventListener("click", () => handleSubmit("phase4", "p4QuizResult"));

  const p5Submit = document.getElementById("p5SubmitQuiz");
  if (p5Submit) p5Submit.addEventListener("click", () => handleSubmit("phase5", "p5QuizResult"));

  // ========= Verificación docente =========
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

    if (submit) {
      if (phaseNum === 5) submit.disabled = !unlockedToday || !activitiesDone() || !canAttempt("phase5");
      else submit.disabled = !unlockedToday || !canAttempt(phaseKey);
    }

    if (lockMsg && phaseNum !== 5) {
      if (!unlockedToday) lockMsg.textContent = "Test bloqueado. Introduce el código del docente para habilitar la corrección.";
      else if (!canAttempt(phaseKey)) lockMsg.textContent = `Sin intentos disponibles (máximo ${MAX_ATTEMPTS}).`;
      else lockMsg.textContent = "";
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

    applyGateState(phaseNum);
  }

  wireGate(2);
  wireGate(3);
  wireGate(4);
  wireGate(5);

  window.addEventListener("teacherGateUpdated", () => {
    applyGateState(2);
    applyGateState(3);
    applyGateState(4);
    applyGateState(5);
    save();
    refreshUI();
  });

  // ========= Certificado =========
  function canGenerateCertificate() {
    const passedAll = state.passed.phase1 && state.passed.phase2 && state.passed.phase3 && state.passed.phase4 && state.passed.phase5;
    const verifiedAll = state.verified.phase2 && state.verified.phase3 && state.verified.phase4 && state.verified.phase5;
    return passedAll && verifiedAll && state.unlocked.certificate;
  }

  const downloadCertBtnEl = document.getElementById("downloadCertBtn");
  if (downloadCertBtnEl) {
    downloadCertBtnEl.addEventListener("click", () => {
      if (!canGenerateCertificate()) {
        alert("Certificado bloqueado: debes completar todas las fases (mínimo 80%) y verificación docente.");
        refreshUI();
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
        resultP5: state.scores.phase5,
      });
    });
  }

  // ========= FASE 5: Actividades interactivas =========
  function mountAct1() {
    const mount = document.getElementById("p5Act1");
    if (!mount) return;

    const correctOrder = [
      "Saludo e identificación",
      "Motivo de la llamada (escucha activa)",
      "Confirmación de datos / acuerdos",
      "Cierre: resumen + despedida"
    ];

    if (!actState.act1Items) {
      actState.act1Items = shuffleArray(correctOrder);
      saveActs();
    }

    function render() {
      mount.innerHTML = actState.act1Items.map((t, i) => `
        <div style="display:flex; gap:8px; align-items:center; margin:6px 0; padding:10px; border:1px solid rgba(255,255,255,.10); border-radius:10px;">
          <div style="flex:1;">${i + 1}. ${t}</div>
          <button data-move="up" data-i="${i}">↑</button>
          <button data-move="down" data-i="${i}">↓</button>
        </div>
      `).join("");

      mount.querySelectorAll("button[data-move]").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = Number(btn.dataset.i);
          const dir = btn.dataset.move;
          const arr = actState.act1Items;
          const j = dir === "up" ? i - 1 : i + 1;
          if (j < 0 || j >= arr.length) return;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          saveActs();
          render();
          refreshUI();
        });
      });
    }

    render();

    const checkBtn = document.getElementById("p5Act1Check");
    const msg = document.getElementById("p5Act1Msg");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => {
        const ok = actState.act1Items.join("|") === correctOrder.join("|");
        actState.a1 = ok;
        saveActs();
        if (msg) msg.textContent = ok ? "✅ Actividad 1 correcta." : "❌ Aún no. Revisa el orden.";
        refreshUI();
      });
    }
  }

  function mountAct2() {
    const mount = document.getElementById("p5Act2");
    if (!mount) return;

    const pairs = [
      ["Escucha activa", "Reformular y confirmar lo entendido"],
      ["Transferencia", "Derivar explicando motivo y destino"],
      ["Cierre de llamada", "Resumen + próximos pasos + despedida"]
    ];

    if (!actState.act2) {
      actState.act2 = {};
      saveActs();
    }

    const definitions = shuffleArray(pairs.map(p => p[1]));

    mount.innerHTML = pairs.map(([term]) => `
      <div style="margin:8px 0; padding:10px; border:1px solid rgba(255,255,255,.10); border-radius:10px;">
        <strong>${term}</strong><br/>
        <select data-term="${term}" style="margin-top:8px; padding:8px; border-radius:8px;">
          <option value="">-- Elige definición --</option>
          ${definitions.map(d => `<option value="${d}">${d}</option>`).join("")}
        </select>
      </div>
    `).join("");

    mount.querySelectorAll("select").forEach(sel => {
      const term = sel.dataset.term;
      sel.value = actState.act2[term] || "";
      sel.addEventListener("change", () => {
        actState.act2[term] = sel.value;
        saveActs();
        refreshUI();
      });
    });

    const checkBtn = document.getElementById("p5Act2Check");
    const msg = document.getElementById("p5Act2Msg");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => {
        const ok = pairs.every(([term, def]) => (actState.act2?.[term] || "") === def);
        actState.a2 = ok;
        saveActs();
        if (msg) msg.textContent = ok ? "✅ Actividad 2 correcta." : "❌ Hay emparejamientos incorrectos.";
        refreshUI();
      });
    }
  }

  function mountAct3() {
    const mount = document.getElementById("p5Act3");
    if (!mount) return;

    const q = {
      text: "Un cliente está molesto porque no le devolvieron la llamada. ¿Cuál es la mejor respuesta inicial?",
      options: [
        "No es mi culpa, tendría que haber insistido.",
        "Entiendo la situación, disculpe la molestia. Voy a revisar el caso y le digo los siguientes pasos.",
        "Si está enfadado, mejor llame otro día.",
        "Eso lo lleva otro departamento, adiós."
      ],
      correct: 1
    };

    if (actState.act3Sel === undefined) actState.act3Sel = null;

    mount.innerHTML = `
      <div style="margin:8px 0; padding:12px; border:1px solid rgba(255,255,255,.10); border-radius:10px;">
        <p><strong>${q.text}</strong></p>
        ${q.options.map((opt, i) => `
          <label style="display:block; margin:.35rem 0;">
            <input type="radio" name="p5act3" value="${i}" ${String(actState.act3Sel) === String(i) ? "checked" : ""}>
            ${opt}
          </label>
        `).join("")}
      </div>
    `;

    mount.querySelectorAll('input[name="p5act3"]').forEach(r => {
      r.addEventListener("change", () => {
        actState.act3Sel = Number(r.value);
        saveActs();
        refreshUI();
      });
    });

    const checkBtn = document.getElementById("p5Act3Check");
    const msg = document.getElementById("p5Act3Msg");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => {
        const ok = Number(actState.act3Sel) === q.correct;
        actState.a3 = ok;
        saveActs();
        if (msg) msg.textContent = ok ? "✅ Actividad 3 correcta." : "❌ No es la mejor respuesta profesional.";
        refreshUI();
      });
    }
  }

  // Montar actividades fase 5 (si existen en el HTML)
  mountAct1();
  mountAct2();
  mountAct3();

  // ========= Arranque =========
  refreshUI();
  showView("home");
})();
