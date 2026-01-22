function generateCertificatePDF(){
const {jsPDF}=window.jspdf;
const doc=new jsPDF();
doc.text("Certificado de aprovechamiento",20,20);
doc.save("certificado.pdf");
}
document.getElementById("downloadCertBtn").onclick=generateCertificatePDF;
