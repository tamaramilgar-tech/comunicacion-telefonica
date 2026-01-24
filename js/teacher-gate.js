https://raw.githubusercontent.com/tamaramilgar-tech/comunicacion-telefonica/main/js/teacher-gate.js
// js/teacher-gate.js
// Candado docente (aula) sin backend.
// Código = 6 caracteres de SHA-256(PIN|FASE|YYYY-MM-DD)

function tgTodayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function tgSha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const arr = Array.from(new Uint8Array(buf));
  return arr.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function tgExpectedCode(pin, phaseId, dateISO = tgTodayISO()) {
  const base = `${pin}|${phaseId}|${dateISO}`;
  const hex = await tgSha256Hex(base);
  return hex.slice(0, 6).toUpperCase();
}

function tgKey(phaseId, dateISO = tgTodayISO()) {
  return `teacher_unlock_${phaseId}_${dateISO}`;
}

function tgIsUnlocked(phaseId) {
  return localStorage.getItem(tgKey(phaseId)) === "1";
}

function tgSetUnlocked(phaseId) {
  localStorage.setItem(tgKey(phaseId), "1");
  window.dispatchEvent(new Event("teacherGateUpdated"));
}

async function tgVerify(phaseId, enteredCode, pin, dateISO = tgTodayISO()) {
  const exp = await tgExpectedCode(pin, phaseId, dateISO);
  return exp === String(enteredCode || "").trim().toUpperCase();
}

window.TeacherGate = {
  todayISO: tgTodayISO,
  expectedCode: tgExpectedCode,
  isUnlocked: tgIsUnlocked,
  setUnlocked: tgSetUnlocked,
  verify: tgVerify
};
