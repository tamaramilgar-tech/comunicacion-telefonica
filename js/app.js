// Navegación
const views = {
  home: document.getElementById("view-home"),
  phase1: document.getElementById("view-phase1"),
  phase2: document.getElementById("view-phase2"),
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

// Estado
const KEY = "ct_unit3_state_v2";
const state = JSON.parse(localStorage.getItem(KEY) || "{}");

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

const phase1Badge = document.getElementById("phase1Badge");
const phase2Badge = document.getElementById("phase2Badge");
const phase2Tab = document.getElementById("phase2Tab");
const certTab = document.getElementById("certTab");

function refreshBadges() {
  if (state.p1Passed) {
    phase1Badge.textContent = `FASE 1: superada (${state.p1Score}%)`;
    phase2Tab.disabled = false;
    phase2Badge.textContent = state.p2Passed
      ? `FASE 2: superada (${state.p2Score}%)`
      : `FASE 2: pendiente`;
  } else {
    phase1Badge.textContent = "FASE 1: pendiente";
    phase2Badge.textContent = "FASE 2: bloqueada";
    phase2Tab.disabled = true;
  }
  certTab.disabled = !(state.p1Passed && state.p2Passed);
}

// Quiz
function renderQuiz(containerId, quiz, prefix) {
  const el = document.getElementById(containerId);
  el.innerHTML = "";
  quiz.forEach((q, i) => {
    const block = document.createElement("div");
    block.style.marginBottom = "16px";
    block.innerHTML = `<p><strong>${q.q}</strong></p>` +
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

renderQuiz("p1Quiz", phase1Quiz, "p1");
renderQuiz("p2Quiz", phase2Quiz, "p2");

// Fase 1
document.getElementById("p1SubmitQuiz").addEventListener("click", () => {
  const score = gradeQuiz(phase1Quiz, "p1");
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

// Fase 2
document.getElementById("p2SubmitQuiz").addEventListener("click", () => {
  const score = gradeQuiz(phase2Quiz, "p2");
  document.getElementById("p2QuizResult").textContent = `Resultado Fase 2: ${score}%`;

  state.p2Score = score;
  state.p2Passed = score >= 80;
  save();
  refreshBadges();

  if (state.p2Passed) {
    alert("🎉 Fase 2 superada. Certificado disponible.");
    showView("certificate");
  }
});

// Certificado
document.getElementById("downloadCertBtn").addEventListener("click", () => {
  const studentName = document.getElementById("studentName").value.trim();
  if (!studentName) {
    alert("Escribe tu nombre arriba antes de descargar el certificado.");
    return;
  }
  if (!(state.p1Passed && state.p2Passed)) {
    alert("Debes superar Fase 1 y Fase 2 (≥80%) para descargar el certificado.");
    return;
  }

  generateCertificatePDF({
    studentName,
    unitName: UNIT_NAME,
    resultP1: state.p1Score,
    resultP2: state.p2Score
  });
});

// Arranque
refreshBadges();
showView("home");


