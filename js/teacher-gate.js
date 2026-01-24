// js/teacher-gate.js
// Candado docente (aula) sin backend.
// Código = 6 caracteres de SHA-256(PIN|FASE|YYYY-MM-DD)
(() => {
  function tgTodayISO() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function tgNorm(text) {
    return String(text || "").trim().toUpperCase();
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

  function tgIsUnlocked(phaseId, dateISO = tgTodayISO()) {
    return localStorage.getItem(tgKey(phaseId, dateISO)) === "1";
  }

  function tgSetUnlocked(phaseId, dateISO = tgTodayISO()) {
    localStorage.setItem(tgKey(phaseId, dateISO), "1");
    window.dispatchEvent(new Event("teacherGateUpdated"));
  }

  async function tgVerify(phaseId, enteredCode, pin, dateISO = tgTodayISO()) {
    const exp = await tgExpectedCode(pin, phaseId, dateISO);
    return exp === tgNorm(enteredCode);
  }

  window.TeacherGate = {
    todayISO: tgTodayISO,
    expectedCode: tgExpectedCode,
    isUnlocked: tgIsUnlocked,
    setUnlocked: tgSetUnlocked,
    verify: tgVerify
  };
})();
