'use strict';
/* Plan de entrenamiento 12 semanas — tracker offline.
   Estado en localStorage, sin red, sin cuentas. Exporta/importa JSON y CSV. */

const STORE_KEY = 'plan12w.v1';
const BUILD = '2026-10-03.7';   /* súbelo junto con CACHE en sw.js al tocar index.html o app.js */

/* ---------- Definición del plan (espejo del documento de 12 semanas) ---------- */

const EX = [
  { id:'remo', block:1, name:'Remo invertido', en:'inverted row', kind:'reps', sets:3, min:6, max:12, rest:90, step:1,
    que:'Tiras de tu propio cuerpo hacia la barra tumbado casi en horizontal, con los talones en el suelo. Es un remo: trabajas la espalda y los brazos (los músculos de tirar).',
    como:'Barra a la altura de la cadera. Agárrala, camina los pies hacia delante y déjate caer hacia atrás con el cuerpo recto como una tabla, brazos estirados. Tira llevando el pecho hacia la barra, con los codos hacia atrás, y baja controlando 2 segundos. Cuanto más tumbado estés, más duro; cuanto más de pie, más fácil.',
    errores:'Encoger los hombros hacia las orejas; dejar caer la cadera; subir solo la cabeza; rebotar al bajar.',
    videos:[{id:'5W8F6MzZ8Rk', t:'Inverted Row Tutorial (con progresiones)', ch:'Andrew Alinda'}, {id:'hXTc1mDnZCw', t:'Inverted Row Guide: form, mistakes', ch:'BarBend'}],
    tip:'Barra a la altura de la cadera. Cuerpo recto como una tabla; tira llevando el pecho a la barra y baja controlando. Más horizontal = más duro.',
    ladder:[{ t:'Barra a la cadera, cuerpo inclinado' },
            { t:'Barra al pecho, pies más adelante' },
            { t:'Pies elevados en una silla' },
            { t:'Pies elevados con 1 s de pausa en el pecho', min:5, max:10 }] },
  { id:'flexiones', block:2, name:'Flexiones', en:'push-up', kind:'reps', sets:3, min:5, max:12, rest:90, step:1,
    que:'Empujas tu propio peso con los brazos: pecho, hombros y tríceps.',
    como:'Manos en la barra (o en el suelo) un poco más anchas que los hombros, a la altura del pecho. Cuerpo en línea recta de la cabeza a los talones, glúteo y abdomen apretados. Baja hasta que el pecho casi toque y empuja. Los codos se abren unos 45° respecto al tronco, no en cruz.',
    errores:'Cadera que cae o culo en alto; cuello adelantado; bajar solo un palmo; codos abiertos a 90°; media flexión y contarla entera.',
    videos:[{id:'IODxDxX7oi4', t:'The Perfect Push Up', ch:'Calisthenicmovement'}, {id:'49jfZ_z7-us', t:'Incline Push Ups: aprender a hacer flexiones', ch:'Tom Morrison'}],
    tip:'Cuerpo en línea de la cabeza a los talones, codos a 45° del torso, pecho abajo. Si no salen 5, apoya rodillas o vuelve a la barra.',
    ladder:[{ t:'Manos en la barra, a la altura del pecho', min:8, max:15 },
            { t:'Manos en la barra, a la altura de la cadera', min:8, max:15 },
            { t:'Rodillas apoyadas en el suelo', min:6, max:12 },
            { t:'Flexión completa en el suelo' },
            { t:'Flexión con pies elevados', min:4, max:10 }] },
  { id:'sentadilla', block:3, name:'Sentadilla al aire', en:'bodyweight squat', kind:'reps', sets:3, min:10, max:15, rest:90, step:1,
    que:'Sentarse y levantarse sin silla. Trabajas los muslos y los glúteos, y es el mismo movimiento que haces al agacharte a coger algo del suelo.',
    como:'Pies a la anchura de los hombros, punteras un poco hacia fuera. Baja llevando la cadera hacia atrás y hacia abajo, como si te sentaras en una silla, con el pecho alto y el peso repartido por todo el pie. Baja hasta donde controles (muslos paralelos al suelo es el objetivo) y sube apretando el glúteo.',
    errores:'Levantar los talones del suelo; rodillas que se meten hacia dentro; redondear la espalda en la parte baja; bajar dos dedos y llamarlo sentadilla.',
    videos:[{id:'m0GcZ24pK6k', t:'How to do a bodyweight squat', ch:'Bupa Health'}],
    tip:'Pies a la anchura de los hombros, peso en el mediopié, baja hasta donde controles sin perder la espalda neutra.',
    ladder:[{ t:'Sentadilla parcial controlada', min:8, max:15 },
            { t:'Sentadilla completa' },
            { t:'Búlgara con el pie de atrás elevado', min:6, max:12, perSide:true },
            { t:'A una pierna asistida (apoyándote en la pared)', min:4, max:10, perSide:true }] },
  { id:'zancadas', block:3, name:'Zancadas caminando', en:'walking lunge', kind:'reps', sets:2, min:8, max:10, rest:90, step:1, perSide:true,
    que:'Pasos largos alternando piernas: fuerza de pierna y equilibrio.',
    como:'Da un paso largo hacia delante y baja la rodilla de atrás hasta casi tocar el suelo, con el tronco recto. La rodilla de delante no pasa la punta del pie y el pie de atrás apoya de puntillas. Empuja con la pierna delantera para volver a estar de pie y encadena con la otra pierna. Necesitas unos dos metros libres.',
    errores:'Pasos demasiado cortos (la rodilla se va hacia delante); inclinarse hacia delante; ir rápido y perder el equilibrio; hacer el doble de una pierna que de la otra.',
    videos:[{id:'Pbmj6xPo-Hw', t:'Walking Lunges Exercise Tutorial', ch:'Buff Dudes'}],
    tip:'Paso largo, baja la rodilla de atrás casi al suelo. La rodilla delantera no pasa la punta del pie.',
    ladder:[{ t:'Zancada estática con apoyo', min:8, max:12 },
            { t:'Zancada caminando' },
            { t:'Zancada búlgara con el pie de atrás elevado', min:6, max:10 }] },
  { id:'gluteo', block:4, name:'Puente de glúteo', en:'glute bridge', kind:'reps', sets:3, min:12, max:15, rest:60, step:1,
    que:'Tumbado boca arriba, levantas la cadera apretando el glúteo. Es lo que compensa las horas sentado y protege tu zona lumbar.',
    como:'Túmbate boca arriba con las rodillas dobladas y los pies apoyados a la anchura de la cadera, cerca del culo. Aprieta el glúteo y sube la cadera hasta que tronco y muslos queden en línea recta. Aguanta 1-2 segundos arriba y baja sin dejarla caer de golpe.',
    errores:'Subir arqueando la espalda baja (lo notas en la lumbar, no en el glúteo); pies demasiado lejos; subir y bajar rápido sin apretar arriba.',
    videos:[{id:'OUgsJ8-Vi0E', t:'How to Perform the Perfect Glute Bridge', ch:'Airrosti'}],
    tip:'Sube la cadera apretando el glúteo hasta alinear tronco y piernas, 1 s arriba. No arquees la lumbar para subir más.',
    ladder:[{ t:'A dos piernas' },
            { t:'A una pierna', min:8, max:12, perSide:true },
            { t:'A una pierna con el pie elevado', min:8, max:12, perSide:true }] },
  { id:'plancha', block:5, name:'Plancha', en:'plank', kind:'time', sets:3, min:15, max:45, rest:45, step:5, unit:'s',
    que:'Mantener el cuerpo recto e inmóvil apoyado en los codos. Trabajas abdomen y lumbar: el trabajo es que la cadera no caiga, no aguantar la respiración.',
    como:'Codos justo debajo de los hombros, antebrazos en el suelo, pies juntos o a la anchura de la cadera. Aprieta abdomen y glúteo, mete un poco el pubis hacia arriba y respira con normalidad. Cuerpo en línea: ni cadera caída ni culo alto.',
    errores:'Cadera que se hunde; culo en alto; aguantar la respiración; seguir cuando la postura ya se ha roto (mejor 15 s bien que 45 s mal).',
    videos:[{id:'A2b2EmIg0dA', t:'How To Plank: forma, correcciones y progresiones', ch:'E3 Rehab'}],
    tip:'Codos bajo los hombros, cuerpo en línea, glúteo y abdomen apretados. Si la cadera cae, se acabó la serie.',
    ladder:[{ t:'Plancha normal' },
            { t:'Plancha con un pie levantado', min:15, max:40 },
            { t:'Plancha con toque de hombro', min:10, max:30 }] },
  { id:'deadbug', block:5, name:'Dead bug', en:'dead bug', kind:'reps', sets:2, min:8, max:8, rest:45, step:1, perSide:true,
    que:'Boca arriba, extiendes brazo y pierna contrarios sin que la espalda baja se despegue del suelo. Enseña a tu abdomen a sujetar mientras las piernas se mueven.',
    como:'Túmbate boca arriba con las rodillas dobladas a 90° y los brazos hacia el techo. Pega la lumbar al suelo (como si aplastaras una hoja de papel) y mantén esa presión. Extiende despacio el brazo derecho por encima de la cabeza y la pierna izquierda hacia delante, sin que la espalda se despegue; vuelve y cambia de lado.',
    errores:'Arquear la lumbar al estirar la pierna; ir rápido; aguantar la respiración; estirar la pierna más de lo que puedes controlar (mejor menos recorrido).',
    videos:[{id:'GbSC02oU3To', t:'How to Do a Dead Bug', ch:'Hinge Health'}],
    tip:'Tumbado, extiende brazo y pierna contrarios con la lumbar pegada al suelo. Si se despega, reduce el rango.',
    ladder:[{ t:'Pies apoyados, solo brazos', min:8, max:12 },
            { t:'Brazo y pierna contrarios' },
            { t:'Con la pierna estirada', min:6, max:8 }] },
  { id:'tiron', block:6, name:'Colgado y negativas', en:'dead hang / pull-up negatives', kind:'time', sets:3, min:15, max:20, rest:90, step:5, unit:'s', phased:true,
    que:'El camino hacia tu primera dominada. Tirón vertical = tirar de tu peso hacia arriba colgado de la barra. Se entrena en tres pasos: aguantarte colgado, bajar frenando (negativas) y por fin subir solo.',
    como:'Agarra la barra alta con los brazos estirados y cuélgate con los hombros activos (no del todo sueltos). Colgado pasivo: aguanta el tiempo con el cuerpo quieto, sin balancearte. Negativas: sube con un salto o un escalón hasta pasar la barbilla por encima de la barra y baja lo más lento que puedas, unos 5 segundos. Empieza con agarre supino (palmas hacia ti): es el más fácil.',
    errores:'Colgarse con los hombros totalmente relajados durante todo el rato; hacer negativas cayendo de golpe; balancearse para subir; usar una barra mal anclada.',
    videos:[{id:'no_ZdiJsLu4', t:'Build Hanging From Zero (colgarse desde cero)', ch:'Tom Morrison'}, {id:'opReOSMHDt0', t:'Mastering Your First Pull-up: negativas', ch:'Adam Morgan'}, {id:'6GWT7GLXE3c', t:'Pull Ups For Beginners: de 0 a 5 dominadas', ch:'Calisthenicmovement'}],
    tip:'Agárrate a la barra alta con los brazos estirados. Empieza por el agarre supino (palmas hacia ti): es más fácil.',
    ladder:[{ t:'Colgado pasivo', sets:3, min:15, max:20, unit:'s', kind:'time' },
            { t:'Escapulares y negativas de 5 s', sets:3, min:5, max:8, unit:'s', kind:'time' },
            { t:'Negativas de 8 s', sets:3, min:8, max:8, unit:'s', kind:'time' },
            { t:'Dominadas', sets:3, min:3, max:8, unit:'reps', kind:'reps' }] }
];

/* El tirón vertical es el único que lleva rampa por fases, y es solo un valor por
   defecto para quien empieza de cero: semanas 1-4 colgado, 5-8 escapulares y
   negativas de 5 s, 9-12 negativas de 8 s. En cuanto el usuario elige su peldaño
   a mano (Ajustes → Mi nivel), la fase deja de mandar. */
const PHASE_LADDER = { 1:0, 2:1, 3:2 };
const PHASE_NOTE = { 1:'semanas 1-4', 2:'semanas 5-8', 3:'semanas 9-12' };
const PHASE_HINT = 'El peldaño lo pone la semana porque este plan se escribió para empezar de cero. Si ya haces dominadas, elige tu nivel a mano en Ajustes → Mi nivel.';

const BLOCKS = {
  1:'Tirón horizontal', 2:'Empuje', 3:'Pierna', 4:'Cadena posterior',
  5:'Core', 6:'Tirón vertical', 7:'Cardio'
};

/* Qué significa cada nombre de bloque, en llano */
const BLOCK_INFO = {
  1:{ en:'horizontal pull', text:'Tiras de tu propio cuerpo hacia la barra estando casi tumbado. Es el remo: espalda y brazos.' },
  2:{ en:'push', text:'Empujas tu peso con los brazos, con las manos en la barra o en el suelo. Pecho, hombros y tríceps.' },
  3:{ en:'legs', text:'Pierna completa: sentadilla y zancadas. Sin material.' },
  4:{ en:'posterior chain', text:'Glúteo y parte de atrás del muslo, tumbado boca arriba. Compensa las horas sentado.' },
  5:{ en:'core', text:'Abdomen y zona lumbar: aguantar la posición sin que la cadera caiga.' },
  6:{ en:'vertical pull', text:'Tirar de tu peso hacia arriba colgado de la barra alta. El camino hacia la dominada.' },
  7:{ en:'cardio', text:'Caminar y correr. Va aparte de los días de fuerza.' }
};

const WARMUP_VIDEO = { id:'1Y0YjXS9sKI', t:'Cat Cow (gato-camello)', ch:'Hinge Health' };

const WARMUP = [
  'Marchar en el sitio o caminar por casa: 2 min',
  'Gato-camello: 8 repeticiones lentas',
  'Círculos de hombros: 10 alante + 10 atrás',
  'Sentadilla al aire lenta: 10',
  'Colgado pasivo en la barra: 2 × 15 s'
];

const CARDIO = [
  { from:1,  to:3,  text:'Caminar 30-40 min a paso cómodo', frec:'5-6 días' },
  { from:4,  to:6,  text:'Caminar 30 min a paso rápido. Dos días: 1 min rápido / 2 min suave × 8', frec:'5 días' },
  { from:7,  to:9,  text:'5 min andando + (1 min corriendo / 2 min andando) × 8 + 5 min andando', frec:'4-5 días' },
  { from:10, to:12, text:'5 min andando + (2 min corriendo / 1 min andando) × 8 + 5 min andando', frec:'4 días' },
  { from:13, to:99, text:'Correr 20-25 min continuos a ritmo de conversación', frec:'3-4 días' }
];

const RULES = [
  'Deja siempre 2-3 repeticiones en reserva. Nunca al fallo las primeras 6 semanas.',
  'Progresa por palanca, no por peso: cuerpo más horizontal = más duro.',
  'Técnica antes que número: si la forma se rompe, se acaba la serie.',
  'Constancia antes que intensidad: 3 sesiones cortas mejor que 2 largas.',
  'Dolor articular agudo = parar en el momento. Agujetas al día siguiente = normal.'
];

const PROG_RULE = [
  'Tope del rango de repeticiones en TODAS las series.',
  'Técnica intacta en la última repetición de la última serie.',
  'Quedaban 2-3 repeticiones en reserva.',
  'Y conseguido en DOS sesiones seguidas, no en una.'
];

const DAYS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

/* ---------- Utilidades puras (testables) ---------- */

function todayISO(d = new Date()) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
function isoToDate(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}
const DIAS_CORTOS = ['lun','mar','mié','jue','vie','sáb','dom'];
function isoAdd(iso, days) {
  const [y, m, d] = String(iso).split('-').map(Number);
  return todayISO(new Date(y, (m || 1) - 1, (d || 1) + Math.round(days)));
}
function nombreDia(iso) { return DIAS_CORTOS[(isoToDate(iso).getDay() + 6) % 7]; }
/* Semana natural (lunes a domingo) que contiene una fecha */
function semanaCalendario(dateISO) {
  const dow = (isoToDate(dateISO).getDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => isoAdd(dateISO, i - dow));
}
function daysBetween(aISO, bISO) {
  return Math.round((isoToDate(bISO) - isoToDate(aISO)) / 86400000);
}
function weekOf(startISO, dateISO) {
  const days = daysBetween(startISO, dateISO);
  return Math.max(1, Math.floor(days / 7) + 1);
}
function phaseOf(week) { return week <= 4 ? 1 : week <= 8 ? 2 : 3; }
function phaseLabel(p) {
  return p === 1 ? 'Semanas 1-4 · adaptación'
       : p === 2 ? 'Semanas 5-8 · construcción'
       : 'Semanas 9-12 · intensificación';
}
function cardioFor(week) {
  return CARDIO.find(c => week >= c.from && week <= c.to) || CARDIO[CARDIO.length - 1];
}
function exById(id) { return EX.find(e => e.id === id); }
function num(v) { const n = parseFloat(v); return isNaN(n) ? null : n; }

/* Un peldaño de la escalera, admitiendo el formato antiguo (solo texto) */
function stepOf(ex, i) {
  const idx = Math.max(0, Math.min(i, ex.ladder.length - 1));
  const s = ex.ladder[idx];
  return typeof s === 'string' ? { t: s } : (s || {});
}
function stepName(ex, i) { return stepOf(ex, i).t || ''; }

/* Peldaño por defecto: 0 salvo el tirón vertical, que va por fases */
function defaultLevelFor(exId, week) {
  const ex = exById(exId);
  if (!ex || !ex.phased) return 0;
  return PHASE_LADDER[phaseOf(week)] || 0;
}

/* Configuración efectiva de un ejercicio para una semana y un peldaño.
   El peldaño manda sobre los valores base del ejercicio: cada escalón tiene su
   propio rango de repeticiones, así que el ejercicio sigue siendo útil según subes. */
function targetFor(exId, week, level) {
  const ex = exById(exId);
  const pedido = (level === undefined || level === null) ? defaultLevelFor(exId, week) : Number(level) || 0;
  const lv = Math.max(0, Math.min(pedido, ex.ladder.length - 1));
  const cfg = { id: ex.id, name: ex.name, kind: ex.kind, sets: ex.sets, min: ex.min, max: ex.max,
                unit: ex.unit || (ex.kind === 'reps' ? 'reps' : 's'), step: ex.step, rest: ex.rest,
                perSide: !!ex.perSide, label: null, hint: null, level: lv, stepName: stepName(ex, lv) };
  const paso = stepOf(ex, lv);
  if (paso.sets !== undefined) cfg.sets = paso.sets;
  if (paso.min !== undefined) cfg.min = paso.min;
  if (paso.max !== undefined) cfg.max = paso.max;
  if (paso.unit) cfg.unit = paso.unit;
  if (paso.kind) cfg.kind = paso.kind;
  if (paso.perSide !== undefined) cfg.perSide = !!paso.perSide;
  if (cfg.kind === 'reps') cfg.unit = 'reps';
  if (cfg.kind === 'time' && cfg.unit !== 's') cfg.unit = 's';
  if (ex.phased) { cfg.label = cfg.stepName; cfg.hint = PHASE_NOTE[phaseOf(week)] || null; }
  return cfg;
}

function entryComplete(entry) {
  return !!entry && entry.sets.length > 0 && entry.sets.every(s => s.done);
}
function hitTarget(entry, cfg) {
  if (!entryComplete(entry)) return false;
  return entry.sets.every(s => {
    const v = num(s.v);
    if (v === null || v < cfg.max) return false;
    if (cfg.kind === 'reps') return num(s.rir) !== null && num(s.rir) >= 2;
    return true;
  });
}
/* Historial de un ejercicio, en orden cronológico */
function historyFor(sessions, exId) {
  return (sessions || [])
    .filter(s => s.entries && s.entries[exId] && s.entries[exId].sets.length)
    .sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
}
/* Regla del documento: sube solo si las DOS últimas sesiones cumplen.
   Se compara contra el objetivo del peldaño con el que se hizo esa sesión. */
function progressState(sessions, exId, week) {
  const hist = historyFor(sessions, exId).filter(s => entryComplete(s.entries[exId]));
  const last = hist[hist.length - 1];
  const prev = hist[hist.length - 2];
  const lastLevel = last ? last.entries[exId].level : undefined;
  const cfg = targetFor(exId, week, lastLevel);
  const lastHit = hitTarget(last && last.entries[exId], cfg);
  const prevHit = hitTarget(prev && prev.entries[exId], cfg);
  return {
    ready: !!(lastHit && prevHit),
    half: !!(lastHit && !prevHit),
    sessionsDone: hist.length,
    level: cfg.level,
    lastValue: topValue(last, exId)
  };
}
function topValue(session, exId) {
  if (!session || !session.entries[exId]) return null;
  const vals = session.entries[exId].sets.map(s => num(s.v)).filter(v => v !== null);
  return vals.length ? Math.max(...vals) : null;
}
/* Sugerencia: una sola cosa (peldaño o incremento), nunca las dos */
function progressSuggestion(exId, level, cfg) {
  const ex = exById(exId);
  if (level < ex.ladder.length - 1) {
    return { kind:'level', next: level + 1, text:`Subir al peldaño ${level + 2} de ${ex.ladder.length}: ${stepName(ex, level + 1)}` };
  }
  if (cfg.kind === 'time') return { kind:'value', text:`Sumar ${cfg.step} s a cada serie` };
  return { kind:'value', text:'Sumar 1 repetición a cada serie' };
}
/* Formato legible de una sesión guardada */
function setsSummary(entry, cfg) {
  if (!entry) return '';
  return entry.sets.map(s => (s.v === '' || s.v === null || s.v === undefined) ? '–' : s.v).join(' / ');
}
function sessionVolume(session) {
  let v = 0;
  Object.keys(session.entries || {}).forEach(id => {
    session.entries[id].sets.forEach(s => { const n = num(s.v); if (n !== null && s.done) v += n; });
  });
  return v;
}

/* ---------- Estado ---------- */

let state = null;
let restInterval = null;

function defaultState() {
  return { v:1, start: todayISO(), levels:{}, sessions:[], bw:[], cardio:{}, pasos:{},
           perfil:{ altura_cm:175 }, current:null };
}
function normalize(st) {
  st.v = 1;
  st.start = st.start || todayISO();
  st.levels = st.levels || {};
  st.sessions = Array.isArray(st.sessions) ? st.sessions : [];
  st.bw = Array.isArray(st.bw) ? st.bw : [];
  st.cardio = st.cardio || {};
  Object.keys(st.cardio).forEach(k => {
    if (/^\d+$/.test(k)) {                       /* formato viejo: semana → [7 días] */
      const w = Number(k);
      (st.cardio[k] || []).forEach((v, i) => {
        if (v) st.cardio[isoAdd(st.start, (w - 1) * 7 + i)] = true;
      });
      delete st.cardio[k];
    }
  });
  st.pasos = st.pasos || {};
  st.perfil = st.perfil || {};
  if (!(num(st.perfil.altura_cm) > 100)) st.perfil.altura_cm = 175;
  if (st.current && !st.current.entries) st.current = null;
  return st;
}
function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    state = raw ? normalize(JSON.parse(raw)) : defaultState();
  } catch (e) {
    console.error('estado corrupto, empezando de cero', e);
    state = defaultState();
  }
  return state;
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch (e) { toast('No se pudo guardar: ' + e.message); }
}
/* Nivel efectivo: el que el usuario haya elegido a mano, y si no lo ha tocado,
   el que toque por fases (solo el tirón vertical) */
function levelOf(exId) {
  if (!state) return defaultLevelFor(exId, 1);
  const v = state.levels[exId];
  if (v !== undefined && v !== null) return v;
  return defaultLevelFor(exId, weekOf(state.start, todayISO()));
}
/* true si el peldaño lo está poniendo la app y no el usuario */
function isLevelAuto(exId) {
  return !state || state.levels[exId] === undefined || state.levels[exId] === null;
}
function setLevel(exId, i) {
  const ex = exById(exId);
  state.levels[exId] = Math.max(0, Math.min(Number(i) || 0, ex.ladder.length - 1));
  save();
}
function clearLevel(exId) { delete state.levels[exId]; save(); }

function startSession(dateISO) {
  const date = dateISO || todayISO();
  const week = weekOf(state.start, date);
  const entries = {};
  EX.forEach(ex => {
    const cfg = targetFor(ex.id, week, levelOf(ex.id));
    const prev = historyFor(state.sessions, ex.id).slice(-1)[0];
    const prevSets = prev ? prev.entries[ex.id].sets : null;
    const sets = [];
    for (let i = 0; i < cfg.sets; i++) {
      const pv = prevSets && prevSets[i] ? prevSets[i].v : '';
      sets.push({ v: pv === undefined ? '' : pv, rir: '', done:false });
    }
    entries[ex.id] = { level: levelOf(ex.id), sets };
  });
  state.current = { date, week, entries, startedAt: Date.now(), rest:null };
  save();
}

/* ---------- Actividad: pasos, distancia y calorías ----------
   Modelo de estimación, en llano (los dos son aproximaciones: ±20 %):
   · zancada (m) = altura(cm) × 0,415 / 100  → longitud de paso caminando
   · km = pasos × zancada / 1000
   · kcal de caminar = km × peso(kg) × 0,72  (gasto bruto a ~4,8 km/h)
   · kcal de fuerza = MET × 3,5 × peso / 200 × minutos
       MET 4,0 base; +0,5 si 18 series o más; +0,5 si el RIR medio fue ≤ 1,5
   · kcal/min = MET × 3,5 × peso / 200   (fórmula estándar de METs) */

const KCAL_POR_KG_KM = 0.72;

function zancadaM(alturaCm) {
  const a = num(alturaCm);
  return (a && a > 100 && a < 230 ? a : 175) * 0.415 / 100;
}
function kmDePasos(pasos, alturaCm) {
  const p = num(pasos) || 0;
  return p * zancadaM(alturaCm) / 1000;
}
function kcalCaminar(pasos, alturaCm, pesoKg) {
  const peso = num(pesoKg) || 0;
  return kmDePasos(pasos, alturaCm) * peso * KCAL_POR_KG_KM;
}
function seriesHechas(sesion) {
  if (!sesion || !sesion.entries) return 0;
  let n = 0;
  Object.keys(sesion.entries).forEach(id => {
    sesion.entries[id].sets.forEach(s => { if (s.done) n++; });
  });
  return n;
}
function rirMedio(sesion) {
  if (!sesion || !sesion.entries) return null;
  const vals = [];
  Object.keys(sesion.entries).forEach(id => {
    sesion.entries[id].sets.forEach(s => {
      const r = num(s.rir);
      if (s.done && r !== null) vals.push(r);
    });
  });
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}
function duracionMin(sesion) {
  const series = seriesHechas(sesion);
  if (sesion && Number.isFinite(Number(sesion.startedAt)) && Number.isFinite(Number(sesion.endedAt)) &&
      Number(sesion.endedAt) > Number(sesion.startedAt)) {
    const min = (Number(sesion.endedAt) - Number(sesion.startedAt)) / 60000;
    return Math.min(75, Math.max(8, Math.round(min)));
  }
  return Math.min(75, Math.max(8, Math.round(series * 1.5)));
}
function kcalFuerza(sesion, pesoKg) {
  const peso = num(pesoKg) || 0;
  const series = seriesHechas(sesion);
  const minutos = duracionMin(sesion);
  const rir = rirMedio(sesion);
  let met = 4.0;
  if (series >= 18) met += 0.5;
  if (rir !== null && rir <= 1.5) met += 0.5;
  return { kcal: met * 3.5 * peso / 200 * minutos, met, minutos, series, rir };
}
/* Peso vigente en una fecha: el último registrado hasta ese día */
function pesoEn(dateISO, st) {
  const registros = (st || state || {}).bw || [];
  const previos = registros.filter(b => b.date <= dateISO).sort((a, b) => a.date < b.date ? -1 : 1);
  if (previos.length) return num(previos[previos.length - 1].kg);
  const todos = registros.slice().sort((a, b) => a.date < b.date ? -1 : 1);
  return todos.length ? num(todos[0].kg) : null;
}
function pesoActual() { return pesoEn(todayISO()); }
function alturaActual(st) { return num(((st || state || {}).perfil || {}).altura_cm) || 175; }
function pasosEn(dateISO, st) { return num(((st || state || {}).pasos || {})[dateISO]) || 0; }

/* Resumen de un día: pasos, distancia, calorías y sesiones de fuerza */
function resumenDia(dateISO, st) {
  const s0 = st || state || {};
  const semana = weekOf(s0.start, dateISO);
  const pasos = pasosEn(dateISO, s0);
  const peso = pesoEn(dateISO, s0);
  const altura = alturaActual(s0);
  const sesiones = (s0.sessions || []).filter(s => s.date === dateISO);
  const caminar = kcalCaminar(pasos, altura, peso);
  let fuerza = 0, minutos = 0, series = 0;
  sesiones.forEach(s => {
    const k = kcalFuerza(s, peso);
    fuerza += k.kcal; minutos += k.minutos; series += k.series;
  });
  return { date: dateISO, semana, pasos, km: kmDePasos(pasos, altura), peso,
           kcalCaminar: caminar, kcalFuerza: fuerza, kcalTotal: caminar + fuerza,
           sesiones: sesiones.length, minutos, series };
}
/* Fechas (lunes a domingo) de una semana del plan */
function fechasDeSemana(week, st) {
  const start = (st || state || {}).start;
  return Array.from({ length: 7 }, (_, i) => isoAdd(start, (week - 1) * 7 + i));
}
function resumenRango(fechas, st) {
  const s0 = st || state || {};
  const dias = fechas.map(d => resumenDia(d, s0));
  const suma = (k) => dias.reduce((a, d) => a + d[k], 0);
  const pasos = suma('pasos'), km = suma('km'), kcalCaminar = suma('kcalCaminar'), kcalFuerza = suma('kcalFuerza');
  const sesiones = dias.reduce((a, d) => a + d.sesiones, 0);
  const conPasos = dias.filter(d => d.pasos > 0).length;
  return { dias, pasos, km, kcalCaminar, kcalFuerza, kcalTotal: kcalCaminar + kcalFuerza,
           sesiones, diasConPasos: conPasos,
           mediaKcal: Math.round((kcalCaminar + kcalFuerza) / dias.length),
           mediaPasos: Math.round(pasos / dias.length) };
}
function resumenSemana(week, st) {
  const s0 = st || state || {};
  return Object.assign({ week }, resumenRango(fechasDeSemana(week, s0), s0));
}

/* ---------- Render ---------- */

const $ = sel => document.querySelector(sel);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const fmtDate = iso => isoToDate(iso).toLocaleDateString('es-ES', { weekday:'short', day:'numeric', month:'short' });
const kcal = n => Math.round(n || 0).toLocaleString('es-ES');
const km = n => (Math.round((n || 0) * 10) / 10).toString().replace('.', ',');
const pasos = n => (n || 0).toLocaleString('es-ES');

function render() {
  if (!location.hash) location.hash = '#hoy';
  const route = location.hash.slice(1).split('/')[0];
  renderTop(route);
  if (route === 'sesion') renderSesion();
  else if (route === 'progreso') renderProgreso();
  else if (route === 'plan') renderPlan();
  else if (route === 'ajustes') renderAjustes();
  else if (route === 'tarjeta') renderTarjeta();
  else renderHoy();
  document.querySelectorAll('#tabs a').forEach(a => a.classList.toggle('on', a.dataset.tab === (route === 'sesion' ? 'hoy' : route)));
  renderTimer();
}

function renderTop(route) {
  const today = todayISO();
  const week = weekOf(state.start, today);
  const phase = phaseOf(week);
  const hechas = state.sessions.filter(s => weekOf(state.start, s.date) === week).length;
  $('#topbar').innerHTML = `
    <div class="tb">
      <div class="tb-l">
        <div class="tb-t">Semana ${week > 12 ? '12+' : week}<span class="dim">/12</span></div>
        <div class="tb-s">${esc(phaseLabel(phase))}</div>
      </div>
      <div class="tb-r">
        <div class="tb-t">${hechas}<span class="dim">/3 sesiones</span></div>
        <div class="tb-s">${esc(fmtDate(today))}</div>
      </div>
    </div>`;
}

/* ---------- piezas reutilizables ---------- */

function sec(title, meta, body, opts) {
  const o = opts || {};
  return `<section class="sec${o.flat ? ' flat' : ''}"${o.id ? ` id="${o.id}"` : ''}>
    <header class="sec-h"><h2>${esc(title)}</h2>${meta ? `<span class="meta">${meta}</span>` : ''}</header>
    <div class="sec-b">${body}</div>
  </section>`;
}
function fila(label, value, sub) {
  return `<div class="fila"><div class="f-l">${label}${sub ? `<span class="f-s">${sub}</span>` : ''}</div><div class="f-v">${value}</div></div>`;
}
function bars(vals, etiquetas, ancho) {
  const max = Math.max(...vals, 1);
  const w = ancho || 300, h = 64, bw = w / vals.length;
  return `<svg class="barchart" viewBox="0 0 ${w} ${h + 14}" preserveAspectRatio="none" role="img">
    ${vals.map((v, i) => {
      const alto = Math.round((v / max) * h);
      return `<rect x="${(i * bw + bw * 0.18).toFixed(1)}" y="${h - alto}" width="${(bw * 0.64).toFixed(1)}" height="${alto}" rx="1" fill="${v ? 'var(--acc)' : 'var(--line)'}"/>
        <text x="${(i * bw + bw / 2).toFixed(1)}" y="${h + 11}" text-anchor="middle" font-size="9" fill="var(--dim)">${esc(etiquetas[i] || '')}</text>`;
    }).join('')}
  </svg>`;
}
function sparkline(vals, min, max) {
  if (!vals.length) return '';
  const span = Math.max(max - min, 1);
  const x = i => vals.length === 1 ? 100 : 10 + i * (180 / (vals.length - 1));
  const y = v => 52 - ((v - min) / span) * 44;
  const pts = vals.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  return `<svg class="spark" viewBox="0 0 200 64" preserveAspectRatio="none" width="100%" height="56" role="img">
    <line x1="0" y1="52" x2="200" y2="52" stroke="var(--line)" stroke-width="1"/>
    <polyline points="${pts}" fill="none" stroke="var(--acc)" stroke-width="1.6" stroke-linejoin="round"/>
    ${vals.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="2" fill="var(--acc)"/>`).join('')}
  </svg>`;
}
function videoLinks(ex, small) {
  return (ex.videos || []).map(v =>
    `<a class="vlink${small ? ' sm' : ''}" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">▶ ${esc(v.t)} <span class="dim">— ${esc(v.ch)}</span></a>`
  ).join('');
}
function progressBadge(ex, week) {
  const ps = progressState(state.sessions, ex.id, week);
  const cfg = targetFor(ex.id, week, levelOf(ex.id));
  if (ps.ready) {
    const sug = progressSuggestion(ex.id, levelOf(ex.id), cfg);
    return `<div class="aviso ok"><b>Listo para subir.</b> ${esc(sug.text)}. Sube una sola cosa esta semana.
      <div class="acciones"><button class="btn sm primary" data-act="apply" data-ex="${ex.id}">Aplicarlo</button>
      <button class="btn sm ghost" data-act="defer" data-ex="${ex.id}">Ahora no</button></div></div>`;
  }
  if (ps.half) return `<div class="aviso info">Una sesión más al tope (${cfg.max}${cfg.unit === 'reps' ? ' reps' : ' s'} en todas las series) y toca subir.</div>`;
  return '';
}

/* ---------- tarjeta de ejercicio ---------- */

function exCard(ex, week, editable) {
  const entry = editable && state.current ? state.current.entries[ex.id] : null;
  const lvl = entry ? entry.level : levelOf(ex.id);
  const cfg = targetFor(ex.id, week, lvl);
  const prevSession = historyFor(state.sessions, ex.id).slice(-1)[0];
  const prevEntry = prevSession ? prevSession.entries[ex.id] : null;
  const prevCfg = prevSession ? targetFor(ex.id, prevSession.week || weekOf(state.start, prevSession.date), prevEntry.level) : cfg;
  const unit = cfg.unit === 'reps' ? 'reps' : 's';

  let head = `<div class="ex-h">
      <div class="ex-t"><b>${esc(ex.name)}</b> <span class="dim">${esc(ex.en)}</span></div>
      <div class="ex-m"><span class="tag">${cfg.sets}×${cfg.min}${cfg.max !== cfg.min ? '-' + cfg.max : ''} ${unit}${cfg.perSide ? '/lado' : ''}</span><span class="tag acc">Nivel ${lvl + 1}/${ex.ladder.length}</span></div>
    </div>
    <div class="pista">${esc(ex.tip)}</div>
    <div class="dim sm">Peldaño actual: <b>${esc(stepName(ex, lvl))}</b>${lvl < ex.ladder.length - 1 ? ' · siguiente: ' + esc(stepName(ex, lvl + 1)) : ' (último)'}</div>${isLevelAuto(ex.id) && ex.phased ? `<div class="aviso warn">Este peldaño lo pone la semana (${esc(cfg.hint || '')}) porque el plan se escribió para empezar de cero en dominadas. Si ya haces alguna, elige tu nivel en Plan → Mi nivel.</div>` : ''}`;

  if (editable) {
    head += `<div class="acciones">
        <button class="btn sm ghost" data-act="lvl-" data-ex="${ex.id}">− nivel</button>
        <button class="btn sm ghost" data-act="lvl+" data-ex="${ex.id}">+ nivel</button>
        <button class="btn sm ghost" data-act="rest" data-ex="${ex.id}">Descanso ${cfg.rest}s</button>
      </div>`;
  }
  head += prevEntry
    ? `<div class="prev">Última vez (${esc(fmtDate(prevSession.date))}): ${esc(setsSummary(prevEntry, prevCfg))} ${unit} · nivel ${prevEntry.level + 1}</div>`
    : `<div class="prev dim">Primera vez con este ejercicio.</div>`;

  let tabla = '';
  if (editable) {
    const filas = entry.sets.map((s, i) => `
      <tr>
        <td class="n">${i + 1}</td>
        <td><input type="number" inputmode="decimal" step="${cfg.step}" data-in="v" data-ex="${ex.id}" data-i="${i}" value="${esc(s.v)}" placeholder="${esc(cfg.min)}"></td>
        ${cfg.kind === 'reps' ? `<td class="rir"><input type="number" inputmode="numeric" data-in="rir" data-ex="${ex.id}" data-i="${i}" value="${esc(s.rir)}" placeholder="RIR"></td>` : ''}
        <td class="ck"><button class="btn ckb${s.done ? ' on' : ''}" data-act="done" data-ex="${ex.id}" data-i="${i}">${s.done ? '✓' : ''}</button></td>
      </tr>`).join('');
    tabla = `<table class="sets">${filas}</table>
      <div class="dim sm">Valor en ${cfg.unit === 'reps' ? 'repeticiones' : 'segundos'}. RIR = repeticiones que te quedaban.</div>`;
  }

  const ficha = `<details class="ficha">
      <summary>Qué es y cómo se hace</summary>
      <div class="ficha-b">
        <p><b>Qué es.</b> ${esc(ex.que || '')}</p>
        <p><b>Cómo se hace.</b> ${esc(ex.como || '')}</p>
        <p><b>Errores típicos.</b> ${esc(ex.errores || '')}</p>
        <div class="dim sm">Ver el movimiento</div>
        ${videoLinks(ex)}
      </div>
    </details>`;

  return `<article class="card ex${entry && entryComplete(entry) ? ' hecho' : ''}">
      ${head}${progressBadge(ex, week)}${tabla}${ficha}
    </article>`;
}

/* ---------- HOY ---------- */

function actividadHoyHTML() {
  const r = resumenDia(todayISO());
  const peso = r.peso || pesoActual();
  const hayFuerza = r.sesiones > 0;
  return sec('Actividad de hoy', `${alturaActual()} cm · ${peso ? Math.round(peso) + ' kg' : 'sin peso'}`, `
    ${fila('Pasos', `<input type="number" inputmode="numeric" class="num" data-in="pasos" data-fecha="${r.date}" value="${r.pasos || ''}" placeholder="0">`, 'Se escriben a mano al final del día')}
    ${fila('Distancia estimada', `${km(r.km)} km`, `zancada ${(zancadaM(alturaActual()) * 100).toFixed(0)} cm`)}
    ${fila('Caminar', `${kcal(r.kcalCaminar)} kcal`)}
    ${hayFuerza ? fila('Fuerza', `${kcal(r.kcalFuerza)} kcal`, `${r.minutos} min · ${r.series} series`) : ''}
    <div class="total"><span>Gasto de actividad</span><b>${kcal(r.kcalTotal)} kcal</b></div>
    <div class="dim sm">Estimación (±20 %) con altura ${alturaActual()} cm y peso ${peso ? Math.round(peso) + ' kg' : 'sin registrar'}. Caminar: ${KCAL_POR_KG_KM} kcal por kg y km. Fuerza: MET según volumen y esfuerzo.</div>`,
    { id:'card-act' });
}

function semanaPasosHTML() {
  const today = todayISO();
  const week = weekOf(state.start, today);
  const dias = semanaCalendario(today);
  const card = cardioFor(week);
  const res = resumenRango(dias);
  const filas = dias.map(f => {
    const marcado = !!state.cardio[f];
    const hoy = f === today;
    const futuro = f > today;
    const p = pasosEn(f);
    const peso = pesoEn(f);
    return `<div class="dia${hoy ? ' hoy' : ''}">
      <button class="btn ckb${marcado ? ' on' : ''}" data-act="cardio" data-fecha="${f}" title="${futuro ? 'Día futuro' : 'He andado este día'}" ${futuro ? 'disabled' : ''}>${marcado ? '✓' : ''}</button>
      <div class="dia-d">${esc(nombreDia(f))} <span class="dim">${esc(f.slice(8))}/${esc(f.slice(5, 7))}</span>${hoy ? ' <span class="tag acc">hoy</span>' : ''}</div>
      <input type="number" inputmode="numeric" class="pasos" data-in="pasos" data-fecha="${f}" value="${p || ''}" placeholder="${marcado ? 'pasos' : '—'}" ${marcado ? '' : 'disabled'}>
      <div class="dia-k">${p ? kcal(kcalCaminar(p, alturaActual(), peso)) + ' kcal' : ''}</div>
    </div>`;
  }).join('');
  return sec('Esta semana (lunes a domingo)', `${res.diasConPasos}/7 días con pasos`, `
    <div class="cardio-txt">${esc(card.text)} <span class="dim">· ${esc(card.frec)}</span></div>
    <div class="dias">${filas}</div>
    <div class="grid2">
      ${fila('Pasos', pasos(res.pasos))}
      ${fila('Distancia', `${km(res.km)} km`)}
      ${fila('Caminar', `${kcal(res.kcalCaminar)} kcal`)}
      ${fila('Fuerza', `${kcal(res.kcalFuerza)} kcal`)}
    </div>
    <div class="total"><span>Total de la semana</span><b>${kcal(res.kcalTotal)} kcal</b></div>
    <div class="dim sm">Media diaria: ${kcal(res.mediaKcal)} kcal y ${pasos(res.mediaPasos)} pasos. Semana del plan: ${week > 12 ? '12+' : week}.</div>`,
    { id:'card-sem' });
}

function pesoSemanaHTML() {
  const today = todayISO();
  const week = weekOf(state.start, today);
  const dias = fechasDeSemana(week);
  const enSemana = state.bw.filter(b => b.date >= dias[0] && b.date <= dias[6]);
  const actual = enSemana.length ? enSemana[enSemana.length - 1] : null;
  const anterior = state.bw.filter(b => b.date < dias[0]).slice(-1)[0];
  const dif = actual && anterior ? (num(actual.kg) - num(anterior.kg)) : null;
  const cuerpo = (actual
    ? fila('Peso registrado esta semana', `${esc(actual.kg)} kg`, dif === null ? '' : `${dif > 0 ? '+' : ''}${(Math.round(dif * 10) / 10).toString().replace('.', ',')} kg que la semana anterior`)
    : `<div class="fila"><div class="f-l">Peso de esta semana<span class="f-s">Sin registrar. Se usa para calcular las calorías.</span></div></div>`)
    + `<div class="row-in"><input type="number" inputmode="decimal" step="0.1" class="num" data-in="peso-nuevo" placeholder="kg de esta semana"><button class="btn primary" data-act="bw-add">Guardar</button></div>
       <div class="dim sm">Anótalo al empezar cada semana: el peso de cada día sale del último registro anterior a esa fecha.</div>`;
  return sec('Peso', `${state.bw.length} registros`, cuerpo, { id:'card-peso' });
}

function renderHoy() {
  const today = todayISO();
  const week = weekOf(state.start, today);
  const cur = state.current;
  const hechas = state.sessions.filter(s => weekOf(state.start, s.date) === week).length;
  let html = '';

  if (cur) {
    const doneCount = Object.values(cur.entries).filter(e => entryComplete(e)).length;
    html += sec('Sesión en curso', `${doneCount}/${EX.length} ejercicios`, `
      ${fila('Fecha', esc(fmtDate(cur.date)) + ` <span class="dim">· semana ${cur.week > 12 ? '12+' : cur.week}</span>`)}
      <button class="btn primary block" data-act="ir" data-ruta="#sesion">Continuar la sesión</button>`);
  } else {
    html += sec('Entrenamiento de hoy', `${hechas}/3 esta semana`, `
      ${fila('Sesión de fuerza', hechas >= 3 ? 'Completa esta semana' : (hechas === 0 ? 'Pendiente' : `${hechas} hecha${hechas > 1 ? 's' : ''}`))}
      <div class="dim sm">6 bloques, 20-30 min. Los tres días de fuerza nunca seguidos.</div>
      <button class="btn primary block" data-act="start">Empezar sesión de hoy</button>
      <div class="acciones"><button class="btn sm ghost" data-act="start-yesterday">Registrar la de ayer</button>
      <button class="btn sm ghost" data-act="ir" data-ruta="#plan">Ver el plan</button></div>`);
  }

  html += actividadHoyHTML();
  html += semanaPasosHTML();
  html += pesoSemanaHTML();

  html += sec('Calentamiento', '5 min, siempre', `
    <ul class="lista">${WARMUP.map(w => `<li>${esc(w)}</li>`).join('')}</ul>
    ${videoLinks({ videos: [WARMUP_VIDEO] }, true)}`);

  $('#view').innerHTML = html;
}

/* ---------- SESIÓN ---------- */

function renderSesion() {
  if (!state.current) {
    $('#view').innerHTML = sec('Sin sesión en curso', '', `
      <div class="dim sm">Empieza una desde Hoy para registrar series.</div>
      <button class="btn primary block" data-act="ir" data-ruta="#hoy">Ir a Hoy</button>`);
    return;
  }
  const cur = state.current;
  const doneCount = Object.values(cur.entries).filter(e => entryComplete(e)).length;
  let html = sec('Sesión en curso', `${doneCount}/${EX.length} ejercicios`, `
    ${fila('Fecha', `${esc(fmtDate(cur.date))} <span class="dim">· semana ${cur.week > 12 ? '12+' : cur.week}</span>`)}
    <div class="dim sm">Los valores vienen precargados de la última vez: si repites, solo toca ✓. Al marcarla arranca el descanso.</div>`);

  const bloques = [...new Set(EX.map(e => e.block))].sort((a, b) => a - b);
  bloques.forEach(b => {
    html += sec(`Bloque ${b} — ${BLOCKS[b]}`, `<span class="dim">${esc(BLOCK_INFO[b].en)}</span>`,
      `<div class="dim sm">${esc(BLOCK_INFO[b].text)}</div>`,
      { flat: true });
    EX.filter(e => e.block === b).forEach(ex => { html += exCard(ex, cur.week, true); });
  });

  html += sec('Cerrar', '', `
    <button class="btn primary block" data-act="finish">Terminar y guardar sesión</button>
    <div class="acciones"><button class="btn sm ghost" data-act="cancel">Descartar sesión</button>
    <button class="btn sm ghost" data-act="ir" data-ruta="#hoy">Volver a Hoy</button></div>`);
  $('#view').innerHTML = html;
  renderTimer();
}

/* ---------- PROGRESO ---------- */

function renderProgreso() {
  const today = todayISO();
  const week = weekOf(state.start, today);
  const fechasSemana = semanaCalendario(today);
  const res = resumenRango(fechasSemana);
  const sesiones = state.sessions.slice().sort((a, b) => a.date < b.date ? 1 : -1);
  let html = '';

  html += sec(`Semana ${week > 12 ? '12+' : week}`, `${res.sesiones} sesiones · ${esc(nombreDia(fechasSemana[0]))} a ${esc(nombreDia(fechasSemana[6]))}`, `
    ${bars(res.dias.map(d => d.pasos), res.dias.map(d => nombreDia(d.date).slice(0, 1)))}
    ${fila('Pasos', pasos(res.pasos), `media ${pasos(res.mediaPasos)}/día`)}
    ${fila('Distancia', `${km(res.km)} km`)}
    ${fila('Calorías de caminar', `${kcal(res.kcalCaminar)} kcal`)}
    ${fila('Calorías de fuerza', `${kcal(res.kcalFuerza)} kcal`)}
    <div class="total"><span>Gasto de actividad</span><b>${kcal(res.kcalTotal)} kcal</b></div>
    <div class="dim sm">Media diaria ${kcal(res.mediaKcal)} kcal. Estimación ±20 %.</div>`);

  if (state.bw.length) {
    const pesos = state.bw.slice(-12).map(b => num(b.kg)).filter(v => v !== null);
    const min = Math.min(...pesos), max = Math.max(...pesos);
    const dif = pesos.length > 1 ? pesos[pesos.length - 1] - pesos[0] : 0;
    html += sec('Peso corporal', `${state.bw.length} registros`, `
      ${fila('Actual', `${esc(state.bw[state.bw.length - 1].kg)} kg`, `último registro ${esc(fmtDate(state.bw[state.bw.length - 1].date))}`)}
      ${fila('Tendencia', `${dif === 0 ? 'estable' : (dif > 0 ? '+' : '') + (Math.round(dif * 10) / 10).toString().replace('.', ',') + ' kg'}`, `en los últimos ${pesos.length} registros`)}
      ${sparkline(pesos, min, max)}
      <details class="ficha"><summary>Ver todos los registros</summary><div class="ficha-b">
        ${state.bw.slice().reverse().map(b => `<div class="fila"><div class="f-l">${esc(fmtDate(b.date))}</div><div class="f-v">${esc(b.kg)} kg</div></div>`).join('')}
      </div></details>`);
  }

  const conHistorial = EX.filter(ex => historyFor(state.sessions, ex.id).length);
  if (conHistorial.length) {
    html += sec('Progresión por ejercicio', 'valor máximo por sesión', conHistorial.map(ex => {
      const hist = historyFor(state.sessions, ex.id).slice(-12);
      const vals = hist.map(s => topValue(s, ex.id)).filter(v => v !== null);
      if (!vals.length) return '';
      const min = Math.min(...vals), max = Math.max(...vals);
      return `<div class="prog">
        <div class="fila"><div class="f-l"><b>${esc(ex.name)}</b></div><div class="f-v">${vals[vals.length - 1]} <span class="dim">máx ${max}</span></div></div>
        ${sparkline(vals, min, max)}</div>`;
    }).join(''));
  }

  if (!sesiones.length) {
    html += sec('Sesiones', '', `<div class="dim sm">Todavía no hay ninguna sesión guardada.</div>`);
  } else {
    html += sec('Sesiones', `${sesiones.length} en total`, sesiones.slice(0, 15).map(s => {
      const r = resumenDia(s.date);
      return `<details class="ficha">
        <summary>${esc(fmtDate(s.date))} <span class="dim">semana ${s.week} · ${seriesHechas(s)} series · ${kcal(kcalFuerza(s, pesoEn(s.date)).kcal)} kcal</span></summary>
        <div class="ficha-b">
        <table class="sets log">${EX.filter(e => s.entries[e.id]).map(e => `
          <tr><td>${esc(e.name)}</td><td class="der">${esc(setsSummary(s.entries[e.id], targetFor(e.id, s.week, s.entries[e.id].level)))} <span class="dim">nivel ${s.entries[e.id].level + 1}</span></td></tr>`).join('')}</table>
        </div></details>`;
    }).join(''));
  }

  $('#view').innerHTML = html;
}

/* ---------- PLAN ---------- */

function nivelCard(compact) {
  const week = weekOf(state.start, todayISO());
  const body = `${!compact ? `<div class="dim sm">Elige el peldaño donde ahora mismo puedas hacer el rango que se indica (5-12 repeticiones, o los segundos que aguantes) dejando 2-3 en reserva. El primero de cada escalera es el más fácil.</div>` : ''}
    ${EX.map(ex => {
      const auto = isLevelAuto(ex.id);
      const lvl = levelOf(ex.id);
      return `<div class="nivel">
        <div class="nivel-h"><b>${esc(ex.name)}</b> <span class="dim">${esc(ex.en)}</span>${auto ? `<span class="tag${ex.phased ? ' warn' : ''}">${ex.phased ? 'automático por fases' : 'por defecto'}</span>` : ''}</div>
        <div class="chips">
          ${ex.ladder.map((s, i) => {
            const c = targetFor(ex.id, week, i);
            const on = lvl === i;
            const etq = `${i + 1}. ${stepOf(ex, i).t} — ${c.sets}×${c.min}${c.max !== c.min ? '-' + c.max : ''} ${c.unit === 'reps' ? 'reps' : 's'}${c.perSide ? '/lado' : ''}`;
            return `<button class="btn sm${on ? ' primary' : ' ghost'}" data-act="level-set" data-ex="${ex.id}" data-i="${i}">${on ? '✓ ' : ''}${esc(etq)}</button>`;
          }).join('')}
        </div>
        ${ex.phased ? `<div class="acciones"><button class="btn sm ghost" data-act="level-auto" data-ex="${ex.id}">Dejar que lo ponga la semana</button></div>` : ''}
      </div>`;
    }).join('')}`;
  return sec('Mi nivel', compact ? '' : 'elige tu punto de partida', body);
}

function renderPlan() {
  let html = '';
  html += sec('Cómo usar el plan', '', `
    <div class="dim sm">Fuerza: lunes, miércoles y viernes (nunca seguidos). El resto, caminar. Domingo, descanso activo.</div>
    <div class="acciones"><button class="btn sm ghost" data-act="ir" data-ruta="#tarjeta">Tarjeta para imprimir</button></div>`);

  html += sec('Qué es cada ejercicio', 'en llano, con vídeo', [1, 2, 3, 4, 5, 6].map(b => `
    <div class="bloque">
      <div class="bloque-h"><b>Bloque ${b} — ${esc(BLOCKS[b])}</b> <span class="dim">${esc(BLOCK_INFO[b].en)}</span></div>
      <div class="dim sm">${esc(BLOCK_INFO[b].text)}</div>
      ${EX.filter(e => e.block === b).map(e => `
        <div class="glos">
          <div><b>${esc(e.name)}</b> <span class="dim">${esc(e.en)}</span></div>
          <div class="dim sm">${esc(e.que)}</div>
          ${videoLinks(e, true)}
        </div>`).join('')}
    </div>`).join('') + `<div class="dim sm">Vídeos de terceros en YouTube, de canales de calistenia, rehabilitación y salud.</div>`);

  html += nivelCard(false);

  html += sec('Reglas del plan', '', `
    <ol class="lista">${RULES.map(r => `<li>${esc(r)}</li>`).join('')}</ol>
    <div class="dim sm">Cuándo subir:</div>
    <ol class="lista">${PROG_RULE.map(r => `<li>${esc(r)}</li>`).join('')}</ol>
    <div class="dim sm">Entonces sube una sola cosa: o una repetición por serie, o un peldaño. Nunca las dos.</div>`);

  $('#view').innerHTML = html;
}

/* ---------- AJUSTES ---------- */

function renderAjustes() {
  const hoy = todayISO();
  $('#view').innerHTML = `
    ${sec('Perfil', 'para calcular las calorías', `
      ${fila('Altura', `<input type="number" inputmode="numeric" class="num" data-in="altura" value="${alturaActual()}" step="1"> cm`)}
      ${fila('Peso para hoy', `${pesoActual() ? Math.round(pesoActual()) + ' kg' : 'sin registrar'}`, 'Se cambia cada semana abajo')}
      <div class="dim sm">Con la altura se estima la longitud de zancada y la distancia; con el peso, las calorías. Sin estos dos datos la estimación no vale.</div>`)}

    ${sec('Inicio del plan', '', `
      ${fila('Semana 1 empieza', `<input type="date" data-in="start" value="${esc(state.start)}">`)}
      <div class="dim sm">Los ejercicios con fase (colgado y negativas) cambian según la semana.</div>`)}

    ${pesoSemanaHTML()}

    ${sec('Peso: todos los registros', `${state.bw.length}`, state.bw.length
      ? state.bw.slice().reverse().slice(0, 12).map(b => fila(esc(fmtDate(b.date)), `${esc(b.kg)} kg`)).join('')
      : '<div class="dim sm">Sin registros todavía.</div>')}

    ${sec('Modo sin conexión', '', `
      <div id="offline-estado" class="dim sm">Comprobando…</div>
      <div class="acciones"><button class="btn sm ghost" data-act="sw-update">Buscar actualización</button></div>
      <div class="dim sm">Versión de la app: ${BUILD}</div>`)}

    ${sec('Tus datos', 'solo en este dispositivo', `
      <div class="dim sm">${state.sessions.length} sesiones · ${(JSON.stringify(state).length / 1024).toFixed(1)} KB en el navegador. Nada se envía a ningún servidor; si borras los datos del navegador se pierden, así que exporta de vez en cuando.</div>
      <div class="acciones"><button class="btn sm" data-act="export-json">Exportar JSON</button>
      <button class="btn sm" data-act="export-csv">Exportar CSV</button></div>
      <div class="row-in" style="margin-top:.5rem"><label class="file">Importar JSON<input type="file" accept="application/json,.json" data-in="import"></label></div>
      <div class="acciones"><button class="btn sm danger" data-act="wipe">Borrar todos los datos</button></div>`)}

    ${sec('Cómo se calculan las calorías', '', `
      <div class="dim sm">Zancada = altura × 0,415. Distancia = pasos × zancada. Caminar = km × peso × ${KCAL_POR_KG_KM} kcal. Fuerza = MET × 3,5 × peso / 200 × minutos, con MET 4,0 (+0,5 si 18 series o más, +0,5 si el RIR medio fue ≤ 1,5). Es una estimación con ±20 % de error: sirve para comparar semanas, no para contar calorías al gramo.</div>
      <div class="dim sm">Fuerza los días: ${state.sessions.length}. Altura ${alturaActual()} cm.</div>`)}
  `;
  pintarEstadoOffline();
}

/* ---------- TARJETA (imprimible) ---------- */

function renderTarjeta() {
  const week = weekOf(state.start, todayISO());
  const card = cardioFor(week);
  $('#view').innerHTML = `
    ${sec('Tarjeta de una página', 'imprimir o guardar en PDF', `
      <div class="acciones noprint"><button class="btn primary" data-act="print">Imprimir / PDF</button>
      <button class="btn ghost" data-act="ir" data-ruta="#plan">Volver al plan</button></div>`)}

    ${sec('Las 5 reglas', '', `<ol class="lista">${RULES.map(r => `<li>${esc(r)}</li>`).join('')}</ol>`)}

    ${sec('Cuándo subir', '', `<ol class="lista">${PROG_RULE.map(r => `<li>${esc(r)}</li>`).join('')}</ol>
      <div class="dim sm">Sube una sola cosa: una repetición por serie o un peldaño. Si al subir no llegas al mínimo, vuelve atrás una semana.</div>`)}

    ${sec('Calentamiento', '5 min', `<ul class="lista">${WARMUP.map(w => `<li>${esc(w)}</li>`).join('')}</ul>`)}

    ${sec('Sesión de fuerza — 6 bloques', '', EX.map(e => {
      const c = targetFor(e.id, week, levelOf(e.id));
      return `<div class="fila"><div class="f-l"><b>Bloque ${e.block} · ${esc(e.name)}</b>${c.label ? `<span class="f-s">${esc(c.label)}</span>` : ''}</div>
        <div class="f-v">${c.sets}×${c.min}${c.max !== c.min ? '-' + c.max : ''} ${c.unit === 'reps' ? 'reps' : 's'}${c.perSide ? '/lado' : ''}<span class="dim"> · ${c.rest}s</span></div></div>`;
    }).join(''))}

    ${sec(`Cardio de la semana ${week > 12 ? '12+' : week}`, card.frec, `<div>${esc(card.text)}</div>`)}

    ${sec('Registro a mano (12 semanas)', '', `
      <table class="sets log">
        <tr><td class="n">Sem</td><td>Remo</td><td>Flexiones</td><td>Sentadilla</td><td>Plancha</td><td>Dominadas</td></tr>
        ${Array.from({ length: 12 }, (_, i) => `<tr><td class="n">${i + 1}</td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}
      </table>`)}
  `;
}

/* ---------- estado del modo offline ---------- */

function pintarEstadoOffline() {
  const el = document.getElementById('offline-estado');
  if (!el) return;
  const seguro = location.protocol === 'https:' || location.protocol === 'file:' ||
                 location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const instalada = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
                    navigator.standalone === true;
  const filas = [
    seguro ? 'Dirección segura (https)' : 'Dirección no segura (http en la red local)',
    instalada ? 'Abierta como app instalada' : 'Abierta en el navegador'
  ];
  if (!('serviceWorker' in navigator)) {
    el.innerHTML = filas.concat('Este navegador no soporta service worker').join('<br>');
    return;
  }
  el.innerHTML = filas.concat('Comprobando la caché…').join('<br>');
  const pedir = [navigator.serviceWorker.getRegistration()];
  if ('caches' in window) pedir.push(caches.keys());
  Promise.all(pedir).then(res => {
    const reg = res[0], keys = res[1];
    const lineas = filas.slice();
    lineas.push(reg && reg.active
      ? 'Guardada para uso sin conexión'
      : (seguro ? 'Aún sin service worker: recarga una vez' : 'Sin caché offline: hay que abrirla por https'));
    if (keys && keys.length) {
      const nombre = keys.find(k => k.indexOf('plan12w') === 0) || keys[0];
      return caches.open(nombre).then(c => c.keys()).then(reqs => {
        lineas.push('En caché: ' + reqs.length + ' ficheros (' + nombre + ')');
        el.innerHTML = lineas.join('<br>');
      });
    }
    lineas.push('No hay nada guardado en caché');
    el.innerHTML = lineas.join('<br>');
  }).catch(err => {
    el.innerHTML = filas.concat('Error al comprobar: ' + err.message).join('<br>');
  });
}


/* ---------- Cronómetro de descanso ---------- */

function startRest(seconds, label) {
  state.current.rest = { end: Date.now() + seconds * 1000, total: seconds, label: label || '' };
  save();
  renderTimer();
}
function renderTimer() {
  const bar = $('#timerbar');
  if (!bar) return;
  const rest = state.current && state.current.rest;
  if (!rest || rest.end <= Date.now()) {
    bar.classList.add('hide');
    if (restInterval) { clearInterval(restInterval); restInterval = null; }
    return;
  }
  const left = Math.ceil((rest.end - Date.now()) / 1000);
  bar.classList.remove('hide');
  bar.innerHTML = `<div class="grow">⏱ ${left}s ${rest.label ? '· ' + esc(rest.label) : ''}</div>
    <button data-act="rest-30">+30 s</button>
    <button data-act="rest-skip">Saltar</button>`;
}
function tick() {
  if (!state.current || !state.current.rest) return;
  const left = Math.ceil((state.current.rest.end - Date.now()) / 1000);
  if (left <= 0) {
    state.current.rest = null;
    save();
    beep();
    renderTimer();
    render();
  } else {
    renderTimer();
  }
}
function beep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    osc.connect(gain); gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);
    osc.start(); osc.stop(ctx.currentTime + 0.6);
    if (navigator.vibrate) navigator.vibrate([200, 80, 200]);
  } catch (e) { /* sin audio, seguimos */ }
}

/* ---------- Descargas ---------- */

function download(name, text, type) {
  const blob = new Blob([text], { type: type || 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
function exportCSV() {
  const rows = [['fecha', 'semana', 'ejercicio', 'peldaño', 'serie', 'valor', 'unidad', 'rir', 'hecha']];
  state.sessions.slice().sort((a, b) => a.date < b.date ? -1 : 1).forEach(s => {
    EX.forEach(ex => {
      const entry = s.entries[ex.id];
      if (!entry) return;
      const cfg = targetFor(ex.id, s.week, entry.level);
      entry.sets.forEach((set, i) => {
        rows.push([s.date, s.week, ex.name, entry.level + 1, i + 1, set.v, cfg.unit === 'reps' ? 'reps' : 's', set.rir, set.done ? 'sí' : 'no']);
      });
    });
  });
  const csv = rows.map(r => r.map(x => /[",;\n]/.test(String(x)) ? '"' + String(x).replace(/"/g, '""') + '"' : x).join(';')).join('\n');
  download('plan12w-' + todayISO() + '.csv', csv, 'text/csv;charset=utf-8');
}

/* ---------- Toast ---------- */

let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('on'), 2600);
}

/* ---------- Eventos ---------- */

function onAction(act, el) {
  const exId = el.dataset.ex;
  const i = el.dataset.i !== undefined ? Number(el.dataset.i) : null;

  switch (act) {
    case 'ir':
      location.hash = el.dataset.ruta || '#hoy';
      render();
      break;
    case 'start':
      startSession(todayISO());
      toast('Sesión iniciada. Suele durar 25 min.');
      requestWakeLock();
      location.hash = '#sesion';
      render();
      break;
    case 'start-yesterday': {
      const d = new Date(Date.now() - 86400000);
      startSession(todayISO(d));
      render();
      break;
    }
    case 'finish': {
      const cur = state.current;
      const any = Object.values(cur.entries).some(e => e.sets.some(s => s.done));
      if (!any) { toast('No has marcado ninguna serie.'); return; }
      cur.week = weekOf(state.start, cur.date);
      const rec = { date: cur.date, week: cur.week, entries: cur.entries, startedAt: cur.startedAt, endedAt: Date.now(), volume: 0 };
      rec.volume = sessionVolume(rec);
      state.sessions.push(rec);
      state.current = null;
      save();
      toast('Sesión guardada.');
      location.hash = '#progreso';
      render();
      break;
    }
    case 'cancel':
      if (confirm('¿Descartar la sesión en curso? Se pierde lo marcado.')) {
        state.current = null; save(); render();
      }
      break;
    case 'done': {
      const entry = state.current.entries[exId];
      const cfg = targetFor(exId, state.current.week, entry.level);
      const set = entry.sets[i];
      set.done = !set.done;
      if (set.done && set.v === '') {
        const before = entry.sets.slice(0, i).reverse().find(s => num(s.v) !== null);
        set.v = before ? before.v : cfg.min;
      }
      if (set.done) startRest(cfg.rest, exById(exId).name);
      save(); render();
      break;
    }
    case 'lvl+': case 'lvl-': {
      const entry = state.current.entries[exId];
      const delta = act === 'lvl+' ? 1 : -1;
      const max = exById(exId).ladder.length - 1;
      entry.level = Math.min(max, Math.max(0, entry.level + delta));
      state.levels[exId] = entry.level;
      save(); render();
      break;
    }
    case 'apply': {
      const entry = state.current.entries[exId];
      const cfg = targetFor(exId, state.current.week, entry.level);
      const sug = progressSuggestion(exId, entry.level, cfg);
      if (sug.kind === 'level') {
        state.levels[exId] = sug.next;
        entry.level = sug.next;
        toast('Peldaño ' + (sug.next + 1) + ': ' + stepName(exById(exId), sug.next));
      } else {
        entry.sets.forEach(s => { const v = num(s.v); if (v !== null) s.v = v + cfg.step; });
        toast(sug.text);
      }
      save(); render();
      break;
    }
    case 'defer':
      toast('Sin cambios. Repite igual y decide la próxima vez.');
      break;
    case 'rest': {
      const cfg = targetFor(exId, state.current.week, state.current.entries[exId].level);
      startRest(cfg.rest, exById(exId).name);
      break;
    }
    case 'rest-30':
      if (state.current.rest) { state.current.rest.end += 30000; save(); renderTimer(); }
      break;
    case 'rest-skip':
      if (state.current.rest) { state.current.rest = null; save(); renderTimer(); }
      break;
    case 'cardio': {
      const fecha = el.dataset.fecha;
      if (!fecha) break;
      if (state.cardio[fecha]) delete state.cardio[fecha];
      else state.cardio[fecha] = true;
      save(); render();
      break;
    }
    case 'bw-add': {
      const input = document.querySelector('input[data-in="peso-nuevo"]');
      const kg = num(input.value);
      if (kg === null) { toast('Escribe un peso en kg.'); return; }
      state.bw.push({ date: todayISO(), kg });
      save(); render();
      toast('Peso guardado.');
      break;
    }
    case 'export-json':
      download('plan12w-' + todayISO() + '.json', JSON.stringify(state, null, 2), 'application/json');
      break;
    case 'export-csv':
      exportCSV();
      break;
    case 'wipe':
      if (confirm('¿Borrar TODAS las sesiones y ajustes de este dispositivo? No se puede deshacer.')) {
        state = defaultState(); save(); render();
        toast('Todo borrado.');
      }
      break;
    case 'print':
      window.print();
      break;
    case 'level-set': {
      setLevel(exId, i);
      render();
      toast('Nivel: ' + stepName(exById(exId), i) + '. La app no lo cambiará sola hasta que cumplas la regla de las dos sesiones.');
      break;
    }
    case 'level-auto': {
      clearLevel(exId);
      render();
      toast('Ese ejercicio vuelve a ir por fases de la semana (empezando de cero).');
      break;
    }
    case 'sw-update': {
      if (!('serviceWorker' in navigator)) { toast('Este navegador no soporta el modo offline.'); return; }
      navigator.serviceWorker.getRegistration().then(reg => {
        if (!reg) { toast('Sin caché offline: ábrela por https para poder instalarla.'); return; }
        toast('Buscando versión nueva…');
        reg.update().then(() => {
          toast('Al día. Recargando…');
          setTimeout(() => location.reload(), 1200);
        }).catch(() => toast('No se pudo comprobar (¿sin conexión?).'));
      }).catch(err => toast('Error: ' + err.message));
      break;
    }
  }
}

function onInput(el) {
  const kind = el.dataset.in;
  if (kind === 'v' || kind === 'rir') {
    if (!state.current) return;
    const entry = state.current.entries[el.dataset.ex];
    if (!entry) return;
    entry.sets[Number(el.dataset.i)][kind] = el.value;
    save();
  } else if (kind === 'start') {
    state.start = el.value || state.start;
    save();
    render();
  } else if (kind === 'pasos') {
    const fecha = el.dataset.fecha || todayISO();
    const v = num(el.value);
    if (v === null || v <= 0) delete state.pasos[fecha];
    else state.pasos[fecha] = Math.round(v);
    save();
    refrescarActividad();   /* sin re-render: no perder el foco mientras se escribe */
  } else if (kind === 'altura') {
    const a = num(el.value);
    if (a && a > 100 && a < 230) { state.perfil.altura_cm = Math.round(a); save(); }
  }
}

/* Refresca solo las tarjetas de actividad, para no perder el foco del campo */
function refrescarActividad() {
  const act = document.getElementById('card-act');
  if (act) act.outerHTML = actividadHoyHTML();
  const sem = document.getElementById('card-sem');
  if (sem) sem.outerHTML = semanaPasosHTML();
}

function requestWakeLock() {
  try {
    if (navigator.wakeLock && navigator.wakeLock.request) navigator.wakeLock.request('screen').catch(() => {});
  } catch (e) { /* no soportado */ }
}

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'http:' && location.protocol !== 'https:') return; /* file:// no permite SW */
  navigator.serviceWorker.register('sw.js').catch(err => console.warn('SW no registrado:', err.message));
}

function init() {
  load();
  registerSW();
  window.addEventListener('hashchange', render);
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (el) { e.preventDefault(); onAction(el.dataset.act, el); }
  });
  document.addEventListener('input', e => {
    if (e.target.dataset && e.target.dataset.in) onInput(e.target);
  });
  document.addEventListener('change', e => {
    if (e.target.dataset && e.target.dataset.in === 'import') {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          if (!data || !Array.isArray(data.sessions)) throw new Error('no parece un export de este plan');
          state = normalize(data);
          save(); render();
          toast('Datos importados: ' + state.sessions.length + ' sesiones.');
        } catch (err) { toast('Error al importar: ' + err.message); }
      };
      reader.readAsText(file);
    }
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { renderTimer(); } });
  restInterval = setInterval(tick, 1000);
  render();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}

/* Para los tests en node */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EX, CARDIO, PHASE_LADDER, PHASE_NOTE, PHASE_HINT, BLOCKS, BLOCK_INFO, WARMUP_VIDEO, BUILD,
    zancadaM, kmDePasos, kcalCaminar, kcalFuerza, seriesHechas, rirMedio, duracionMin, pasosEn, resumenDia, resumenSemana, fechasDeSemana,
    isoAdd, nombreDia, semanaCalendario, resumenRango,
    todayISO, isoToDate, daysBetween, weekOf, phaseOf,
    cardioFor, stepOf, stepName, defaultLevelFor, targetFor, entryComplete, hitTarget, historyFor, progressState, topValue,
    progressSuggestion, setsSummary, sessionVolume, defaultState, normalize, exById };
}
