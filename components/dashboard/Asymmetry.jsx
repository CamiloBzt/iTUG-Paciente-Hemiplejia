import { TRIALS } from '../../data/itug-trials';
import { C } from '../../lib/colors';
import { asymPct, mean } from '../../lib/stats';

const FIELDS = [
  { key:'total', label:'Duración total', note:'Tiempo completo de la prueba' },
  { key:'final_dur', label:'Duración giro final', note:'Tiempo que tarda en girar y sentarse' },
  { key:'mid_max', label:'Velocidad giro medio', note:'Qué tan rápido gira a mitad del recorrido' },
  { key:'final_max', label:'Velocidad giro final', note:'Qué tan rápido gira al final' },
  { key:'stand_dur', label:'Fase levantarse', note:'Tiempo para ponerse de pie' },
  { key:'sit_dur', label:'Fase sentarse', note:'Tiempo para volver a sentarse' },
];

function buildSideDifferenceRows() {
  const subjects = Array.from(new Set(TRIALS.map(t=>t.subject)));
  const subjectRows = subjects.map(subject => {
    const right = TRIALS.find(t=>t.subject===subject && t.side==='der');
    const left = TRIALS.find(t=>t.subject===subject && t.side==='izq');
    return {
      subject,
      group: right.group,
      values: Object.fromEntries(FIELDS.map(field => [
        field.key,
        asymPct(right[field.key], left[field.key]),
      ])),
    };
  });

  const sofia = subjectRows.find(row=>row.group==='hemiplegia');
  const controlRows = subjectRows.filter(row=>row.group==='healthy');
  const control = {
    subject: 'Grupo de control',
    group: 'healthy',
    values: Object.fromEntries(FIELDS.map(field => [
      field.key,
      mean(controlRows.map(row=>row.values[field.key])),
    ])),
  };

  return { sofia, control };
}

export default function Asymmetry() {
  const { sofia, control } = buildSideDifferenceRows();
  const strongest = FIELDS
    .map(field => ({ ...field, value: sofia.values[field.key] }))
    .sort((a,b)=>b.value-a.value)[0];

  return (
    <section style={{padding:'42px 56px 48px', borderBottom:`1px solid ${C.rule}`}}>
      <div style={{display:'grid', gridTemplateColumns:'320px 1fr', gap:48, alignItems:'start'}}>
        <div>
          <div className="label">03 · Diferencia derecha/izquierda</div>
          <h2 className="serif" style={{fontSize:28, margin:'10px 0 12px', fontWeight:400, letterSpacing:'-0.01em'}}>
            Qué tanto cambia el desempeño entre lados
          </h2>
          <p className="small" style={{fontSize:13, lineHeight:1.55, color:C.ink2}}>
            Esta vista resume la diferencia porcentual entre los giros hacia derecha e izquierda.
            Valores más altos indican que un lado se comporta distinto y podría requerir más atención clínica.
          </p>
          <div style={{marginTop:18, padding:'14px 16px', background:C.hemipBg, borderLeft:`3px solid ${C.hemip}`}}>
            <div className="label" style={{fontSize:9.5, color:C.hemip2}}>Lectura clínica</div>
            <p className="small" style={{margin:'6px 0 0', fontSize:12, lineHeight:1.5, color:C.ink2}}>
              La mayor diferencia de Sofía aparece en <strong>{strongest.label.toLowerCase()}</strong>:
              <span className="mono" style={{color:C.hemip, fontWeight:500}}> {strongest.value.toFixed(0)}%</span>.
              El grupo de control se mantiene más parejo entre lados.
            </p>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0, 1fr))', gap:14}}>
          {FIELDS.map(field => {
            const sofiaValue = sofia.values[field.key];
            const controlValue = control.values[field.key];
            const scale = Math.max(60, sofiaValue, controlValue);
            return (
              <div key={field.key} style={{
                background: C.cream,
                border: `1px solid ${C.rule}`,
                padding: '16px 18px 15px',
                minHeight: 142,
              }}>
                <div className="label" style={{fontSize:9.5, lineHeight:1.3}}>{field.label}</div>
                <p className="small" style={{margin:'5px 0 12px', fontSize:11.5, color:C.muted, lineHeight:1.35}}>
                  {field.note}
                </p>

                <div style={{display:'grid', gap:9}}>
                  {[
                    { label:'Sofía', value:sofiaValue, color:C.hemip },
                    { label:'Control', value:controlValue, color:C.healthy },
                  ].map(row => (
                    <div key={row.label}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:4}}>
                        <span className="mono" style={{fontSize:10.5, color:row.color}}>{row.label}</span>
                        <span className="mono" style={{fontSize:12, color:row.color, fontWeight:500}}>{row.value.toFixed(0)}%</span>
                      </div>
                      <div style={{height:7, background:C.paperLine, position:'relative'}}>
                        <div style={{
                          position:'absolute',
                          left:0,
                          top:0,
                          bottom:0,
                          width:`${Math.min(100, (row.value/scale)*100)}%`,
                          background:row.color,
                          opacity: row.label==='Sofía' ? 0.8 : 0.55,
                        }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
