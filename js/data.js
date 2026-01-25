// js/datos.js
// Datos de la unidad y bancos de preguntas (SOLO DATOS, sin lógica).
// El motor (render/nota/desbloqueos) está en js/aplicación.js

window.UNIT_NAME = "Unidad 3 · Comunicación telefónica";

/**
 * Formato:
 * { q: "Texto", options: ["A","B","C","D"], answerIndex: 0..3 }
 *
 * Bancos: 30 preguntas por fase.
 */

// =====================
// FASE 1 (30)
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
// FASE 2 (30)
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
// FASE 3 (30)
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
  { q:"Para el 'mensaje' conviene…", options:["Ser concreto y verificable","Opinar y juzgar","Escribir sin datos","Usar jerga incomprensible"], answerIndex:0 },
  { q:"Una nota debe incluir el destinatario porque…", options:["Es obligatorio por estética","Asegura que llegue a quien corresponde","Da igual a quién vaya","Evita escribir el motivo"], answerIndex:1 },
  { q:"Si el cliente deja varios temas, la nota debe…", options:["Elegir uno y omitir el resto","Listar los puntos con claridad","Escribirlo en desorden","Añadir opiniones"], answerIndex:1 },
  { q:"La urgencia se registra para…", options:["Meter presión","Priorizar la devolución","Evitar responder","Cambiar el tema"], answerIndex:1 },
  { q:"Dato NO recomendable en la nota:", options:["Insultos del cliente","Hechos y datos de contacto","Fecha y hora","Motivo"], answerIndex:0 },
  { q:"Si hay un número de expediente, conviene…", options:["Ignorarlo","Anotarlo como referencia","Inventarlo","Cambiarlo"], answerIndex:1 },
  { q:"Al registrar teléfono/email, conviene…", options:["Escribirlo como sea","Repetir/confirmar para evitar errores","Omitirlo siempre","Pedir redes sociales"], answerIndex:1 },
  { q:"Una nota profesional usa…", options:["Mayúsculas y gritos","Lenguaje formal y claro","Jerga interna sin explicar","Bromas"], answerIndex:1 },
  { q:"¿Cuándo es mejor redactar la nota?", options:["Antes de atender","Justo después de colgar","Al día siguiente","Cuando te acuerdes"], answerIndex:1 },
  { q:"Si la llamada se corta, la nota debe…", options:["No hacerse","Incluir que se cortó y lo hablado","Inventar el final","Culpar al cliente"], answerIndex:1 },
  { q:"En motivo, lo correcto es…", options:["Poner 'varios'","Especificar el tema concreto","Poner 'nada'","Poner una opinión"], answerIndex:1 },
  { q:"La devolución debe indicar…", options:["Solo 'llamar'","Cuándo y a qué contacto","Nada","Que el cliente espere"], answerIndex:1 }
];

// =====================
// FASE 4 (30)
// =====================
const phase4Bank = [
  { q:"En un correo profesional, el asunto debe ser…", options:["Vago ('Hola')","Claro y específico","Con emoticonos","Una frase larga sin sentido"], answerIndex:1 },
  { q:"Estructura recomendada de un correo:", options:["Sin saludo ni cierre","Saludo + contexto + solicitud/acción + cierre","Solo adjunto","Todo en mayúsculas"], answerIndex:1 },
  { q:"El saludo más adecuado en entorno formal:", options:["Ey","Estimado/a + nombre / Buenos días","Qué pasa","Holiiii"], answerIndex:1 },
  { q:"¿Qué es buena práctica con adjuntos?", options:["No mencionarlos","Mencionarlos en el cuerpo y revisar que estén","Enviar sin revisar","Adjuntar archivos sin nombre"], answerIndex:1 },
  { q:"El tono correcto en un correo a cliente es…", options:["Irónico","Cordial, claro y respetuoso","Agresivo","Excesivamente coloquial"], answerIndex:1 },
  { q:"Cuando pides una acción, conviene…", options:["No indicar plazo","Indicar acción y plazo realista","Exigir sin contexto","No dar detalles"], answerIndex:1 },
  { q:"Firma profesional incluye…", options:["Apodos","Nombre, cargo/área y contacto","Chistes","Datos privados innecesarios"], answerIndex:1 },
  { q:"Uso correcto de CC:", options:["Copiar a todo el mundo","Incluir solo a quienes deban estar informados","Nunca usar CC","Usar CC para presionar"], answerIndex:1 },
  { q:"Uso correcto de CCO:", options:["Ocultar destinatarios cuando es necesario","Para regañar","Para enviar spam","No sirve para nada"], answerIndex:0 },
  { q:"Antes de enviar, conviene…", options:["Enviar rápido","Revisar ortografía y datos","No releer","Cambiar el destinatario al azar"], answerIndex:1 },
  { q:"En un mensaje interno (chat/CRM) debe primar…", options:["Chistes","Brevedad con datos clave","Ambigüedad","Opiniones personales"], answerIndex:1 },
  { q:"Un buen mensaje interno incluye…", options:["Solo 'llámame'","Contexto + acción solicitada + referencia","Emojis","Rumores"], answerIndex:1 },
  { q:"Si hay datos sensibles, lo correcto es…", options:["Pegarlos en cualquier chat","Usar canal autorizado y verificar destinatario","Decirlos en público","Mandarlos a un grupo"], answerIndex:1 },
  { q:"Al pedir confirmación, conviene usar…", options:["Frases confusas","Pregunta concreta y verificable","Amenazas","Sarcasmo"], answerIndex:1 },
  { q:"Un error típico en correos es…", options:["Asunto claro","No indicar qué se necesita","Pedir plazos","Firmar"], answerIndex:1 },
  { q:"Cuando respondes a una queja por correo, primero debes…", options:["Culpar al cliente","Agradecer y reconocer la incidencia","Ignorarla","Responder con mayúsculas"], answerIndex:1 },
  { q:"En seguimiento, es útil…", options:["No referenciar nada","Incluir nº de pedido/factura/expediente","Hablar de otro tema","No poner fechas"], answerIndex:1 },
  { q:"En comunicación escrita, evita…", options:["Listas claras","Mayúsculas sostenidas (parece gritar)","Puntos clave","Cierre cordial"], answerIndex:1 },
  { q:"Un cierre profesional:", options:["Bye","Quedo a su disposición / Un saludo","Nos vemos","Lo dicho"], answerIndex:1 },
  { q:"Si necesitas información del cliente, debes…", options:["Pedirla de forma concreta","Pedir todo sin motivo","Pedir contraseñas","Pedir datos irrelevantes"], answerIndex:0 },
  { q:"En CRM, registrar una interacción sirve para…", options:["Olvidarla","Trazabilidad y seguimiento","Evitar trabajar","Borrar historial"], answerIndex:1 },
  { q:"En un mensaje interno, si es urgente…", options:["No decirlo","Indicar urgencia y plazo","Poner muchos emojis","Escribir en mayúsculas"], answerIndex:1 },
  { q:"La claridad mejora cuando…", options:["Usas frases largas","Usas frases cortas y ordenadas","Omites datos","Mezclas temas"], answerIndex:1 },
  { q:"Al reenviar un correo, conviene…", options:["No explicar nada","Añadir contexto y qué se espera","Quitar el historial","Cambiar el asunto sin motivo"], answerIndex:1 },
  { q:"En correos, los bullets/listas sirven para…", options:["Confundir","Ordenar información y acciones","Rellenar","Evitar responsabilidad"], answerIndex:1 },
  { q:"¿Qué dato ayuda a priorizar en un mensaje interno?", options:["Signo zodiacal","Impacto/urgencia y fecha límite","Color favorito","Estado de ánimo"], answerIndex:1 },
  { q:"Si adjuntas un documento, el nombre del archivo debería…", options:["Ser 'documento'","Indicar contenido y fecha/versión","Tener emojis","No tener extensión"], answerIndex:1 },
  { q:"Si no puedes cumplir un plazo, lo profesional es…", options:["No contestar","Proponer alternativa y nuevo plazo realista","Prometer igual","Culpar a otro"], answerIndex:1 },
  { q:"En comunicación escrita, la cortesía se muestra con…", options:["Ordenar sin más","Por favor / gracias / tono respetuoso","Sarcasmo","Exclamaciones"], answerIndex:1 },
  { q:"Un mensaje interno correcto evita…", options:["Datos verificables","Ambigüedad (¿qué hay que hacer?)","Referencia","Acción"], answerIndex:1 }
];

// =====================
// FASE 5 (30) · EVALUACIÓN INTEGRADORA TEMA 3
// =====================
const phase5Bank = [
  { q:"Una empresa llama a un cliente dos días después de una venta para confirmar que el pedido llegó correctamente. ¿Qué tipo de llamada es?", options:["Inicial entrante","De seguimiento saliente","De mejora entrante","De retorno saliente"], answerIndex:1 },
  { q:"Un cliente llama porque dejó una consulta la semana pasada y no obtuvo respuesta. ¿Cómo clasificarías principalmente la llamada?", options:["Inicial entrante","De retorno entrante","De seguimiento saliente","De mejora entrante"], answerIndex:1 },
  { q:"La empresa llama para ofrecer información adicional sobre un servicio complementario tras detectar una necesidad del cliente. ¿Qué tipo es?", options:["De mejora saliente","De retorno saliente","Inicial entrante","De seguimiento entrante"], answerIndex:0 },
  { q:"Una llamada 'inicial' se caracteriza por…", options:["Confirmar un compromiso posterior a una venta","Establecer contacto con alguien con quien no se había hablado antes","Devolver una llamada perdida","Responder a consultas anteriores"], answerIndex:1 },
  { q:"En atención telefónica, si el interlocutor habla despacio y parece inseguro, la actuación más profesional es…", options:["Aumentar el volumen y mantener tu ritmo para mostrar autoridad","Adaptar el ritmo, usar frases cortas y comprobar comprensión","Repetir literalmente el mensaje para evitar malentendidos","Usar tecnicismos para transmitir precisión"], answerIndex:1 },
  { q:"En comunicación telefónica, al no haber comunicación no verbal visible, cobran especial importancia…", options:["El contacto visual y la distancia interpersonal","La entonación, pausas, vocalización y ritmo","Los gestos con las manos","La indumentaria del emisor"], answerIndex:1 },
  { q:"¿Qué combinación describe mejor un buen control de la voz en llamada profesional?", options:["Volumen alto + velocidad alta para demostrar seguridad","Volumen moderado + ritmo comprensible + pausas adecuadas","Volumen bajo para parecer prudente + hablar rápido","Evitar pausas para no cortar el flujo"], answerIndex:1 },
  { q:"Si dejas un mensaje en contestador, debería incluir…", options:["Solo tu nombre, para no dar demasiada información","Nombre, número de teléfono y motivo de forma breve y clara","Solo el motivo, evitando datos de contacto","Un mensaje largo y detallado para evitar devoluciones"], answerIndex:1 },
  { q:"Estás atendiendo presencialmente a una persona y entra una llamada. El protocolo recomienda…", options:["Ignorar la llamada hasta terminar, sin más","Pedir permiso, responder brevemente y gestionar la espera","Priorizar siempre la llamada entrante y cortar la atención presencial","Responder y continuar hablando con la persona presente a la vez"], answerIndex:1 },
  { q:"Al poner a alguien en espera, lo correcto es…", options:["Poner en espera sin avisar para ahorrar tiempo","Pedir permiso y estimar el tiempo de espera","Decir 'espere' y dejarlo sin más","Poner música alta para que no se impaciente"], answerIndex:1 },
  { q:"En una incidencia/queja por teléfono, el primer paso adecuado es…", options:["Justificarte inmediatamente para evitar responsabilidad","Escuchar, mantener la calma y mostrar empatía","Cortar para consultar al responsable","Pedir al cliente que envíe un email y colgar"], answerIndex:1 },
  { q:"En la recogida y transmisión de información de una incidencia, conviene registrar…", options:["Solo el motivo general","Nombre/empresa/departamento/teléfono, motivo detallado, fecha/hora y receptor","Solo la fecha/hora y el nombre del cliente","Únicamente la urgencia para priorizar"], answerIndex:1 },
  { q:"¿Qué es un error frecuente en protocolo telefónico con asuntos delicados?", options:["Verificar identidad antes de dar datos","Evitar tratar por teléfono temas confidenciales si no es imprescindible","Tomar nota para seguimiento","Tratar datos sensibles sin comprobar con quién hablas"], answerIndex:3 },
  { q:"Si te piden hablar con un superior jerárquico, lo más correcto es…", options:["Pasar la llamada siempre sin preguntar","Valorar el asunto y, si procede, preguntar disponibilidad o tomar recado","Negarte siempre por norma","Dar el móvil personal del superior"], answerIndex:1 },
  { q:"Una centralita telefónica sirve principalmente para…", options:["Bloquear llamadas externas por defecto","Conectar extensiones internas y gestionar/derivar llamadas","Sustituir el correo electrónico","Grabar automáticamente todas las llamadas por norma"], answerIndex:1 },
  { q:"Frente a un operador automático, una ventaja del operador persona física suele ser…", options:["Configura el operador y evalúa el tráfico","Puede aportar un trato personal y orientar mejor según contexto","Automatiza el sistema de atención","Adapta la centralita al tamaño de la empresa"], answerIndex:1 },
  { q:"En una centralita, si el destinatario no está disponible, una respuesta profesional es…", options:["'No está, llame luego' (y colgar)","Disculparse, indicar que está ocupado y ofrecer tomar nota/devolver la llamada","Transferir al azar a otra extensión","Inventar una excusa para quitarse la llamada"], answerIndex:1 },
  { q:"¿Qué función adicional permite enviar una llamada a otro número para atender fuera de la oficina?", options:["Restricción de llamadas","Desvío de llamadas","Gestión de listas negras","Registro y listados de llamadas"], answerIndex:1 },
  { q:"¿Qué función adicional es útil para identificar llamadas de números desconocidos o consultar historial?", options:["Registro y listados de llamadas","Desvío de llamadas","Lista negra","Llamada en espera"], answerIndex:0 },
  { q:"Si quieres impedir el acceso a la empresa desde determinados números, usarías…", options:["Lista negra","Desvío de llamadas","Registro de llamadas","Sala de conferencias"], answerIndex:0 },
  { q:"Antes de una videoconferencia, es recomendable…", options:["Conectarse directamente y ajustar durante la reunión","Probar equipo (audio/cámara), conocer la plataforma y preparar agenda","Evitar agenda para ser flexible","Poner fondo con movimiento para parecer cercano"], answerIndex:1 },
  { q:"En videoconferencia, cuidar el fondo es importante porque…", options:["Solo afecta a la estética, no a la comunicación","Evita distracciones y protege la privacidad","Mejora la velocidad de internet","Permite hablar más rápido"], answerIndex:1 },
  { q:"Durante la videoconferencia, una buena práctica con el micrófono es…", options:["Mantenerlo siempre activo para intervenir rápido","Silenciarlo cuando no se habla para evitar ruidos","Apagarlo siempre y escribir por chat","Hablar muy alto para que se oiga por encima"], answerIndex:1 },
  { q:"Durante la videoconferencia, mantener contacto visual significa…", options:["Mirar siempre al chat","Mirar a la cámara al intervenir para que parezca que miras al interlocutor","Mirar al teclado para escribir notas","No mirar a la cámara para parecer natural"], answerIndex:1 },
  { q:"Si hay participantes que no se conocen, al inicio es recomendable…", options:["Entrar directamente en el tema","Hacer presentaciones breves","Evitar presentaciones para ahorrar tiempo","Pedir a cada uno que envíe su CV por chat"], answerIndex:1 },
  { q:"En videoconferencia, una postura adecuada suele ser…", options:["De pie y caminando para energía","Sentado con postura profesional, evitando movimientos que distraigan","Reclinado para parecer relajado","Cambiar de posición constantemente"], answerIndex:1 },
  { q:"Si durante una llamada hay interferencias o mala comunicación, lo profesional es…", options:["Seguir sin decir nada","Indicarlo y pedir repetir/confirmar información","Culpar al interlocutor","Colgar y esperar a que te llamen"], answerIndex:1 },
  { q:"En una llamada saliente profesional, al inicio conviene…", options:["Pedir directamente lo que quieres sin presentarte","Presentarte (nombre y empresa) y preguntar si es buen momento","Hablar rápido para no molestar","Entrar en detalles antes de confirmar disponibilidad"], answerIndex:1 },
  { q:"Una llamada entrante suele ser…", options:["Siempre comercial","Contestación a consultas hechas con anterioridad (o contacto iniciado por el cliente)","Siempre de seguimiento posterior a venta","Solo entre departamentos internos"], answerIndex:1 },
  { q:"Al cerrar una llamada profesional, es recomendable…", options:["Colgar sin resumen para ahorrar tiempo","Resumir acuerdos, confirmar próximos pasos y despedirse cordialmente","Cambiar el tema para relajar","Pedir datos personales no relacionados"], answerIndex:1 }
];

window.phase1Bank = phase1Bank;
window.phase2Bank = phase2Bank;
window.phase3Bank = phase3Bank;
window.phase4Bank = phase4Bank;
window.phase5Bank = phase5Bank;
