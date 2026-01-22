function renderQuiz(el,quiz,prefix){
el.innerHTML="";
quiz.forEach((q,i)=>{
el.innerHTML+=`<p>${q.q}</p>`+q.options.map((o,j)=>`<label><input type=radio name=${prefix+i} value=${j}>${o}</label>`).join("");
});
}
renderQuiz(document.getElementById("p1Quiz"),phase1Quiz,"p1");
renderQuiz(document.getElementById("p2Quiz"),phase2Quiz,"p2");
