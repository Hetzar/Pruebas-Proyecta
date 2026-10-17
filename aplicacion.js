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
  const form=$('questions');form.innerHTML='';
  for(let i=from;i<to;i++){
    const fieldset=document.createElement('fieldset');fieldset.className='question';
    const legend=document.createElement('legend');legend.textContent=`${i+1}. ${test.questions[i]}`;fieldset.append(legend);
    const choices=document.createElement('div');choices.className='answers';
    for(let v=test.min;v<=test.max;v++){
      const label=document.createElement('label');label.className='choice';label.title=`Respuesta ${v}`;
      const radio=document.createElement('input');radio.type='radio';radio.name=`pregunta-${i+1}`;radio.value=v;radio.checked=app.answers[i]===v;radio.setAttribute('aria-label',`Pregunta ${i+1}: ${v}`);
      radio.addEventListener('change',()=>{app.answers[i]=v;const count=app.answers.filter(Number.isInteger).length;$('quiz-progress-text').textContent=`${count} de ${test.questions.length} respuestas`;$('quiz-progress-bar').style.width=`${100*count/test.questions.length}%`;$('quiz-error').classList.add('hidden');});
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
function showResults(){
 const test=INSTRUMENTOS[app.type];if(app.answers.some(v=>!Number.isInteger(v))){return;}
 $('result-title').textContent='Resultados · '+test.title;$('result-version').textContent=test.version;$('report-date').textContent='Fecha: '+new Date().toLocaleDateString('es-CO',{year:'numeric',month:'long',day:'numeric'});
 $('student-name').value='';$('student-code').value='';
 const chart=$('result-bars');chart.innerHTML='';
 for(const d of test.groups){
   const vs=d.ids.map(i=>app.answers[i-1]);const avg=vs.reduce((x,y)=>x+y,0)/vs.length;
   const wrapper=document.createElement('div');wrapper.className='dimension';
   const header=document.createElement('div');header.className='dimension-line';
   const label=document.createElement('span');label.textContent=d.name;const number=document.createElement('span');number.textContent=avg.toFixed(2)+' / '+test.max;header.append(label,number);
   const bar=document.createElement('div');bar.className='meter';bar.setAttribute('role','img');bar.setAttribute('aria-label',`${d.name}: ${avg.toFixed(2)} de ${test.max}`);
   const fill=document.createElement('div');fill.className='meter-fill';fill.style.width=(avg/test.max*100).toFixed(1)+'%';bar.append(fill);wrapper.append(header,bar);chart.append(wrapper);
 }
 $('result-note').textContent=(app.type==='iami'?'Puntuaciones mayores indican más confianza percibida en las actividades de esa dimensión. ':'Puntuaciones mayores indican mayor identificación con las dificultades descritas en esa dimensión. ')+test.note;
 $('result-source').textContent='Fuente: '+test.source;
 visible('results');
}
function exit(){if(app.answers.some(Number.isInteger)&&!confirm('¿Volver al inicio? Se perderán las respuestas y resultados de esta sesión.'))return;app.type=null;app.answers=[];app.page=0;visible('landing');}
document.querySelectorAll('[data-start]').forEach(b=>b.addEventListener('click',()=>start(b.dataset.start)));
$('back-button').addEventListener('click',()=>{if(app.page>0){app.page--;renderQuestions();window.scrollTo({top:0,behavior:'instant'});}});
$('next-button').addEventListener('click',next);$('exit-button').addEventListener('click',exit);$('restart-button').addEventListener('click',exit);$('print-button').addEventListener('click',()=>window.print());
