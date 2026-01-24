https://raw.githubusercontent.com/tamaramilgar-tech/comunicacion-telefonica/main/js/data.js
const UNIT_NAME = "Unidad 3 · Comunicación telefónica";

/**
 * Formato:
 * { q: "Texto", options: ["A","B","C","D"], answerIndex: 0..3 }
 *
 * Bancos: 30 preguntas por fase (anti-copia).
 * El motor en app.js selecciona 10 aleatorias y baraja opciones.
 */

// =====================
// FASE 1 · Conceptos y protocolo (30)
// =====================
const phase1Bank = [
  { q:"¿Cuál es el objetivo principal del saludo profesional en una llamada?", options:["Cerrar la llamada rápido","Identificar y generar confianza","Evitar preguntas","Pedir datos bancarios"], answerIndex:1 },
  { q:"En una llamada entrante, ¿qué inicio es más profesional?", options:["¿Sí?","Buenos días, Empresa X, le atiende…","Dime","¿Qué quieres?"], answerIndex:1 },
  { q:"La escucha activa incluye principalmente…", options:["Interrumpir para agilizar","Reformular y confirmar","Hablar más alto","Evitar tomar notas"], answerIndex:1 },
  { q:"¿Qué NO forma parte del protocolo básico telefónico?", options:["Saludo","Identificación","Despedida","Jerga técnica obligatoria"], answerIndex:3 },
  { q:"Ante un cliente enfadado, lo más adecuado es…", options:["Discutir","Cortar","Mantener calma y empatía","Ignorar"], answerIndex:2 },
  { q:"Confirmar datos durante la llamada sirve para…", options:["Rellenar tiempo","Evitar errores y asegurar seguimiento","Vender más","No registrar nada"], answerIndex:1 },
  { q:"El tono adecuado en llamada profesional debe ser…", options:["Irónico","Claro, cordial y firme","Agresivo","Excesivamente informal"], answerIndex:1 },
  { q:"En atención telefónica, el lenguaje debe ser…", options:["Rápido aunque no se entienda","Claro y adaptado al interlocutor","Con muletillas","Siempre en voz baja"], answerIndex:1 },
  { q:"Antes de transferir una llamada conviene…", options:["Transferir sin avisar","Explicar motivo y confirmar destino","Colgar y llamar luego","Evitar dar contexto"], answerIndex:1 },
  { q:"Una despedida profesional incluye…", options:["Colgar sin decir nada","Agradecer y confirmar próximos pasos","Cambiar de tema","Pedir datos personales innecesarios"], answerIndex:1 },
  { q:"¿Cuál es una barrera típica en llamada?", options:["Ruido/interferencias","Resumen final","Escucha activa","Tono cordial"], answerIndex:0 },
  { q:"Para evitar malentendidos al final, es recomendable…", options:["No resumir","Resumir acuerdos y acciones","Prometer sin concretar","Cambiar información al final"], answerIndex:1 },
  { q:"Si la persona destinataria no está disponible, lo correcto es…", options:["Decir que no vuelva a llamar","Tomar nota y ofrecer alternativa","Inventar que siempre está ocupada","Dar su móvil personal"], answerIndex:1 },
  { q:"Una pregunta abierta sirve para…", options:["Cortar la conversación","Obtener información detallada","Evitar que el cliente hable","Confundir"], answerIndex:1 },
  { q:"Mejora la calidad telefónica…", options:["No registrar nada","Tener info/guion orientativo a mano","Hablar siempre más rápido","No confirmar"], answerIndex:1 },
  { q:"Dato clave para devolver una llamada:", options:["DNI","Nombre y contacto","Salario","Dirección completa siempre"], answerIndex:1 },
  { q:"Interrupción poco profesional:", options:["Pedir permiso para espera","Hablar encima del interlocutor","Confirmar lo entendido","Agradecer"], answerIndex:1 },
  { q:"Al poner a alguien en espera, lo correcto es…", options:["Dejarlo sin avisar","Pedir permiso y estimar tiempo","Colgar","Poner música muy alta"], answerIndex:1 },
  { q:"Confidencialidad en A&F implica…", options:["Dar datos a cualquiera","Verificar identidad antes de datos sensibles","Compartir contraseñas","Enviar info por cualquier canal"], answerIndex:1 },
  { q:"Si no sabes responder, lo profesional es…", options:["Inventar","Derivar y registrar para respuesta","Decir 'no sé' y colgar","Culpar al cliente"], answerIndex:1 },
  { q:"¿Qué es correcto sobre el ritmo de habla?", options:["Cuanto más rápido mejor","Adecuado y comprensible","Siempre muy lento","Da igual"], answerIndex:1 },
  { q:"¿Qué es un 'cierre' de llamada?", options:["Volver a presentarte","Confirmar acuerdos y despedirte","Pedir opinión política","Cambiar a otro tema"], answerIndex:1 },
  { q:"¿Qué mejora la imagen corporativa?", options:["Tono brusco","Cortesía y profesionalidad","Responder con prisa","No saludar"], answerIndex:1 },
  { q:"En llamadas, la cortesía se muestra con…", options:["Órdenes directas","Fórmulas de cortesía y respeto","Sarcasmo","Silencio"], answerIndex:1 },
  { q:"Una buena atención telefónica busca…", options:["Evitar resolver","Resolver o encauzar eficazmente","Alargar llamadas","Responder sin escuchar"], answerIndex:1 },
  { q:"Registrar llamadas ayuda a…", options:["Olvidar acuerdos","Trazabilidad y seguimiento","No trabajar","Evitar responsabilidad"], answerIndex:1 },
  { q:"Si hay datos confusos, conviene…", options:["Asumir","Pedir aclaración y confirmar","Ignorar","Cambiar de tema"], answerIndex:1 },
  { q:"Al atender, identificarse significa…", options:["Decir tu apodo","Empresa y persona/puesto","No decir nada","Dar datos privados"], answerIndex:1 },
  { q:"En administración, información sensible se comparte…", options:["Por cualquier canal","Solo por canales autorizados y verificados","Por redes sociales","En altavoz siempre"], answerIndex:1 },
  { q:"Una norma clave de profesionalidad:", options:["Hablar encima","Escuchar, confirmar y actuar","Colgar rápido","No tomar nota"], answerIndex:1 }
];

// =====================
// FASE 2 · Audio: atención telefónica (30)
// =====================
const phase2Bank = [
  { q:"En una llamada comercial, antes de ofrecer una solución debes…", options:["Interrumpir","Escuchar y confirmar el motivo","Cambiar el tema","Pedir datos bancarios"], answerIndex:1 },
  { q:"Si el cliente llama por una queja, el primer paso es…", options:["Discutir","Escuchar y empatizar","Colgar","Ignorar"], answerIndex:1 },
  { q:"¿Qué técnica ayuda a conducir la llamada sin agresividad?", options:["Cortar al cliente","Estructurar: motivo→opciones→acuerdo","Hablar más alto","No preguntar"], answerIndex:1 },
  { q:"Al concertar una cita, es imprescindible…", options:["No confirmar fecha","Confirmar fecha/hora/lugar y contacto","Dar hora aproximada sin más","No registrar"], answerIndex:1 },
  { q:"Si necesitas revisar info durante la llamada…", options:["Espera sin avisar","Pide permiso y explica brevemente","Cuelga y busca","Di 'espere' sin más"], answerIndex:1 },
  { q:"En una llamada de seguimiento comercial conviene…", options:["No presentarse","Recordar contacto previo y objetivo","Hablar solo de ti","Evitar confirmar necesidades"], answerIndex:1 },
  { q:"Debes evitar en comunicación oral…", options:["Claridad","Muletillas constantes","Tono cordial","Confirmación"], answerIndex:1 },
  { q:"Si piden información sensible (facturas/datos)…", options:["Dar sin más","Verificar identidad y canal autorizado","Enviar por WhatsApp personal","Decirlo en voz alta con gente"], answerIndex:1 },
  { q:"Cierre profesional de llamada:", options:["Chao","Gracias por su llamada, quedo a su disposición","Vale, adiós","Ya veremos"], answerIndex:1 },
  { q:"Mejora la satisfacción en incidencias…", options:["Prometer sin plazos","Acordar próximos pasos y plazos realistas","No registrar","Culpar a otro"], answerIndex:1 },
  { q:"En llamada de cobro (A&F) el enfoque correcto es…", options:["Amenazante","Firme y respetuoso, basado en datos","Humillante","Agresivo"], answerIndex:1 },
  { q:"Para evitar errores con importes/fechas conviene…", options:["No repetir","Repetir y confirmar","Asumir","Pedirlo por audio"], answerIndex:1 },
  { q:"Señal clara de escucha activa:", options:["Silencio total","Parafrasear lo entendido","Interrumpir","Cambiar tema"], answerIndex:1 },
  { q:"Si la llamada se alarga sin avanzar…", options:["Seguir sin rumbo","Reconducir y acordar acciones","Colgar","Decir que no importa"], answerIndex:1 },
  { q:"Si te equivocas en una información…", options:["Ocultarlo","Rectificar y pedir disculpas","Culpar al cliente","Mantener el error"], answerIndex:1 },
  { q:"Tras la llamada en atención al cliente…", options:["No registrar","Registrar incidencia/acuerdo","Borrar datos","No confirmar seguimiento"], answerIndex:1 },
  { q:"Actitud que transmite profesionalidad:", options:["Prisa","Voz calmada y estructurada","Ironía","Desprecio"], answerIndex:1 },
  { q:"Si no puedes atender ahora…", options:["Cuelga","Ofrece devolución y toma datos","Da número personal","Di que no llamen"], answerIndex:1 },
  { q:"Transferencia correcta incluye…", options:["Sin avisar","Explicar por qué y con quién","Cortar antes","No dar contexto"], answerIndex:1 },
  { q:"Mejora el mensaje final…", options:["No resumir","Resumir acuerdos y confirmar contacto","Evitar despedida","Hablar más rápido"], answerIndex:1 },
  { q:"En una consulta, preguntar '¿Podría concretar…?' es…", options:["Maleducado","Aclaración profesional","Señal de debilidad","Innecesario"], answerIndex:1 },
  { q:"Si hay ruido o mala cobertura lo correcto es…", options:["Seguir igual","Indicarlo y pedir repetir/confirmar","Culpar al cliente","Colgar"], answerIndex:1 },
  { q:"En una llamada comercial, detectar necesidades implica…", options:["Hablar sin parar","Hacer preguntas y escuchar","Vender sin escuchar","Dar precios sin contexto"], answerIndex:1 },
  { q:"Si un cliente pide un plazo, debes…", options:["Prometer lo que sea","Dar un plazo realista o confirmar y devolver","Evitar responder","Cambiar de tema"], answerIndex:1 },
  { q:"Si vas a derivar a otro departamento conviene…", options:["Derivar sin más","Indicar motivo y registrar seguimiento","Colgar","Decir 'no es mío'"], answerIndex:1 },
  { q:"La cortesía telefónica se refleja en…", options:["Tono seco","Tratamiento respetuoso y agradecimiento","Interrupciones","Respuesta brusca"], answerIndex:1 },
  { q:"En una llamada de incidencias, es clave…", options:["No tomar notas","Recoger datos y confirmar acciones","Evitar plazos","No registrar"], answerIndex:1 },
  { q:"Si el cliente está confuso, ayuda…", options:["Acelerar","Explicar con ejemplos y confirmar","Hablar más técnico","Evitar preguntas"], answerIndex:1 },
  { q:"Al finalizar, conviene confirmar…", options:["Nada","Qué se hará y cuándo","Un rumor","Opiniones personales"], answerIndex:1 },
  { q:"En grabación de práctica, se valora especialmente…", options:["Duración exacta","Estructura, tono y protocolo","Chistes","Hablar muy rápido"], answerIndex:1 }
];

// =====================
// FASE 3 · Nota de llamada (30)
// =====================
const phase3Bank = [
  { q:"Dato imprescindible en una nota de llamada:", options:["Color favorito","Fecha y hora","Redes sociales","Opinión personal"], answerIndex:1 },
  { q:"La nota debe redactarse con estilo…", options:["Irónico","Claro y objetivo","Vulgar","Con abreviaturas incomprensibles"], answerIndex:1 },
  { q:"Estructura adecuada de nota:", options:["Sin orden","Quién llama + motivo + mensaje + devolución","Solo motivo","Solo nombre"], answerIndex:1 },
  { q:"Si llaman para el jefe ausente, lo correcto es…", options:["Inventar respuesta","Ofrecer dejar recado y registrar","Decir que no existe","Dar datos privados"], answerIndex:1 },
  { q:"Sobre la devolución conviene indicar…", options:["Nada","Urgencia/plazo y contacto","Un chiste","Información irrelevante"], answerIndex:1 },
  { q:"Si no dan apellidos…", options:["Forzar","Registrar lo disponible y pedir contacto","Colgar","Inventar datos"], answerIndex:1 },
  { q:"Una nota correcta evita…", options:["Datos verificables","Ambigüedades y opiniones","Fecha/hora","Motivo"], answerIndex:1 },
  { q:"Motivo correcto de llamada:", options:["Me cae mal","Consulta sobre factura nº X","Hablar por hablar","Nada"], answerIndex:1 },
  { q:"Registrar número/email de contacto:", options:["Nunca","Siempre que sea posible","Solo si es urgente","Solo si lo pide el jefe"], answerIndex:1 },
  { q:"En A&F, en nota puede incluirse…", options:["Datos bancarios completos","Referencia de factura/pedido","Contraseñas","Datos médicos"], answerIndex:1 },
  { q:"Si acuerdan devolución a hora concreta…", options:["Omitirlo","Indicar hora acordada","Cambiarla","No registrarla"], answerIndex:1 },
  { q:"Error en una nota:", options:["Ser breve","No indicar destinatario/para quién es","Indicar fecha","Indicar mensaje"], answerIndex:1 },
  { q:"Una nota profesional debe entenderse…", options:["Solo por quien la escribió","Sin contexto adicional","Solo por el cliente","Con jerga extrema"], answerIndex:1 },
  { q:"Dato que ayuda a priorizar:", options:["Humor del cliente","Grado de urgencia","Marca del teléfono","Signo zodiacal"], answerIndex:1 },
  { q:"La nota se redacta preferentemente…", options:["A los 3 días","Justo tras la llamada","Solo si te acuerdas","Antes de la llamada"], answerIndex:1 },
  { q:"Si pide que le llamen por la tarde…", options:["Ignorarlo","Registrar preferencia","Llamar a cualquier hora","No tomar nota"], answerIndex:1 },
  { q:"Campo típico de una plantilla:", options:["Nº de zapatilla","Asunto/motivo","Color favorito","Serie preferida"], answerIndex:1 },
  { q:"Para el 'mensaje' conviene…", options:["]()
{ q:"Para el 'mensaje' conviene…", options:["Ser concreto y verificable","Opinar y juzgar","Escribir sin datos","Usar jerga incomprensible"], answerIndex:0 }
];
