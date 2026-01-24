https://raw.githubusercontent.com/tamaramilgar-tech/comunicacion-telefonica/main/js/app.js
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
  Object.values(views).forEach(v => v.classList.add("hidden"));
  views[viewId].classList.remove("hidden");
}

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!btn.disabled) showView(btn.dataset.view);
  });
});

document.getElementById("startPhase1Btn").addEventListener("click", () => showView("phase1"));

// =====================
// Estado
// =====================
const KEY = "ct_unit3_state_v2";
const state = JSON.parse(localStorage.getItem(KEY) || "{}");

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// Badges/tabs
const phase1Badge = document.getElementById("phase1Badge");
const phase2Badge = document.getElementById("phase2Badge");
const phase3Badge = document.getElementById("phase3Badge");
const phase4Badge = document.getElementById("phase4Badge");

const phase2Tab = document.getElementById("phase2Tab");
const phase3Tab = document.getElementById("phase3Tab");
const phase4Tab = document.getElementById("phase4Tab");
const certTab = document.getElementById("certTab");

function refreshBadges() {
  // F1 -> habilita F2
  if (state.p1Passed) {
    phase1Badge.textContent = `FASE 1: superada (${state.p1Score}%)`;
    phase2Tab.disabled = false;
    phase2Badge.textContent = state.p2Passed ? `FASE 2: superada (${state.p2Score}%)` : `FASE 2: pendiente`;
  } else {
    phase1Badge.textContent = "FASE 1: pendiente";
    phase2Badge.textContent = "FASE 2: bloqueada";
    phase2Tab.disabled = true;
  }

  // F2 -> habilita F3
  if (state.p2Passed) {
    phase3Tab.disabled = false;
    phase3Badge.textContent = state.p3Passed ? `FASE 3: superada (${state.p3Score}%)` : `FASE 3: pendiente`;
  } else {
    phase3Badge.textContent = "FASE 3: bloqueada";
    phase3Tab.disabled = true;
  }

  // F3 -> habilita F4
  if (state.p3Passed) {
    phase4Tab.disabled = false;
    phase4Badge.textContent = state.p4Passed ? `FASE 4: superada (${state.p4Score}%)` : `FASE 4: pendiente`;
  } else {
    phase4Badge.textContent = "FASE 4: bloqueada";
    phase4Tab.disabled = true;
  }

  // Certificado
  certTab.disabled = !(state.p1Passed && state.p2Passed && state.p3Passed && state.p4Passed);
}

// =====================
// Utilidades aleatorias
// =====================
function cryptoRandomInt(maxExclusive) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % maxExclusive;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = cryptoRandomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleWithoutReplacement(items, n) {
  if (n > items.length) throw new Error("No hay suficientes preguntas en el banco.");
  const copy = [...items];
  const picked = [];
  for (let i = 0; i < n; i++) {
    const idx = cryptoRandomInt(copy.length);
    picked.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return picked;
}

function shuffleQuestionOptions(q) {
  const indexed = q.options.map((text, idx) => ({ text, idx }));
  const shuffled = shuffleArray(indexed);
  const newAnswerIndex = shuffled.findIndex(x => x.idx === q.answerIndex);
  return { ...q, options: shuffled.map(x => x.text), answerIndex: newAnswerIndex };
}

function makeAttempt(bank, n = 10) {
  const selected = sampleWithoutReplacement(bank, n).map(shuffleQuestionOptions);
  return shuffleArray(selected);
}

// =====================
// Quiz render/corrección
// =====================
function renderQuiz(containerId, quiz, prefix) {
  const el = document.getElementById(containerId);
  el.innerHTML = "";
  quiz.forEach((q, i) => {
    const block = document.createElement("div");
    block.style.marginBottom = "16px";
    block.innerHTML =
      `<p><strong>${q.q}</strong></p>` +
      q.options.map((opt, j) => `
        <label style="display:block;margin:6px 0">
          <input type="radio" name="${prefix}${i}" value="${j}"> ${opt}
        </label>
      `).join("");
    el.appendChild(block);
  });
}

function gradeQuiz(quiz, prefix) {
  let correct = 0;
  quiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name="${prefix}${i}"]:checked`);
    if (selected && Number(selected.value) === q.answerIndex) correct++;
  });
  return Math.round((correct / quiz.length) * 100);
}

// =====================
// Candado docente (F2-F4)
// =====================
function wireTeacherGate({ phaseId, inputId, btnId, msgId, submitBtnId, lockMsgId }) {
  const codeInput = document.getElementById(inputId);
  const verifyBtn = document.getElementById(btnId);
  const msg = document.getElementById(msgId);
  const submitBtn = document.getElementById(submitBtnId);
  const lockMsg = document.getElementById(lockMsgId);

  function refresh() {
    const ok = window.TeacherGate.isUnlocked(phaseId);
    submitBtn.disabled = !ok;
    lockMsg.textContent = ok ? "" : "Test bloqueado: requiere verificación del docente (entrega en EVAGD).";
    msg.textContent = ok ? "✔ Verificación registrada (hoy)." : "";
  }

  verifyBtn.addEventListener("click", async () => {
    const pin = prompt("PIN DOCENTE (solo docente):");
    if (!pin) return;

    const ok = await window.TeacherGate.verify(phaseId, codeInput.value, pin);
    if (ok) {
      window.TeacherGate.setUnlocked(phaseId);
      msg.textContent = "✔ Código correcto. Test desbloqueado.";
      codeInput.value = "";
      refresh();
    } else {
      msg.textContent = "✖ Código incorrecto. Revisa el código o la fecha.";
    }
  });

  window.addEventListener("teacherGateUpdated", refresh);
  refresh();
}

// =====================
// Intentos aleatorios (10 preguntas) por fase
// =====================
const p1Attempt = makeAttempt(phase1Bank, 10);
const p2Attempt = makeAttempt(phase2Bank, 10);
const p3Attempt = makeAttempt(phase3Bank, 10);
const p4Attempt = makeAttempt(phase4Bank, 10);

renderQuiz("p1Quiz", p1Attempt, "p1");
renderQuiz("p2Quiz", p2Attempt, "p2");
renderQuiz("p3Quiz", p3Attempt, "p3");
renderQuiz("p4Quiz", p4Attempt, "p4");

// Candados docente
wireTeacherGate({ phaseId:"FASE2", inputId:"p2CodeInput", btnId:"p2VerifyBtn", msgId:"p2GateMsg", submitBtnId:"p2SubmitQuiz", lockMsgId:"p2TestLockMsg" });
wireTeacherGate({ phaseId:"FASE3", inputId:"p3CodeInput", btnId:"p3VerifyBtn", msgId:"p3GateMsg", submitBtnId:"p3SubmitQuiz", lockMsgId:"p3TestLockMsg" });
wireTeacherGate({ phaseId:"FASE4", inputId:"p4CodeInput", btnId:"p4VerifyBtn", msgId:"p4GateMsg", submitBtnId:"p4SubmitQuiz", lockMsgId:"p4TestLockMsg" });

// =====================
// Fases
// =====================
document.getElementById("p1SubmitQuiz").addEventListener("click", () => {
  const score = gradeQuiz(p1Attempt, "p1");
  document.getElementById("p1QuizResult").textContent = `Resultado Fase 1: ${score}%`;

  state.p1Score = score;
  state.p1Passed = score >= 80;
  save();
  refreshBadges();

  if (state.p1Passed) {
    alert("✅ Fase 1 superada. Se desbloquea la Fase 2.");
    showView("phase2");
  }
});

document.getElementById("p2SubmitQuiz").addEventListener("click", () => {
  const score = gradeQuiz(p2Attempt, "p2");
  document.getElementById("p2QuizResult").textContent = `Resultado Fase 2: ${score}%`;

  state.p2Score = score;
  state.p2Passed = score >= 80;
  save();
  refreshBadges();

  if (state.p2Passed) {
    alert("✅ Fase 2 superada. Se desbloquea la Fase 3.");
    showView("phase3");
  }
});

document.getElementById("p3SubmitQuiz").addEventListener("click", () => {
  const score = gradeQuiz(p3Attempt, "p3");
  document.getElementById("p3QuizResult").textContent = `Resultado Fase 3: ${score}%`;

  state.p3Score = score;
  state.p3Passed = score >= 80;
  save();
  refreshBadges();

  if (state.p3Passed) {
    alert("✅ Fase 3 superada. Se desbloquea la Fase 4.");
    showView("phase4");
  }
});

document.getElementById("p4SubmitQuiz").addEventListener("click", () => {
  const score = gradeQuiz(p4Attempt, "p4");
  document.getElementById("p4QuizResult").textContent = `Resultado Fase 4: ${score}%`;

  state.p4Score = score;
  state.p4Passed = score >= 80;
  save();
  refreshBadges();

  if (state.p4Passed) {
    alert("🎉 Fase 4 superada. Certificado disponible.");
    showView("certificate");
  }
});

// =====================
// Certificado
// =====================
document.getElementById("downloadCertBtn").addEventListener("click", () => {
  const studentName = document.getElementById("studentName").value.trim();
  if (!studentName) {
    alert("Escribe tu nombre arriba antes de descargar el certificado.");
    return;
  }
  if (!(state.p1Passed && state.p2Passed && state.p3Passed && state.p4Passed)) {
    alert("Debes superar Fase 1–4 (≥80%) para descargar el certificado.");
    return;
  }

  generateCertificatePDF({
    studentName,
    unitName: UNIT_NAME,
    resultP1: state.p1Score,
    resultP2: state.p2Score,
    resultP3: state.p3Score,
    resultP4: state.p4Score
  });
});

// Arranque
refreshBadges();
showView("home");


