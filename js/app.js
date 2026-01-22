// ===============================
// NAVEGACIÓN ENTRE VISTAS
// ===============================
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

// Botones de navegación
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    if (!btn.disabled) showView(view);
  });
});

// Botón “Empezar Fase 1”
document.getElementById("startPhase1Btn").addEventListener("click", () => {
  showView("phase1");
});

// ===============================
// RENDER QUIZ
// ===============================
function renderQuiz(el, quiz, prefix) {
  el.innerHTML = "";
  quiz.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${q.q}</strong></p>` +
      q.options.map((opt, j) =>
        `<label>
          <input type="radio" name="${prefix}${i}" value="${j}">
          ${opt}
        </label><br>`
      ).join("");
    el.appendChild(div);
  });
}

// ===============================
// FASE 1
// ===============================
renderQuiz(document.getElementById("p1Quiz"), phase1Quiz, "p1");

document.getElementById("p1SubmitQuiz").addEventListener("click", () => {
  let correct = 0;
  phase1Quiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name="p1${i}"]:checked`);
    if (selected && Number(selected.value) === q.answerIndex) correct++;
  });

  const score = Math.round((correct / phase1Quiz.length) * 100);
  document.getElementById("p1QuizResult").innerText =
    `Resultado Fase 1: ${score}%`;

  if (score >= 80) {
    document.getElementById("phase2Tab").disabled = false;
    alert("✅ Fase 1 superada. Se desbloquea la Fase 2.");
  }
});

// ===============================
// FASE 2
// ===============================
renderQuiz(document.getElementById("p2Quiz"), phase2Quiz, "p2");

document.getElementById("p2SubmitQuiz").addEventListener("click", () => {
  let correct = 0;
  phase2Quiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name="p2${i}"]:checked`);
    if (selected && Number(selected.value) === q.answerIndex) correct++;
  });

  const score = Math.round((correct / phase2Quiz.length) * 100);
  document.getElementById("p2QuizResult").innerText =
    `Resultado Fase 2: ${score}%`;

  if (score >= 80) {
    document.getElementById("certTab").disabled = false;
    alert("🎉 Fase 2 superada. Certificado disponible.");
  }
});

// ===============================
// CERTIFICADO
// ===============================
document.getElementById("downloadCertBtn").addEventListener("click", () => {
  generateCertificatePDF();
});

// Vista inicial
showView("home");

