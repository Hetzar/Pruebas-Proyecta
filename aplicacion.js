'use strict';
// Los datos se mantienen exclusivamente en memoria del navegador: sin red ni almacenamiento local.
const $=id=>document.getElementById(id);
const app={type:null,answers:[],page:0,size:6};
const visible=(id)=>{for(const sec of ['landing','quiz','results'])$(sec).classList.toggle('hidden',sec!==id);window.scrollTo({top:0,behavior:'instant'});};
function safeText(value){return String(value).replace(/[<>&"']/g,s=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[s]));}
function start(type){
  if(!Object.prototype.hasOwnProperty.call(INSTRUMENTOS,type))return;
  if(app.type && app.answers.some(x=>Number.isInteger(x)) && !confirm('¿Comenzar otra prueba? Las respuestas anteriores desaparecerán.'))return;
  app.type=type;app.answers=new Array(INSTRUMENTOS[type].questions.length).fill(null);app.page=0;app.size=type==='iami'?6:5;
  const test=INSTRUMENTOS[type];$('quiz-type').textContent='Estación '+(type==='iami'?'2':'3');$('quiz-title').textContent=test.title;
  $('quiz-intro').textContent=type==='iami'?'Marca qué tan seguro/a te sientes de poder realizar cada actividad, NO cuánto te gusta. (1 = nada seguro/a; 10 = completamente seguro/a).':'Indica cuánto te identificas con cada situación. (1 = nada identificado/a; 7 = totalmente identificado/a).';
  renderQuestions();visible('quiz');
}
function renderQuestions(){
  const test=INSTRUMENTOS[app.type];let from=app.page*app.size;let to=Math.min(from+app.size,test.questions.length);
  $('quiz-progress-text').textContent=`${app.answers.filter(Number.isInteger).length} de ${test.questions.length} respuestas`;
  $('quiz-progress-bar').style.width=`${100*app.answers.filter(Number.isInteger).length/test.questions.length}%`;
  $('quiz-percent').textContent=Math.round(100*app.answers.filter(Number.isInteger).length/test.questions.length)+'% completado';
  $('quiz-encouragement').textContent=app.answers.filter(Number.isInteger).length>test.questions.length*.75?'¡Ya casi terminas! Cada respuesta cuenta.':app.answers.filter(Number.isInteger).length>test.questions.length*.5?'Ya avanzaste más de la mitad de la expedición.':'Cada respuesta es una oportunidad para conocerte.';
  $('quiz-step-note').textContent=`Grupo ${app.page+1} de ${Math.ceil(test.questions.length/app.size)} · Preguntas ${from+1}–${to}`;
  const form=$('questions');form.innerHTML='';
  for(let i=from;i<to;i++){
    const fieldset=document.createElement('fieldset');fieldset.className='question';
    const legend=document.createElement('legend');legend.textContent=`${i+1}. ${test.questions[i]}`;fieldset.append(legend);
    const choices=document.createElement('div');choices.className='answers';
    for(let v=test.min;v<=test.max;v++){
      const label=document.createElement('label');label.className='choice';label.title=`Respuesta ${v}`;
      const radio=document.createElement('input');radio.type='radio';radio.name=`pregunta-${i+1}`;radio.value=v;radio.checked=app.answers[i]===v;radio.setAttribute('aria-label',`Pregunta ${i+1}: ${v}`);
      radio.addEventListener('change',()=>{app.answers[i]=v;const count=app.answers.filter(Number.isInteger).length;$('quiz-progress-text').textContent=`${count} de ${test.questions.length} respuestas`;$('quiz-progress-bar').style.width=`${100*count/test.questions.length}%`;$('quiz-percent').textContent=Math.round(100*count/test.questions.length)+'% completado';$('quiz-encouragement').textContent=count>test.questions.length*.75?'¡Ya casi terminas! Cada respuesta cuenta.':count>test.questions.length*.5?'Ya avanzaste más de la mitad de la expedición.':'Cada respuesta es una oportunidad para conocerte.';$('quiz-error').classList.add('hidden');});
      const n=document.createElement('span');n.textContent=v;label.append(radio,n);choices.append(label);
    }
    fieldset.append(choices);
    if(i===from){const hints=document.createElement('div');hints.className='scale-legend';const l=document.createElement('span');l.textContent=test.min===1?'1 = '+(app.type==='iami'?'Nada seguro/a':'Nada identificado/a'):'';const r=document.createElement('span');r.textContent=test.max+' = '+(app.type==='iami'?'Totalmente seguro/a':'Totalmente identificado/a');hints.append(l,r);fieldset.append(hints);}
    form.append(fieldset);
  }
  $('back-button').disabled=app.page===0;
  const last=to===test.questions.length;$('next-button').textContent=last?'Ver mis resultados':'Continuar';$('quiz-error').classList.add('hidden');
}
function next(){
 const test=INSTRUMENTOS[app.type];const from=app.page*app.size;const to=Math.min(from+app.size,test.questions.length);
 if(app.answers.slice(from,to).some(v=>!Number.isInteger(v))){$('quiz-error').classList.remove('hidden');$('questions').querySelectorAll('.question').forEach((el,idx)=>{el.style.borderColor=Number.isInteger(app.answers[from+idx])?'':'#be6070'});return;}
 if(to===test.questions.length){showResults();return;}
 app.page++;renderQuestions();window.scrollTo({top:0,behavior:'instant'});
}
const ORIENTACIONES = {
 iami: {
  'Lingüística': {desc:'Leer, comprender y escribir textos.', next:'Leer sobre una ocupación de tu interés y escribir un resumen breve.'},
  'Lógico-matemática': {desc:'Resolver problemas, cálculos y situaciones matemáticas.',next:'Probar un reto matemático o investigar qué cálculos utiliza una ocupación.'},
  'Espacial': {desc:'Representar objetos, dibujos, planos y relaciones espaciales.',next:'Realizar un boceto, un modelo o un pequeño plano.'},
  'Musical': {desc:'Interpretar, leer o crear música.',next:'Practicar un ritmo o explorar cómo se aprende a crear música.'},
  'Interpersonal': {desc:'Comunicarse, colaborar y coordinar actividades con otras personas.',next:'Participar en una actividad colaborativa o preparar una conversación de aprendizaje.'},
  'Cinestésico-corporal': {desc:'Realizar actividades que implican coordinación, movimiento y equilibrio.',next:'Aprender una actividad de coordinación adecuada a tus intereses.'},
  'Intrapersonal': {desc:'Reconocer las propias emociones, necesidades, posibilidades y limitaciones.',next:'Escribir, de forma privada, qué experiencia te ayudó a conocerte mejor.'},
  'Naturalista': {desc:'Reconocer el entorno natural y explorar fenómenos biológicos o ambientales.',next:'Investigar un aspecto de la naturaleza presente en tu territorio.'}
 },
 dtdc: {
  'Motivación': {desc:'Identificación con dificultades para iniciar o dar prioridad a la elección.',next:'Elegir una pequeña acción para informarte sobre una opción, sin obligarte a decidir hoy.'},
  'Indecisión': {desc:'Dudas generales, miedo al error o necesidad de aprobación al decidir.',next:'Comparar dos alternativas con criterios que sean importantes para ti.'},
  'Información sobre el proceso de decisión': {desc:'Incertidumbre acerca de los pasos y criterios necesarios para elegir.',next:'Escribir tres pasos que necesitas conocer antes de tomar una decisión.'},
  'Información sobre sí mismo': {desc:'Dudas acerca de intereses, capacidades percibidas y preferencias.',next:'Revisar tu Misión 0 y conversar sobre lo que te interesa explorar.'},
  'Información sobre alternativas': {desc:'Falta de información sobre programas, oficios, requisitos u oportunidades.',next:'Consultar una fuente oficial sobre dos rutas educativas u ocupacionales.'},
  'Información contradictoria': {desc:'Datos u opiniones que no coinciden acerca de capacidades o alternativas.',next:'Verificar la información en fuentes oficiales y anotar qué preguntas siguen abiertas.'},
  'Conflictos internos': {desc:'Tensión entre varias preferencias, intereses o características de las opciones.',next:'Anotar qué valoras de cada opción y qué compromisos implicaría seguirla.'},
  'Conflictos externos': {desc:'Desacuerdos o expectativas diferentes entre personas importantes para ti.',next:'Solicitar una conversación respetuosa con alguien de confianza, si así lo deseas.'}
 }
};
function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function clear(el){el.replaceChildren();}
function scoreText(d,test){return d.avg.toFixed(2).replace('.',',')+' / '+test.max;}
function selectRanked(scores,n,reverse=false){
 const sorted=[...scores].sort((a,b)=>(reverse?a.avg-b.avg:b.avg-a.avg)||a.index-b.index);
 // Incluir empates en el puesto límite, si los hay.
 const cutoff=sorted[Math.min(n,sorted.length)-1].avg;
 return sorted.filter(d=>reverse?d.avg<=cutoff+1e-9:d.avg>=cutoff-1e-9);
}
function makeCard(title,description,dimensions,test,type){
 const box=node('article','insight-card '+type);box.append(node('h3','',title),node('p','insight-intro',description));
 const ul=node('ul','insight-list');
 for(const d of dimensions){
  const item=node('li');const heading=node('strong','',d.name+' · '+scoreText(d,test));
  const detail=node('span','',ORIENTACIONES[app.type][d.name].desc);
  item.append(heading,detail);ul.append(item);
 }
 box.append(ul);return box;
}
function showResults(){
 const test=INSTRUMENTOS[app.type];if(app.answers.some(v=>!Number.isInteger(v)))return;
 $('result-title').textContent='Resultados · '+test.title;
 $('result-version').textContent=test.version;
 $('report-date').textContent='Fecha: '+new Date().toLocaleDateString('es-CO',{year:'numeric',month:'long',day:'numeric'});
 $('student-name').value='';$('student-code').value='';
 const scores=test.groups.map((d,index)=>{const values=d.ids.map(i=>app.answers[i-1]);return {...d,index,avg:values.reduce((a,b)=>a+b,0)/values.length};});
 const top=selectRanked(scores,app.type==='iami'?3:3);
 const bottom=selectRanked(scores,2,true);
 const flat=Math.max(...scores.map(d=>d.avg))-Math.min(...scores.map(d=>d.avg))<.5;
 const notes=$('result-insights');clear(notes);
 if(app.type==='iami'){
  $('result-kind').textContent='ESTACIÓN 02 · MI AUTOEFICACIA PERCIBIDA';
  $('result-headline').textContent='¿En qué actividades siento mayor confianza?';
  $('result-summary').textContent=flat?'Tus puntuaciones de confianza son parecidas entre los ámbitos explorados. Son respuestas actuales, no una medida de tus capacidades reales.':'Tus respuestas permiten observar en qué actividades manifestaste mayor confianza y en cuáles expresaste relativamente menos confianza. Estas diferencias son solo dentro de tu propio perfil.';
  notes.append(makeCard('Donde expresaste más confianza','Ámbitos relativamente destacados en tus propias respuestas. No son una evaluación objetiva de habilidades.',top,test,'confidence'));
  if(!flat)notes.append(makeCard('Donde puedes seguir ganando confianza','Puntuaciones relativamente menores; no significan incapacidad ni falta de potencial.',bottom,test,'explore'));
  $('chart-title').textContent='Tu mapa de confianza percibida';
  $('chart-caption').textContent='Promedio de las seis respuestas de cada dimensión, en una escala de 1 a 10. No es un porcentaje de inteligencia ni una comparación con otras personas.';
  const next=ORIENTACIONES.iami[bottom[0].name];
  $('next-text').textContent='Puedes explorar una actividad que te interese y elegir algo nuevo que quieras practicar. Por ejemplo: '+next.next;
  $('reflect-questions').replaceChildren(...['¿Qué actividades reconociste como familiares o interesantes para ti?','¿Qué aspecto quisieras practicar, incluso si hoy te sientes menos seguro/a?','¿Qué experiencia o persona podría ayudarte a ampliar tus posibilidades?'].map(v=>node('li','',v)));
 }else{
  $('result-kind').textContent='ESTACIÓN 03 · MI PROCESO DE DECISIÓN';
  $('result-headline').textContent='¿Qué situaciones pueden dificultar mis decisiones?';
  $('result-summary').textContent='En esta escala, un número mayor significa mayor identificación con la dificultad descrita; NO significa mejor desempeño. El gráfico corresponde a las ocho agrupaciones del anexo inicial de 27 preguntas, no a las seis escalas de la validación posterior.';
  notes.append(makeCard('Situaciones con las que más te identificaste','Estos ámbitos aparecen relativamente más señalados en tus respuestas. No son un diagnóstico ni una clasificación del estudiante.',top,test,'attention'));
  if(!flat)notes.append(makeCard('Situaciones con menor identificación','En comparación con tus otras respuestas, aquí marcaste relativamente menos identificación.',bottom,test,'neutral'));
  $('chart-title').textContent='Tu mapa de dificultades percibidas';
  $('chart-caption').textContent='Promedios descriptivos de las agrupaciones iniciales de 27 ítems, con respuestas de 1 a 7. Más alto = mayor identificación con la dificultad. No se aplican puntos de corte ni el modelo factorial posterior.';
  $('next-text').textContent='Tal vez te ayude elegir un asunto que quieras aclarar, sin apresurar una decisión. Una idea para comenzar: '+ORIENTACIONES.dtdc[top[0].name].next;
  $('reflect-questions').replaceChildren(...['¿Qué situación te genera más preguntas sobre tu futuro?','¿Qué información te hace falta sobre tus alternativas?','¿Con quién podrías hablar, si necesitas apoyo para decidir?'].map(v=>node('li','',v)));
 }
 const chart=$('result-bars');clear(chart);
 for(const d of scores){
  const wrapper=node('div','dimension');
  const header=node('div','dimension-line');
  const label=node('span','',d.name);
  const number=node('span','',scoreText(d,test));header.append(label,number);
  const bar=node('div','meter');bar.setAttribute('role','img');bar.setAttribute('aria-label',`${d.name}: ${scoreText(d,test)}`);
  const fill=node('div','meter-fill '+(app.type==='dtdc'?'dtdc-fill':''));
  // El mínimo de cada escala es 1, por eso el gráfico comienza en ese punto, no en cero.
  fill.style.width=((d.avg-test.min)/(test.max-test.min)*100).toFixed(1)+'%';
  bar.append(fill);wrapper.append(header,bar);chart.append(wrapper);
 }
 $('result-note').textContent=(app.type==='iami'?'Puntuaciones mayores indican más confianza percibida en las actividades de esa dimensión. ':'En DTDC, las puntuaciones mayores indican mayor identificación con las dificultades descritas; la dimensión «Motivación» NO mide un nivel de motivación. ')+test.note;
 $('result-source').textContent='Fuente: '+test.source;
 visible('results');
}
function exit(){if(app.answers.some(Number.isInteger)&&!confirm('¿Volver al inicio? Se perderán las respuestas y resultados de esta sesión.'))return;app.type=null;app.answers=[];app.page=0;visible('landing');}
document.querySelectorAll('[data-start]').forEach(b=>b.addEventListener('click',()=>start(b.dataset.start)));
$('back-button').addEventListener('click',()=>{if(app.page>0){app.page--;renderQuestions();window.scrollTo({top:0,behavior:'instant'});}});
$('next-button').addEventListener('click',next);$('exit-button').addEventListener('click',exit);$('restart-button').addEventListener('click',exit);$('print-button').addEventListener('click',()=>window.print());
