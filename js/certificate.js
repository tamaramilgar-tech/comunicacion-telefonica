function generateCertificatePDF({ studentName, unitName, resultP1, resultP2 }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const d = new Date();
  const dateStr = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;

  doc.setFontSize(18);
  doc.text("CERTIFICADO DE APROVECHAMIENTO", 20, 25);

  doc.setFontSize(12);
  doc.text(`Nombre del alumno/a: ${studentName}`, 20, 55);
  doc.text(`Unidad: ${unitName}`, 20, 75);
  doc.text(`Resultado FASE 1: ${resultP1}%`, 20, 95);
  doc.text(`Resultado FASE 2: ${resultP2}%`, 20, 115);
  doc.text(`Fecha: ${dateStr}`, 20, 135);

  doc.setFontSize(12);
  doc.text("Superado con éxito (≥80%)", 20, 165);

  doc.save(`Certificado_${studentName.replace(/\s+/g,"_")}.pdf`);
}

